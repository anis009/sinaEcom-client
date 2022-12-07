import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUser } from "../actions/orderActons";
import AlertMessage from "../components/Alert";
import { Spin } from "antd";
const MyOrdersScreen = () => {
	const dispatch = useDispatch();
	const userOrder = useSelector((state) => state.userOrder);
	const { orderList, loading, error } = userOrder;

	const countTotalItems = (order) => {
		const totalItems = order.orderItems.reduce((sum, val) => {
			return Number(sum) + Number(val.qty);
		}, 0);
		return totalItems;
	};
	useEffect(() => {
		dispatch(getOrderByUser());
	}, [dispatch]);
	return (
		<div className="responsive-table">
			<h1 className="text-center mt-2">MY ORDERS</h1>
			{loading ? (
				<div className="example">
					<Spin />
				</div>
			) : error ? (
				<AlertMessage type="error">{error}</AlertMessage>
			) : (
				<div style={{ overflow: "auto" }}>
					<table className="myorder-table">
						<thead>
							<tr>
								<th>#</th>
								<th>totalItems</th>
								<th>totalPrice</th>
								<th>orderedAt</th>
								<th>isDelivered</th>
								<th>paymentMethod</th>
								<th>pay</th>
								<th>cancelOrder</th>
							</tr>
						</thead>
						<tbody>
							{orderList.map((order) => (
								<tr>
									<td>{order._id.substring(0, 10)}</td>
									<td>{countTotalItems(order)}</td>
									<td>${order.totalPrice.toFixed(2)}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>
										{order.isDelivered ? (
											<i className="fas fa-check text-primary"></i>
										) : (
											<i className="fas fa-times text-danger"></i>
										)}
									</td>
									<td>{order.paymentMethod}</td>
									<td>
										{!order.isPaid ? (
											<button className="btn btn-sm btn-dark my-2">
												pay_now
											</button>
										) : (
											<button disabled>pay_now</button>
										)}
									</td>
									<td>
										<button className="btn btn-danger btn-sm">
											cancelOrder
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default MyOrdersScreen;
