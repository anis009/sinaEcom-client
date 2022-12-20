import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../actions/userActions";
import AlertMessage from "../../components/Alert";

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
		<div className="min-height-80vh">
			<div className="user-profile-box">
				{updateError && (
					<div
						style={{ width: "400px", textAlign: "center", margin: "auto" }}
						className="mb-2"
					>
						<AlertMessage type="error">{updateError}</AlertMessage>
					</div>
				)}

				<h1 className="text-center mt-2 text-light w-50 border-bottom mx-auto">
					USER INFORMATION
				</h1>

				<div className="user-information">
					<div className="user-information-box text-capitalize">
						<p className="text-light">
							<b className="mr-2 text-light">Name:</b>
							{userName}
						</p>
						<p>
							<b className="mr-2 text-light text-lowercase">Email:</b>
							<a
								href={`mailto:${userEmail}`}
								className=" text-light text-lowercase user-link-hover"
							>
								{" "}
								{userEmail.toLowerCase()}
							</a>
						</p>
						{shippingAddress && (
							<>
								<p className="text-light">
									<b className="mr-2 text-light">City:</b>
									{userCity}
								</p>

								<p className="text-light">
									<b className="mr-2 text-light">Addres:</b>
									{userAddress}
								</p>
								<p className="text-light">
									<b className="mr-2 text-light">postalcode:</b>
									{userPostalCode}
								</p>
								<p className="text-light">
									<b className="mr-2 text-light">Country:</b>
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
								className="btn btn-success mr-2 text-light btn-sm mb-2"
								onClick={() => setModalShow(true)}
							>
								edit profile
							</button>
							<button
								className="btn btn-success btn-sm mb-2"
								onClick={editPasswordHandler}
							>
								edit password
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserScreen;

<style></style>;
