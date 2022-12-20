import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleOrder } from "../actions/orderActons";
import { createPayment } from "../actions/payActions";
import AlertMessage from "../components/Alert";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
	const { orderId } = useParams();
	const getSingleOrders = useSelector((state) => state.getSingleOrder);
	const payment = useSelector((state) => state.payment);
	const { order, loading, error } = getSingleOrders;
	const { loading: paymentLoading, error: paymentError, url } = payment;
	const dispatch = useDispatch();
	useEffect(() => {
		if (url) {
			window.location.replace(url);
		}
		dispatch(getSingleOrder(orderId));
	}, [dispatch, orderId, url]);

	const paymentButtonHandler = () => {
		console.log("payment");
		dispatch(createPayment(orderId));
	};
	if (paymentLoading) {
		return <Loader></Loader>;
	}
	return (
		<div className="m-3">
			<hr />
			{loading ? (
				<div>
					<Loader />
				</div>
			) : error ? (
				<Message color="danger">{error || paymentError}</Message>
			) : (
				order && (
					<div className="row">
						<div className="col-md-8 ">
							<ul className="list-group rounded-3 list-group-flush">
								<li className="list-group-item">
									<h1 className="text-left mb-0 text-light">
										ORDERID: {orderId}
									</h1>
								</li>
								<li className="list-group-item">
									<div style={{ width: "100%" }}>
										<h2 className="text-uppercase text-light">Shipping</h2>
										<p>
											<strong className="mr-1">Name:</strong>
											{order.user.name}
										</p>
										<p className="text-light underline">
											<strong className="mr-1">Email:</strong>
											<u>
												<a
													className="text-light"
													href={`mailto:${order.user.email}`}
												>
													{order.user.email}
												</a>
											</u>
										</p>
										<p className="text-light">
											<strong className="mr-1">PhoneNumber:</strong>
											<span>{order?.phoneNumber}</span>
										</p>

										<p>
											<strong className="mr-1">Address:</strong>
											{order.shippingAddress.address} ,
											{order.shippingAddress.city} ,
											{order.shippingAddress.country}
										</p>
										{!order.isDelivered && (
											<AlertMessage type="error">Not Delivered</AlertMessage>
										)}
									</div>
								</li>
								<li className="list-group-item">
									<div style={{ width: "100%" }}>
										<h2 className="text-uppercase text-light">
											Payment Method
										</h2>
										<p>
											<strong>Method: </strong>
											<b className="badge badge-primary">
												{order.paymentMethod}
											</b>
										</p>
										{!order.isPaid && (
											<AlertMessage type="error">Not Paid</AlertMessage>
										)}
									</div>
								</li>
								<li className="list-group-item">
									<div>
										<h2 className="text-uppercase text-light">Order Items</h2>
										<ul className="list-group list-group-flush">
											{order.orderItems.map((order, index) => (
												<li className="list-group-item" key={index}>
													<div className="place-order-items">
														<div
															className=""
															style={{ display: "flex", fontSize: "18px" }}
														>
															<img
																src={`http://localhost:7070${order?.image}`}
																alt=""
																style={{
																	width: "50px",
																	height: "40px",
																	borderRadius: "3px",
																}}
															/>
															<Link
																to={`/product/${order.product}`}
																className="mx-2"
																style={{ flex: "3" }}
															>
																<p className="text-light">{order.name}</p>
															</Link>
														</div>
														<p>
															{`${order.qty} x ${order.price} = $${Number(
																Number(order.qty) * Number(order.price)
															)}`}
														</p>
													</div>
												</li>
											))}
										</ul>
									</div>
								</li>
							</ul>
						</div>

						<div className="col-md-4 rounded-3">
							<ul className="list-group rounded-3 list-group-flush">
								<li className="list-group-item">
									<h1 className="text-uppercase text-light">Order Summary</h1>
								</li>
								<li className="list-group-item">
									<strong>Items</strong>
									<span>
										$
										{Math.ceil(
											order.totalPrice - order.shippingPrice - order.taxPrice
										)}
									</span>
								</li>
								<li className="list-group-item">
									<strong>Tax</strong>
									<span>${order.taxPrice}</span>
								</li>
								<li className="list-group-item">
									<strong>Shipping</strong>
									<span>${order.shippingPrice}</span>
								</li>
								<li className="list-group-item">
									<strong>Total</strong>
									<span>${order.totalPrice}</span>
								</li>
								<li className="list-group-item">
									<button
										onClick={paymentButtonHandler}
										className="btn btn-success btn-sm"
									>
										proceed to pay by {order.paymentMethod}
									</button>
								</li>
							</ul>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default PlaceOrderScreen;
