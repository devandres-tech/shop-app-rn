import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'

const CartScreen = (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  const cartItems = useSelector((state) => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      })
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    )
  })

  const sendOrderHandler = async () => {
    setIsLoading(true)
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
    setIsLoading(false)
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            onPress={sendOrderHandler}
            color={Colors.accent}
            title='Order Now'
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        renderItem={(itemData) => (
          <CartItem
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId))
            }}
            amount={itemData.item.sum}
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
          />
        )}
        keyExtractor={(item) => item.productId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
})

export default CartScreen
