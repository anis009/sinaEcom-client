import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Loader from "../components/Loader";
import { ADD_PRODUCT_REVIEW_RESET } from "../constants/productConstants";
const CartScreen = () => {
	const [cartItems, setCartItems] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const fetchCartItems = useSelector((state) => state.cart);
	const { cartItems: cartitems } = fetchCartItems;

	useEffect(() => {
		dispatch({
			type: ADD_PRODUCT_REVIEW_RESET,
		});
	}, [dispatch]);
	const addToCartHandler = (qty, id) => {
		dispatch(addToCart(id, qty));
	};
	const deleteProductHandler = (id) => {
		dispatch(removeFromCart(id));
	};
	useEffect(() => {
		setCartItems(cartitems);
	}, [cartitems]);

	const totalItems = cartItems.reduce((sum, currentValue) => {
		return sum + Number(currentValue.qty);
	}, 0);

	const totalPrice = cartItems.reduce((sum, currentValue) => {
		return sum + Number(Number(currentValue.qty) * Number(currentValue.price));
	}, 0);

	return (
		<div className="cart-box mx-3 min-height-80vh">
			<div>
				<h1 className="text-center text-uppercase text-light mt-2 ">cart</h1>
			</div>
			{cartItems && cartItems.length > 0 ? (
				<div className="sub-cart-box row">
					<div className="col-md-8">
						<div class="list-group">
							{cartItems.map((product) => (
								<div className="list-group-item">
									<div
										style={{
											display: "flex",
											alignItems: "center",
											width: "100%",
										}}
									>
										<img
											src={`http://localhost:7070${product.image}`}
											alt=""
											style={{
												width: "60px",
												height: "50px",
												borderRadius: "5px",
											}}
										/>
										<Link
											style={{ flex: "2" }}
											className="ml-2"
											to={`/product/${product.product}`}
										>
											<b className="mx-2 text-light">{product.name} </b>
										</Link>

										<p className="" style={{ flex: "1" }}>
											<b className="badge badge-primary p-2 mx-2">
												{" "}
												${product.price}
											</b>
											<span>
												<i className="fas fa-times"></i>
												<b className="mb-1">{product.qty}</b>
											</span>
										</p>
										<p className="" style={{ flex: "1" }}>
											<b>
												qty:{" "}
												<select
													name=""
													id=""
													value={product.qty}
													onChange={(e) =>
														addToCartHandler(e.target.value, product.product)
													}
													className="bg-dark"
													style={{ cursor: "pointer" }}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option className="bg-dark" value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</b>
										</p>
										<button
											className="btn btn-danger btn-sm h-8"
											onClick={() => deleteProductHandler(product.product)}
											style={{}}
										>
											delete
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="col-md-4 mt-md-0 mt-2">
						<div class="list-group">
							<div className="list-group-item">
								<h1 className="text-light">Total Items : {totalItems}</h1>
							</div>
							<div className="list-group-item">
								<p className="">
									Total Price: <b className="ml-1">${totalPrice}</b>
								</p>
							</div>
							<div className="list-group-item">
								<Link
									className="btn btn-primary btn-lg d-block btn-sm text-light text-xl"
									style={{ width: "100%" }}
									to="/shipping"
								>
									proceed to buy
								</Link>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h1 className="text-danger text-center">
					there are no items in your cart
				</h1>
			)}
		</div>
	);
};

export default CartScreen;
