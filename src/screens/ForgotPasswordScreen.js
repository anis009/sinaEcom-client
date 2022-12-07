import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentTokenAction } from "../actions/userActions";
import AlertMessage from "../components/Alert";

const ForgotPasswordScreen = () => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();

	const sentToken = useSelector((state) => state.sentToken);

	const { loading, error, data } = sentToken;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(sentTokenAction(email));
	};
	return (
		<div>
			<form className="forgotpassword-box" onSubmit={submitHandler}>
				<div className="mb-3">
					{error && <AlertMessage type="error">{error}</AlertMessage>}
					{data && <AlertMessage type="success">{data.data}</AlertMessage>}
				</div>
				<div>
					<input
						type="text"
						placeholder="enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<button className="btn btn-sm btn-dark mt-3" type="submit">
					recover password
				</button>
			</form>
		</div>
	);
};

export default ForgotPasswordScreen;
