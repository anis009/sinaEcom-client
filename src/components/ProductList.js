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
		loaing: topProductLoading,
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
					<div>
						<div>
							<h1 className="top-rated-header">Top Rated Products</h1>
							<div>
								<motion.div ref={carousel} className="carousel">
									<motion.div
										drag="x"
										dragConstraints={{ right: 0, left: -width }}
										whileTap={{ cursor: "grabbing" }}
										className="inner-carousel"
									>
										{topProducts &&
											topProducts.map((pr) => {
												return (
													<div>
														<motion.div className="item" key={pr.name}>
															<img
																src={`http://localhost:7070${pr.image[0].name}`}
																alt=""
															/>
															<Link
																to={`/product/${pr._id}`}
																className="carousel-view-details btn btn-lg"
															>
																view details
															</Link>
														</motion.div>
													</div>
												);
											})}
									</motion.div>
								</motion.div>
							</div>
						</div>
					</div>

					<h1 className="latest-product-header">Latest Products</h1>
					<div className="product-box">
						{products &&
							products.products.map((product) => (
								<Product product={product} key={product._id} />
							))}
					</div>
					<ul className="pagination-box my-5">
						{numsArray.map((item) => (
							<li>
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
