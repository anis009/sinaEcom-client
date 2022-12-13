import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActons";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { removeAllFromCart } from "../actions/cartActions";
const PayScreen = () => {
	const [name, setName] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo } = userSignup;

	const order = useSelector((state) => state.order);
	const { loading, error, order: orderdata } = order;

	const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
	const cartItems = JSON.parse(localStorage.getItem("cartItems"));
	const totalPrice = cartItems.reduce((sum, currentValue) => {
		return sum + Number(Number(currentValue.qty) * Number(currentValue.price));
	}, 0);
	const shippingPrice = totalPrice > 100 ? 0 : 100;
	const taxPrice = totalPrice * 0.02;
	useEffect(() => {
		if (!localStorage.getItem("shippingAddress")) {
			navigate("/shipping");
		}
		if (orderdata) {
			navigate(`/placeorder/${orderdata._id}`);
		}
	}, [navigate, orderdata]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createOrder({
				user: userInfo._id,
				orderItems: cartItems,
				shippingPrice,
				taxPrice,
				totalPrice: totalPrice + shippingPrice + taxPrice,
				shippingAddress: {
					city: shippingAddress.city,
					address: shippingAddress.address,
					country: shippingAddress.country,
					postalCode: shippingAddress.postalcode,
				},
				paymentMethod: name,
			})
		);

		console.log(error);
	};

	return (
		<div className="" style={{ minHeight: "75vh" }}>
			<ol className="breadcrumb">
				<li className="breadcrumb-item ">
					<Link to="/" className="text-light">
						Home
					</Link>
				</li>
				<li className="breadcrumb-item ">
					<Link to="/login" className="text-light">
						Signin
					</Link>
				</li>
				<li className="breadcrumb-item" aria-current="page">
					<Link to="/shipping" className="text-light">
						Shipping
					</Link>
				</li>

				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/payment">Payment</Link>
				</li>

				<li className="breadcrumb-item active" aria-current="page">
					<Link to="/payment" className="text-light">
						Placeorder
					</Link>
				</li>
			</ol>

			<h1 className="text-center my-4 py-3 text-light">
				Select your Payment method
			</h1>
			{loading ? (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Loader />
				</div>
			) : (
				<div className="pb-3">
					{error && <Message color="danger">{error}</Message>}
					<form className="payment-box text-light" onSubmit={submitHandler}>
						<div class="radio">
							<label>
								<input
									type="radio"
									value="Bkash"
									onChange={(e) => setName(e.target.value)}
									name="optradio"
								/>
								Bkash
							</label>
						</div>
						<div class="radio">
							<label>
								<input
									type="radio"
									name="optradio"
									value="Rocket"
									onChange={(e) => setName(e.target.value)}
								/>
								Rocket
							</label>
						</div>
						<div class="radio">
							<label>
								<input
									type="radio"
									name="optradio"
									value="Stripe"
									onChange={(e) => setName(e.target.value)}
								/>
								Stripe
							</label>
						</div>

						<div class="radio">
							<label>
								<input
									type="radio"
									name="optradio"
									value="Paypal"
									onChange={(e) => setName(e.target.value)}
								/>
								Paypal
							</label>
						</div>

						<div class="radio">
							<label>
								<input
									type="radio"
									name="optradio"
									value="Hand to Hand"
									onChange={(e) => setName(e.target.value)}
								/>
								Hand to Hand
							</label>
						</div>
						<button
							type="submit"
							className="px-2 py-1 btn btn-success btn-sm"
							id="payButton"
							disabled={!name}
						>
							continue
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default PayScreen;
