import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./Card.css";

const Product = ({ product }) => {
	return (
		<Link to={`/product/${product._id}`}>
			<div className="card  shadow-sm rounded-3">
				{product.image.map((img) => (
					<img
						src={`https://sina-ecom-server.vercel.app/${img.name}`}
						className="card-img-top rounded-3 img-fluid"
						alt={product.name}
						key={img.name}
					/>
				))}
				<div className="card-body">
					<h5 className="card-title text-light pt-2">{`${product.name.substring(
						0,
						40
					)} ${product.name.length > 40 ? " ...." : ""}`}</h5>
					<div className="d-flex text-light justify-content-between align-items-center">
						<p className="card-text ">
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
