import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import AddProductScreen from "./AddProductScreen";
import ProductScreen from "./admin/ProductScreen";

const AdminScreen = () => {
	let search = useLocation().search;
	search = search.split("=")[1];
	const edit_back = search;
	console.log("search", search);
	const [users, setUsers] = useState(false);
	const [products, setProducts] = useState(false);
	const [addUsers, setAddUsers] = useState(false);
	const [addProducts, setAddProducts] = useState(false);
	const [showProducts, setShowProducts] = useState(false);

	useEffect(() => {
		if (edit_back === "edit_back") {
			setShowProducts(true);
		}
	}, [edit_back]);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: "PRODUCT_SINGLE_RESET" });
	}, [dispatch]);
	return (
		<div className="admin-box">
			<div className="left-side">
				<div>
					<a
						data-toggle="collapse"
						href="#multiCollapseExample1"
						aria-expanded="false"
						aria-controls="multiCollapseExample1"
						onClick={(e) => setUsers(!users)}
						className="mb-1"
					>
						users
						<span>
							<i
								className={
									!users
										? "fas fa-chevron-right ml-1"
										: "fas fa-chevron-down ml-1"
								}
								style={{ fontSize: "14px" }}
							></i>
						</span>
					</a>

					<div className="collapse multi-collapse" id="multiCollapseExample1">
						<ul className="ml-3" style={{ borderLeft: "2px solid black" }}>
							<li className="ml-1">
								<p className="mb-1">Users</p>
							</li>
							<li className="ml-1">
								<p onClick={(e) => setAddUsers(!addUsers)}>Add User</p>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<a
						data-toggle="collapse"
						href="#multiCollapseExample"
						aria-expanded="false"
						aria-controls="multiCollapseExample"
						onClick={(e) => setProducts(!products)}
						className="mb-1"
					>
						products
						<span>
							<i
								className={
									!products
										? "fas fa-chevron-right ml-1"
										: "fas fa-chevron-down ml-1"
								}
								style={{ fontSize: "14px" }}
							></i>
						</span>
					</a>

					<div className="collapse multi-collapse" id="multiCollapseExample">
						<ul className="ml-3" style={{ borderLeft: "2px solid black" }}>
							<li className="ml-1 mb-2">
								<span
									style={{ cursor: "pointer" }}
									onClick={() => {
										setShowProducts(true);
										setAddProducts(false);
									}}
								>
									products
								</span>
							</li>
							<li className="ml-1">
								<span
									onClick={() => {
										setAddProducts(true);
										setShowProducts(false);
									}}
									style={{ cursor: "pointer" }}
								>
									Add Products
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<ul>
						<li>
							<a href="!#">orders</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="right-side">
				{addProducts && <AddProductScreen />}
				{showProducts && <ProductScreen />}
			</div>
		</div>
	);
};

export default AdminScreen;
