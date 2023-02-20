import axios from "axios";
import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_REQUEST,
	GET_SINGLE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_FAIL,
	GET_USER_ALL_ORDER_FAIL,
	GET_USER_ALL_ORDER_SUCCESS,
	GET_USER_ALL_ORDER_REQUEST,
} from "../constants/orderConstant";
export const createOrder = (addOrder) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CREATE_ORDER_REQUEST,
		});
		const { userInfo } = getState().userSignup;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(
			`https://sina-ecom-server.vercel.app/api/order/`,
			addOrder,
			config
		);
		dispatch({
			type: CREATE_ORDER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getSingleOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_SINGLE_ORDER_REQUEST,
		});
		const { userInfo } = getState().userSignup;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			`https://sina-ecom-server.vercel.app/api/order/${id}`,
			config
		);
		dispatch({
			type: GET_SINGLE_ORDER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_SINGLE_ORDER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const getOrderByUser = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: GET_USER_ALL_ORDER_REQUEST,
		});
		const { userInfo } = getState().userSignup;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(
			`https://sina-ecom-server.vercel.app/api/order/mine/orders`,
			config
		);
		dispatch({
			type: GET_USER_ALL_ORDER_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: GET_USER_ALL_ORDER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
