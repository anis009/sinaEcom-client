import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShippingScreen = () => {
	const [input, setInput] = useState({
		city: "",
		address: "",
		postalcode: "",
		country: "",
	});
	const { city, address, postalcode, country } = input;
	const userSignUp = useSelector((state) => state.userSignup);
	const { userInfo } = userSignUp;
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate("/login?cart=cart");
		}
		if (localStorage.getItem("shippingAddress")) {
			const shippingAddress = JSON.parse(
				localStorage.getItem("shippingAddress")
			);
			const { city, address, postalcode, country } = shippingAddress;
			setInput({
				city,
				address,
				postalcode,
				country,
			});
		}
	}, [navigate, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		localStorage.setItem(
			"shippingAddress",
			JSON.stringify({
				city,
				address,
				postalcode,
				country,
			})
		);
		setInput({
			city: "",
			address: "",
			postalcode: "",
			country: "",
		});
		navigate("/payment");
	};
	return (
		<div>
			<ol className="breadcrumb">
				<li className="breadcrumb-item ">
					<Link to="/">Home</Link>
				</li>
				<li className="breadcrumb-item ">
					<Link to="/login">Signin</Link>
				</li>
				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/shipping">Shipping</Link>
				</li>

				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/payment">Payment</Link>
				</li>

				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/payment">Placeorder</Link>
				</li>
			</ol>
			<h1 className="text-center mb-3 shipping-header">Shipping Address</h1>
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
							onChange={(e) => setInput({ ...input, address: e.target.value })}
							name="address"
							minLength={5}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							name="country"
							value={country}
							onChange={(e) => setInput({ ...input, country: e.target.value })}
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

					<button type="submit" className="">
						continue
					</button>
				</form>
			</div>
		</div>
	);
};

export default ShippingScreen;
