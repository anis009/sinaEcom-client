import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUser } from "../../actions/orderActons";
import AlertMessage from "../../components/Alert";
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
		<div className="responsive-table min-height-80vh">
			{loading ? (
				<div className="example">
					<Spin />
				</div>
			) : error ? (
				<AlertMessage type="error">{error}</AlertMessage>
			) : (
				<div style={{ overflow: "auto" }} className="p-3">
					<table className="table table-bordered">
						<tr className="text-center text-light">
							<th scope="col">#</th>
							<th scope="col" className="text-success text-center font-size-18">
								totalItems
							</th>
							<th scope="col" className="text-success text-center font-size-18">
								totalPrice
							</th>
							<th scope="col" className="text-success text-center font-size-18">
								orderedAt
							</th>
							<th scope="col" className="text-success text-center font-size-18">
								isDelivered
							</th>
							<th scope="col" className="text-success text-center font-size-18">
								paymentMethod
							</th>
							<th scope="col" className="text-success text-center font-size-18">
								pay
							</th>
							<th scope="col" className="text-success text-center font-size-18">
								cancelOrder
							</th>
						</tr>

						{orderList.map((order, idx) => (
							<tr key={idx} className="text-light">
								<td className="text-center" scope="row">
									{idx + 1}
								</td>
								<td className="text-center">{countTotalItems(order)}</td>
								<td className="text-center">${order.totalPrice.toFixed(2)}</td>
								<td className="text-center">
									{order.createdAt.substring(0, 10)}
								</td>
								<td className="text-center">
									{order.isDelivered ? (
										<i className="fas fa-check text-primary"></i>
									) : (
										<i className="fas fa-times text-danger"></i>
									)}
								</td>
								<td className="text-center ">
									<div className="badge badge-danger bg-success">
										{order.paymentMethod}
									</div>
								</td>
								<td className="text-center">
									{!order.isPaid ? (
										<div>
											<button className="btn btn-success btn-sm">
												pay_now
											</button>
										</div>
									) : (
										<div>
											<button disabled className="btn btn-success btn-sm">
												pay_now
											</button>
										</div>
									)}
								</td>
								<td className="text-center">
									<div>
										<button className="btn btn-danger btn-sm">
											cancelOrder
										</button>
									</div>
								</td>
							</tr>
						))}
					</table>
				</div>
			)}
		</div>
	);
};

export default MyOrdersScreen;
