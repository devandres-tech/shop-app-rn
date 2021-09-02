import React from 'react'
import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import ProductsOverviewScreen from '../screens/shop/ProductsOverViewScreen'
import CartScreen from '../screens/shop/CartScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackStyle: {
    fontFamily: 'open-sans',
  },
}

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },

  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          color={drawerConfig.tintColor}
          size={23}
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          color={drawerConfig.tintColor}
          size={23}
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          color={drawerConfig.tintColor}
          size={23}
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      itemsContainerStyle: {
        paddingTop: '20%',
      },
    },
  }
)

export default createAppContainer(ShopNavigator)
