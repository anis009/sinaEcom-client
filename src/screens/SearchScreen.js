import React, { useEffect, useState } from "react";
import { getProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
	PRODUCT_SINGLE_RESET,
	ADD_PRODUCT_REVIEW_RESET,
} from "../constants/productConstants";

const SearchScreen = () => {
	const loadingStyle = {
		display: "flex",
		justifyContent: "center",
		height: "60vh",
		alignItems: "center",
	};

	const { searchProduct } = useParams();

	const getProducts = useSelector((state) => state.getProducts);

	const { loading, error, products } = getProducts;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProduct(searchProduct, 1));
	}, [dispatch, searchProduct]);

	return (
		<>
			{loading ? (
				<div style={loadingStyle}>
					<Loader />
				</div>
			) : error ? (
				<Message color="danger">{error}</Message>
			) : (
				<div className="product-box">
					{products && products.products.length < 1 && (
						<p className="text-danger text-center h-4">
							there is no product for this search "{searchProduct}"
						</p>
					)}
					{products &&
						products.products.map((product) => (
							<Product product={product} key={product._id} />
						))}
				</div>
			)}
		</>
	);
};

export default SearchScreen;
