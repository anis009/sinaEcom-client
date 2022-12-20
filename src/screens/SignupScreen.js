import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import AlertMessage from "../components/Alert";

const SignupScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [nameTouch, setNameTouch] = useState(false);
	const [emailTouch, setEmailTouch] = useState(false);
	const [passwordTouch, setPasswordTouch] = useState(false);
	const [confirmPasswordTouch, setConfirmPasswordTouch] = useState(false);
	// const [formIsValid, setFormIsValid] = useState(false);
	const nameIsValid = name.trim() !== "";
	const emailIsValid = email.trim() !== "" && email.includes("@gmail.com");
	const passwordIsValid = password.length >= 4;
	const confirmPasswordIsValid =
		confirmPassword === password && confirmPassword.trim !== "";
	const nameIsInvalid = !nameIsValid && nameTouch;
	const emailIsInvalid = !emailIsValid && emailTouch;
	const passwordIsInvalid = !passwordIsValid && passwordTouch;
	const confirmPasswordIsInvalid =
		!confirmPasswordIsValid && confirmPasswordTouch;

	let formIsValid = false;
	if (
		nameIsValid &&
		emailIsValid &&
		passwordIsValid &&
		confirmPasswordIsValid
	) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}
	const navigate = useNavigate();
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo, error, loading } = userSignup;
	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			console.log(userInfo);
			navigate("/");
		}
	}, [navigate, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(name, email, password));
	};
	const nameBlurHandler = (e) => {
		setNameTouch(true);
	};
	const emailBlurHandler = (e) => {
		setEmailTouch(true);
	};
	const passwordBlurHandler = (e) => {
		setPasswordTouch(true);
	};

	const confirmPasswordBlurHandler = (e) => {
		setConfirmPasswordTouch(true);
	};

	const nameChange = (e) => {
		setName(e.target.value);
		setNameTouch(true);
	};
	const emailChange = (e) => {
		setEmail(e.target.value);
		setEmailTouch(true);
	};
	const passwordChange = (e) => {
		setPassword(e.target.value);
	};
	const confirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};
	const classesName =
		!nameIsInvalid && !emailIsInvalid && !passwordIsInvalid
			? "form-controls"
			: "form-controls invalid";
	return (
		<form onSubmit={submitHandler} className="signup-box">
			<div className="form-container">
				<h1 className="text-2xl uppercase py-2 text-light">Register</h1>
				{loading && <Loader />}
				{error && (
					<div className="mx-3">
						<AlertMessage type="error">{error}</AlertMessage>
					</div>
				)}
				<div className={classesName}>
					<label htmlFor="name" className="text-light mb-0">
						Name:
					</label>
					<input
						type="text"
						id="name"
						onChange={nameChange}
						value={name}
						className="border"
						onBlur={nameBlurHandler}
					/>
					{nameIsInvalid && (
						<p className="error-text">Name must not be empty.</p>
					)}
				</div>
				<div className={classesName}>
					<label htmlFor="email" className="text-light mb-0">
						Email:
					</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={emailChange}
						onBlur={emailBlurHandler}
						className="border"
					/>
					{emailIsInvalid && (
						<p className="error-text">Please give correct email.</p>
					)}
				</div>
				<div className={classesName}>
					<label htmlFor="email" className="text-light mb-0">
						Password:
					</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={passwordChange}
						onBlur={passwordBlurHandler}
						className="border"
					/>
					{passwordIsInvalid && (
						<p className="error-text">
							Password must be at least 4 characters.
						</p>
					)}
				</div>
				<div className={classesName}>
					<label htmlFor="email" className="text-light mb-0">
						Confirm Password:
					</label>
					<input
						type="password"
						name="password"
						value={confirmPassword}
						onChange={confirmPasswordChange}
						onBlur={confirmPasswordBlurHandler}
						className="border"
					/>
					{confirmPasswordIsInvalid && (
						<p className="error-text">
							Passowrd and Confirm password is not equal.
						</p>
					)}
				</div>
				<div className="form-actions pt-3">
					<button
						type="submit"
						className="btn btn-sm btn-primary px-4 fs-5"
						disabled={!formIsValid}
					>
						Signup
					</button>
				</div>
				<span className="pb-2 my-2">
					<span className="text-light">Already have an account ?</span>
					<Link to="/login" className="text-primary ms-2">
						Login
					</Link>
				</span>
			</div>
		</form>
	);
};

export default SignupScreen;
