import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	topProductsReducer,
	productReducer,
	productDetailsReducer,
	productCreateReducer,
	productUpdateReducer,
	productDeleteReducer,
	productCreateReviewReducer
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetiailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userUpdateReducer,
	userDeleteReducer
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderMyListReducer,
	orderListReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
	topProducts: topProductsReducer,
	productList: productReducer,
	productDetails: productDetailsReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productDelete: productDeleteReducer,
	productCreateReview: productCreateReviewReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetiailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderList: orderListReducer,
	orderMyList: orderMyListReducer
});

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: {};

const initialState = {
	cart: {
		cartItems: cartItemFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage
	},
	userLogin: { userInfo: userInfoFromStorage }
};
const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
