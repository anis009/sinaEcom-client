import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./Card.css";

const Product = ({ product }) => {
	return (
		<div className="card">
			<Link to={`/product/${product._id}`}>
				{product.image.map((img) => (
					<img
						src={`http://localhost:7070${img.name}`}
						className="card-img-top img-fluid"
						alt={product.name}
						key={img.name}
					/>
				))}
			</Link>
			<div className="card-body">
				<Link to={`/product/${product._id}`}>
					<h5 className="card-title pt-2">{`${product.name.substring(0, 40)} ${
						product.name.length > 40 ? " ...." : ""
					}`}</h5>
				</Link>
				<p className="card-text">
					<Rating rating={product.rating} numReviews={product.numReviews} />
				</p>
				<p className="card-text">${product.price}</p>
			</div>
		</div>
	);
};

export default Product;
