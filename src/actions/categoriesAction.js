import axios from "axios";
import {
	GET_CATEGORIES_FAIL,
	GET_CATEGORIES_REQUEST,
	GET_CATEGORIES_SUCCESS,
} from "../constants/CategoriesConstant";
import {
	ADD_PRODUCT_FAIL,
	ADD_PRODUCT_REQUEST,
	ADD_PRODUCT_SUCCESS,
	PRODUCT_SINGLE_FAIL,
	PRODUCT_SINGLE_REQUEST,
	PRODUCT_SINGLE_SUCCESS,
	EDIT_PRODUCT_FAIL,
	EDIT_PRODUCT_REQUEST,
	EDIT_PRODUCT_SUCCESS,
	ADD_PRODUCT_REVIEW_FAIL,
	ADD_PRODUCT_REVIEW_REQUEST,
	ADD_PRODUCT_REVIEW_SUCCESS,
	TOP_PRODUCT_REQUEST,
	TOP_PRODUCT_SUCCESS,
	TOP_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getCategories = () => async (dispatch, getState) => {
	try {
		dispatch({ type: GET_CATEGORIES_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.get(
			`https://sina-ecom-server.vercel.app/api/category`,
			config
		);

		dispatch({
			type: GET_CATEGORIES_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_CATEGORIES_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getTopProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: TOP_PRODUCT_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.get(
			`https://sina-ecom-server.vercel.app/api/products/top`,
			config
		);

		dispatch({
			type: TOP_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: TOP_PRODUCT_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getSingleProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_SINGLE_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.get(
			`https://sina-ecom-server.vercel.app/api/products/${id}`,
			config
		);

		dispatch({
			type: PRODUCT_SINGLE_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_SINGLE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const addProduct = (add) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADD_PRODUCT_REQUEST });
		const {
			userSignup: { userInfo },
		} = getState();
		// console.log(userInfo.token);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(
			"https://sina-ecom-server.vercel.app/api/products",
			add,
			config
		);
		dispatch({
			type: ADD_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ADD_PRODUCT_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const editProduct = (editId, edit) => async (dispatch, getState) => {
	try {
		dispatch({ type: EDIT_PRODUCT_REQUEST });
		const {
			userSignup: { userInfo },
		} = getState();
		// console.log(userInfo.token);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`https://sina-ecom-server.vercel.app/api/products/${editId}`,
			edit,
			config
		);

		dispatch({
			type: EDIT_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: EDIT_PRODUCT_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const addProductReview = (id, review) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADD_PRODUCT_REVIEW_REQUEST });
		const {
			userSignup: { userInfo },
		} = getState();
		// console.log(userInfo.token);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(
			`https://sina-ecom-server.vercel.app/api/products/review/${id}`,
			review,
			config
		);

		dispatch({
			type: ADD_PRODUCT_REVIEW_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: ADD_PRODUCT_REVIEW_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
