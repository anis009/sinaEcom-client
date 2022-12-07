import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPasswordAction } from "../actions/userActions";
import AlertMessage from "../components/Alert";

const ResestPasswordScreen = () => {
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmpassword] = useState("");
	const [message, setMessage] = useState("");
	const { resetToken } = useParams();
	const dispatch = useDispatch();

	const resetPassword = useSelector((state) => state.resetPassword);

	const { loading, error, data } = resetPassword;

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmpassword) {
			alert("password doesn't match");
		} else {
			dispatch(resetPasswordAction(password, resetToken));
		}
	};

	return (
		<div>
			<form action="" className="forgotpassword-box" onSubmit={submitHandler}>
				<div className="mb-3">
					{error && <AlertMessage type="error">{error}</AlertMessage>}
					{data && <AlertMessage type="success">{data.data}</AlertMessage>}
				</div>
				<div>
					<input
						type="password"
						placeholder="new password...."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="password"
						className="my-2"
						placeholder="confirm new password...."
						value={confirmpassword}
						onChange={(e) => setConfirmpassword(e.target.value)}
					/>
				</div>
				<button className="btn btn-sm btn-dark" type="submit">
					reset password
				</button>
			</form>
		</div>
	);
};

export default ResestPasswordScreen;
