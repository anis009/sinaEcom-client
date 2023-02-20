import axios from "axios";
import {
	CREATE_PAY_REQUEST,
	CREATE_PAY_REQUEST_SUCCESS,
	CREATE_PAY_REQUEST_FAIL,
} from "../constants/payConstants";
export const createPayment = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_PAY_REQUEST });
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

		const { data } = await axios.get(
			`https://sina-ecom-server.vercel.app/api/pay/${id}`,
			config
		);
		dispatch({
			type: CREATE_PAY_REQUEST_SUCCESS,
			payload: data.url,
		});
	} catch (err) {
		dispatch({
			type: CREATE_PAY_REQUEST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};
