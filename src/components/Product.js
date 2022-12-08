import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./Card.css";

const Product = ({ product }) => {
	return (
		<Link to={`/product/${product._id}`}>
			<div className="card rounded shadow-sm rounded-lg">
				{product.image.map((img) => (
					<img
						src={`http://localhost:7070${img.name}`}
						className="card-img-top img-fluid"
						alt={product.name}
						key={img.name}
					/>
				))}
				<div className="card-body">
					<h5 className="card-title pt-2">{`${product.name.substring(0, 40)} ${
						product.name.length > 40 ? " ...." : ""
					}`}</h5>
					<div className="d-flex justify-content-between align-items-center">
						<p className="card-text">
							<Rating rating={product.rating} numReviews={product.numReviews} />
						</p>
						<p className="card-text">${product.price}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Product;
