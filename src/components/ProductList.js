import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getProduct, getTopProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import Loader from "./Loader";
import Message from "./Message";
import {
	PRODUCT_SINGLE_RESET,
	ADD_PRODUCT_REVIEW_RESET,
} from "../constants/productConstants";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
	console.log("sina");
	const loadingStyle = {
		display: "flex",
		justifyContent: "center",
		height: "60vh",
		alignItems: "center",
	};

	const [width, setWidth] = useState(0);
	const carousel = useRef();

	// useEffect(() => {
	// 	setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
	// 	console.log(carousel.current.scrollWidth);
	// }, []);

	const getProducts = useSelector((state) => state.getProducts);
	const getTopProducts = useSelector((state) => state.getTopProducts);
	const { loading, error, products } = getProducts;
	const {
		loading: topProductLoading,
		error: topProductsError,
		products: topProducts,
	} = getTopProducts;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct("", 1));
		dispatch(getTopProduct());
		dispatch({
			type: PRODUCT_SINGLE_RESET,
		});
		dispatch({
			type: ADD_PRODUCT_REVIEW_RESET,
		});
	}, [dispatch]);

	const numsArray = [];
	let pageSize;
	if (products) {
		pageSize = products.pageSize;
		for (let i = 1; i <= pageSize; i++) {
			numsArray.push(i);
		}
	}

	const fetchProducts = (pageNumber) => {
		dispatch(getProduct("", pageNumber));
	};

	return (
		<>
			{loading ? (
				<div style={loadingStyle}>
					<Loader />
				</div>
			) : error ? (
				<Message color="danger">{error}</Message>
			) : (
				<>
					<h1 className="latest-product-header text-light">Latest Products</h1>
					<div className="product-box" style={{ backgroundColor: "#001524" }}>
						{products &&
							products.products.map((product) => (
								<Product product={product} key={product._id} />
							))}
					</div>
					<ul className="pagination-box my-5">
						{numsArray.map((item, index) => (
							<li className="" key={index}>
								<p
									className={
										Number(item) === Number(products.pageNumber) ? "active" : ""
									}
									onClick={() => fetchProducts(item)}
								>
									{item}
								</p>
							</li>
						))}
					</ul>
				</>
			)}
		</>
	);
};

export default ProductList;
