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

	if (loading) {
		return <Loader></Loader>;
	}

	return (
		<div className="m-3">
			<h1 className="text-left text-light">ORDER: {orderId}</h1>
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
						<div className="col-md-8 ">
							<ul class="list-group rounded-3 list-group-flush">
								<li class="list-group-item">
									<div style={{ width: "100%" }}>
										<h2 className="text-uppercase text-light">Shipping</h2>
										<p>
											<strong className="mr-1">Name:</strong>
											{order.user.name}
										</p>
										<p className="text-light">
											<strong className="mr-1">Email:</strong>
											<a
												className="text-light"
												href={`mailto:${order.user.email}`}
											>
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
								<li class="list-group-item">
									<div>
										<h2 className="text-uppercase text-light">Order Items</h2>
										<ul class="list-group list-group-flush">
											{order.orderItems.map((order) => (
												<li class="list-group-item">
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
							<ul class="list-group rounded-3 list-group-flush">
								<li class="list-group-item">
									<h1 className="text-uppercase text-light">Order Summary</h1>
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
									<button className="btn btn-success btn-sm">
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
