import {
	CREATE_PAY_REQUEST,
	CREATE_PAY_REQUEST_FAIL,
	CREATE_PAY_REQUEST_SUCCESS,
	CREATE_PAY_RESET,
} from "../constants/payConstants";

export const createPayReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_PAY_REQUEST:
			return {
				loading: true,
			};
		case CREATE_PAY_REQUEST_SUCCESS:
			return {
				loading: false,
				success: true,
				url: action.payload,
			};
		case CREATE_PAY_REQUEST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CREATE_PAY_RESET:
			return {};
		default:
			return state;
	}
};
