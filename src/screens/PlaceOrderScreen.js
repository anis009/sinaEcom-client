import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleOrder } from "../actions/orderActons";
import AlertMessage from "../components/Alert";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
	const { orderId } = useParams();
	const getSingleOrders = useSelector((state) => state.getSingleOrder);
	const { order, loading, error } = getSingleOrders;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSingleOrder(orderId));
	}, [dispatch, orderId]);

	return (
		<div>
			<h1 className="text-left">ORDER: {orderId}</h1>
			<hr />
			{loading ? (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Loader />
				</div>
			) : error ? (
				<Message color="danger">{error}</Message>
			) : (
				order && (
					<div className="row">
						<div className="col-md-8">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									<div style={{ width: "100%" }}>
										<h2 className="text-uppercase">Shipping</h2>
										<p>
											<strong className="mr-1">Name:</strong>
											{order.user.name}
										</p>
										<p>
											<strong className="mr-1">Email:</strong>
											<a href={`mailto:${order.user.email}`}>
												{order.user.email}
											</a>
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
								<li class="list-group-item">
									<div style={{ width: "100%" }}>
										<h2 className="text-uppercase">Payment Method</h2>
										<p>
											<strong>Method: </strong>
											{order.paymentMethod}
										</p>
										{!order.isPaid && (
											<AlertMessage type="error">Not Paid</AlertMessage>
										)}
									</div>
								</li>
								<li class="list-group-item">
									<div>
										<h2 className="text-uppercase">Order Items</h2>
										<ul class="list-group list-group-flush">
											{order.orderItems.map((or) => (
												<li class="list-group-item">
													<div className="place-order-items">
														<div
															className=""
															style={{ display: "flex", fontSize: "18px" }}
														>
															<img
																src={or.image}
																alt=""
																style={{
																	width: "50px",
																	height: "40px",
																	borderRadius: "3px",
																}}
															/>
															<Link
																to={`/product/${or.product}`}
																className="mx-2"
																style={{ flex: "3" }}
															>
																<p>{or.name}</p>
															</Link>
														</div>
														<p>
															{`${or.qty} x ${or.price} = $${Number(
																Number(or.qty) * Number(or.price)
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
						<div className="col-md-4">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									<h1 className="text-uppercase">Order Summary</h1>
								</li>
								<li class="list-group-item">
									<strong>Items</strong>
									<span>
										$
										{Math.ceil(
											order.totalPrice - order.shippingPrice - order.taxPrice
										)}
									</span>
								</li>
								<li class="list-group-item">
									<strong>Tax</strong>
									<span>${order.taxPrice}</span>
								</li>
								<li class="list-group-item">
									<strong>Shipping</strong>
									<span>${order.shippingPrice}</span>
								</li>
								<li class="list-group-item">
									<strong>Total</strong>
									<span>${order.totalPrice}</span>
								</li>
								<li class="list-group-item">
									<button className="btn btn-primary btn-sm">
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
