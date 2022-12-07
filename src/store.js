import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	resetPasswordReducer,
	sentTokenReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
} from "./reducers/userReducers";
import {
	addProductReducer,
	getProductReducer,
	getSingleProductReducer,
	editProductReducer,
	addProductReviewReducer,
	getTopProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	createOrderReducer,
	getOrderByUserReducer,
	getSingleOrderReducer,
} from "./reducers/orderReducers";
const reducer = combineReducers({
	userSignup: userRegisterReducer,
	userLogin: userLoginReducer,
	updateUser: userUpdateReducer,
	cart: cartReducer,
	order: createOrderReducer,
	userOrder: getOrderByUserReducer,
	getSingleOrder: getSingleOrderReducer,
	sentToken: sentTokenReducer,
	resetPassword: resetPasswordReducer,
	addProduct: addProductReducer,
	editProduct: editProductReducer,
	getProducts: getProductReducer,
	getTopProducts: getTopProductReducer,
	getSingleProduct: getSingleProductReducer,
	addProductReview: addProductReviewReducer,
});

const userInfoFromStorage = localStorage.getItem("userDetails")
	? JSON.parse(localStorage.getItem("userDetails"))
	: null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
	},
	userSignup: {
		userInfo: userInfoFromStorage,
	},
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
