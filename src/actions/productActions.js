import axios from "axios";
import {
	PRODUCT_FAIL,
	PRODUCT_REQUEST,
	PRODUCT_SUCCESS,
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

export const getProduct =
	(searchKeyword, pageNumber) => async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_REQUEST });
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.get(
				`http://localhost:7070/api/products?keyWord=${searchKeyword}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({
				type: PRODUCT_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: PRODUCT_FAIL,
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
			`http://localhost:7070/api/products/top`,
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
			`http://localhost:7070/api/products/${id}`,
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
			"http://localhost:7070/api/products",
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
			`http://localhost:7070/api/products/${editId}`,
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
			`http://localhost:7070/api/products/review/${id}`,
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
