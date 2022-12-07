import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../actions/userActions";
import AlertMessage from "../components/Alert";

const UserScreen = () => {
	const userSignup = useSelector((state) => state.userSignup);
	const {
		userInfo: { name: userName, email: userEmail },
	} = userSignup;

	const navigate = useNavigate();
	const updateUser = useSelector((state) => state.updateUser);
	const {
		success: updateSuccess,
		error: updateError,
		loading: updateLoading,
	} = updateUser;

	const [modalShow, setModalShow] = React.useState(false);
	const shippingAddress =
		JSON.parse(localStorage.getItem("shippingAddress")) || {};
	const {
		address: userAddress,
		city: userCity,
		country: userCountry,
		postalcode: userPostalCode,
	} = shippingAddress;
	const dispatch = useDispatch();

	const editPasswordHandler = () => {
		navigate("/forgotpassword");
	};
	function MyVerticallyCenteredModal(props) {
		const [email, setEmail] = useState(userEmail);
		const [name, setName] = useState(userName);
		const [city, setCity] = useState(userCity);
		const [address, setAddress] = useState(userAddress);
		const [postalcode, setPostalCode] = useState(userPostalCode);
		const [country, setCountry] = useState(userCountry);
		const updateFormHandler = async (e) => {
			e.preventDefault();
			props.onHide();
			dispatch(updateUserAction(name, email));
			localStorage.setItem(
				"shippingAddress",
				JSON.stringify({
					city,
					address,
					postalcode,
					country,
				})
			);
		};
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<i
						className="fas fa-times user-update-modal-icon"
						onClick={props.onHide}
					></i>
				</Modal.Header>
				<Modal.Body>
					<form
						action=""
						method="post"
						className="user-edit-form"
						onSubmit={updateFormHandler}
					>
						<input
							type="text"
							placeholder="name..."
							value={name}
							required
							minLength={2}
							onChange={(e) => setName(e.target.value)}
						/>
						<br />
						<input
							type="email"
							placeholder="email..."
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>

						{shippingAddress && (
							<>
								<input
									type="text"
									placeholder="city..."
									value={city}
									onChange={(e) => setCity(e.target.value)}
									required
									minLength={3}
								/>
								<input
									type="text"
									placeholder="address..."
									value={address}
									required
									minLength={3}
									onChange={(e) => setAddress(e.target.value)}
								/>
								<input
									type="text"
									placeholder="country..."
									value={country}
									required
									minLength={3}
									onChange={(e) => setCountry(e.target.value)}
								/>
								<input
									type="text"
									placeholder="postalcode..."
									value={postalcode}
									required
									minLength={3}
									onChange={(e) => setPostalCode(e.target.value)}
								/>
							</>
						)}

						<button type="submit" className="btn btn-sm btn-dark">
							edit
						</button>
					</form>
				</Modal.Body>
			</Modal>
		);
	}

	return (
		<div>
			<h1 className="text-center mt-2">USER INFORMATION</h1>
			{updateError && (
				<div
					style={{ width: "400px", textAlign: "center", margin: "auto" }}
					className="mb-2"
				>
					<AlertMessage type="error">{updateError}</AlertMessage>
				</div>
			)}

			<div className="user-information">
				<div className="user-information-box text-capitalize">
					<p>
						<b className="mr-2">Name:</b>
						{userName}
					</p>
					<p>
						<b className="mr-2">Email:</b>
						<a href={`mailto:${userEmail}`} className="user-link-hover">
							{" "}
							{userEmail.toLowerCase()}
						</a>
					</p>
					{shippingAddress && (
						<>
							<p>
								<b className="mr-2">City:</b>
								{userCity}
							</p>

							<p>
								<b className="mr-2">Addres:</b>
								{userAddress}
							</p>
							<p>
								<b className="mr-2">postalcode:</b>
								{userPostalCode}
							</p>
							<p>
								<b className="mr-2">Country:</b>
								{userCountry}
							</p>
						</>
					)}
					<MyVerticallyCenteredModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
					<div>
						<button
							className="btn btn-dark mr-2 btn-sm mb-2"
							onClick={() => setModalShow(true)}
						>
							edit profile
						</button>
						<button
							className="btn btn-dark btn-sm mb-2"
							onClick={editPasswordHandler}
						>
							edit password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserScreen;

<style></style>;
