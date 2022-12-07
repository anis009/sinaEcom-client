import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstant";
import {
	REMOVE_FROM_CART,
	REMOVE_ALL_FROM_CART,
} from "../constants/cartConstant";

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`http://localhost:7070/api/products/${id}`);

	dispatch({
		type: ADD_TO_CART,
		payload: {
			product: data._id,
			name: data.name,
			price: data.price,
			image: data.image[0].name,
			countInStock: data.countInStock,
			qty: qty,
		},
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_FROM_CART,
		payload: id,
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeAllFromCart = () => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_ALL_FROM_CART,
	});
};
