import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, 
        productDetailsReducer, 
        productDeleteReducer, 
        productCreateReducer, 
        productUpdateReducer,
        productReviewCreateReducer,
        productTopRatedReducer} from './reducers /productReducer'
import { cartReducer } from './reducers /cartReducers'
import { userDeleteReducer, 
        userDetailReducer, 
        userListReducer, 
        userLoginReducer, 
        userRegisterReducer, 
        userUpdateProfileReducer,
        userUpdateReducer } from './reducers /userReducers'
import { orderCreateReducer, 
        orderDetailsReducer, 
        orderListMyReducer,
        orderListReducer,  
        orderPayReducer,
        orderDeliverReducer
    } from './reducers /orderReducers'

const rootReducer  = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null

const shippingInfoFromStorage = localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {cartItems: cartItemsFromStorage,
           shippingAddress: shippingInfoFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware,
  })

export default store


