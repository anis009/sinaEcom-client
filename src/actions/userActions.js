import axios from "axios";
import {
	SENT_TOKEN_FAIL,
	SENT_TOKEN_REQUEST,
	SENT_TOKEN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	RESETPASSWORD_FAIL,
	RESETPASSWORD_REQUEST,
	RESETPASSWORD_SUCCESS,
} from "../constants/userConstants";

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"https://sina-ecom-server.vercel.app/api/users",
			{ name, email, password },
			config
		);
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		localStorage.setItem("userDetails", JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"https://sina-ecom-server.vercel.app/api/users/login",
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
		});

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		localStorage.setItem("userDetails", JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const updateUserAction = (name, email) => async (dispatch, getState) => {
	const {
		userSignup: { userInfo },
	} = getState();
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			"https://sina-ecom-server.vercel.app/api/users/",
			{ name, email },
			config
		);
		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userDetails", JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const sentTokenAction = (email) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SENT_TOKEN_REQUEST,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"https://sina-ecom-server.vercel.app/api/users/forgotpassword",
			{ email },
			config
		);

		dispatch({
			type: SENT_TOKEN_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: SENT_TOKEN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const resetPasswordAction =
	(password, resetToken) => async (dispatch, getState) => {
		try {
			dispatch({
				type: RESETPASSWORD_REQUEST,
			});
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			const { data } = await axios.post(
				`https://sina-ecom-server.vercel.app/api/users/resetpassword/${resetToken}`,
				{ password },
				config
			);

			dispatch({
				type: RESETPASSWORD_SUCCESS,
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: RESETPASSWORD_FAIL,
				payload:
					err.response && err.response.data.message
						? err.response.data.message
						: err.message,
			});
		}
	};
