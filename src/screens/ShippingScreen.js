import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ShippingScreen.css";
import { useDispatch } from "react-redux";
import { CREATE_ORDER_RESET, ORDER_RESET } from "../constants/orderConstant";

const ShippingScreen = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		city: "",
		address: "",
		postalcode: "",
		country: "",
		phonenumber: "",
	});
	const { city, address, postalcode, country, phonenumber } = input;
	const userSignUp = useSelector((state) => state.userSignup);
	const { userInfo } = userSignUp;
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({
			type: CREATE_ORDER_RESET,
		});
		if (!userInfo) {
			navigate("/login?cart=cart");
		}
		if (localStorage.getItem("shippingAddress")) {
			const shippingAddress = JSON.parse(
				localStorage.getItem("shippingAddress")
			);
			const { city, address, postalcode, country, phonenumber } =
				shippingAddress;
			setInput({
				city,
				address,
				postalcode,
				country,
				phonenumber,
			});
		}
	}, [dispatch, navigate, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		localStorage.setItem(
			"shippingAddress",
			JSON.stringify({
				city,
				address,
				postalcode,
				country,
				phonenumber,
			})
		);
		setInput({
			city: "",
			address: "",
			postalcode: "",
			country: "",
			phonenumber: "",
		});
		navigate("/payment");
	};
	return (
		<div className="" style={{ minHeight: "80vh" }}>
			<ol className="breadcrumb">
				<li className="breadcrumb-item ">
					<Link className="text-light" to="/">
						Home
					</Link>
				</li>
				<li className="breadcrumb-item ">
					<Link to="/login" className="text-light">
						Signin
					</Link>
				</li>
				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/shipping" className="text-light">
						Shipping
					</Link>
				</li>

				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/payment" className="text-light">
						Payment
					</Link>
				</li>

				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/payment" className="text-light">
						Placeorder
					</Link>
				</li>
			</ol>
			<div className="shipping-box-1">
				<h1 className="text-center mb-3 shipping-header text-light">
					Shipping Address
				</h1>
				<div className="shipping-box">
					<form className="form" onSubmit={submitHandler}>
						<div className="form-group">
							<input
								type="text"
								placeholder="city..."
								value={city}
								onChange={(e) => setInput({ ...input, city: e.target.value })}
								name="city"
								required
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="address..."
								required
								value={address}
								onChange={(e) =>
									setInput({ ...input, address: e.target.value })
								}
								name="address"
								minLength={5}
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								name="country"
								value={country}
								onChange={(e) =>
									setInput({ ...input, country: e.target.value })
								}
								placeholder="country..."
								required
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="postalcode..."
								name="postalcode"
								value={postalcode}
								onChange={(e) =>
									setInput({ ...input, postalcode: e.target.value })
								}
								required
							/>
						</div>
						<div className="form-group">
							<input
								type="number"
								placeholder="phonenumber..."
								name="phonenumber"
								value={phonenumber}
								onChange={(e) =>
									setInput({ ...input, phonenumber: e.target.value })
								}
								required
							/>
						</div>

						<button type="submit" className="btn btn-sm btn-success">
							continue
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ShippingScreen;
