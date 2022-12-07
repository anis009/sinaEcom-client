import {
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_REQUEST,
	GET_SINGLE_ORDER_SUCCESS,
	GET_SINGLE_ORDER_FAIL,
	GET_USER_ALL_ORDER_FAIL,
	GET_USER_ALL_ORDER_REQUEST,
	GET_USER_ALL_ORDER_SUCCESS,
} from "../constants/orderConstant";

export const createOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				loading: true,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case CREATE_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getSingleOrderReducer = (state = { order: null }, action) => {
	switch (action.type) {
		case GET_SINGLE_ORDER_REQUEST:
			return {
				loading: true,
			};
		case GET_SINGLE_ORDER_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};
		case GET_SINGLE_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const getOrderByUserReducer = (state = { orderList: [] }, action) => {
	switch (action.type) {
		case GET_USER_ALL_ORDER_REQUEST:
			return {
				loading: true,
			};
		case GET_USER_ALL_ORDER_SUCCESS:
			return {
				loading: false,
				orderList: action.payload,
			};
		case GET_USER_ALL_ORDER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
