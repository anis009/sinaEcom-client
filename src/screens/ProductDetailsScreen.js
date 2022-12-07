import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	addProductReview,
	getProduct,
	getSingleProduct,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { Spin } from "antd";
import AlertMessage from "../components/Alert";
import { addToCart } from "../actions/cartActions";
import { ADD_PRODUCT_REVIEW_RESET } from "../constants/productConstants";
import Time from "../components/Time";

const ProductDetailsScreen = () => {
	const [qty, setQty] = useState(1);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(2.5);
	const navigate = useNavigate();

	const { id } = useParams();

	const dispatch = useDispatch();

	const getSingleProducts = useSelector((state) => state.getSingleProduct);

	const { product, loading, error } = getSingleProducts;

	const productReview = useSelector((state) => state.addProductReview);
	const { loading: reviewLoading, error: reviewError, success } = productReview;
	//console.log(reviewError);

	useEffect(() => {
		if (!product) {
			dispatch(getSingleProduct(id));
		}
		if (success === true) {
			dispatch(getSingleProduct(id));
			dispatch({
				type: ADD_PRODUCT_REVIEW_RESET,
			});
		}
	}, [id, dispatch, success, product]);

	const addToCartHandler = () => {
		dispatch(addToCart(id, qty));
		navigate("/");
	};

	const reviewSubmitHandler = async (e) => {
		e.preventDefault();
		dispatch(addProductReview(id, { rating, comment: review }));
	};

	return (
		<>
			{loading ? (
				<div className="loadingBox">
					<Loader />
				</div>
			) : error ? (
				<>
					<Message color="danger">{error}</Message>
				</>
			) : (
				product && (
					<>
						<Link to="/" className="ml-4">
							<i
								class="fas fa-long-arrow-alt-left"
								style={{ fontSize: "20px" }}
							></i>
						</Link>
						<div className="row m-3">
							<div className="col-lg-6">
								<img
									src={`http://localhost:7070${product.image[0].name}`}
									className="img-fluid"
									alt=""
									style={{ height: "450px", width: "100%" }}
								/>
							</div>
							<div className="col-lg-6">
								<ul class="list-group list-group-flush">
									<li className="list-group-item">
										<h1 className="">{product.name}</h1>
									</li>
									<li className="list-group-item">
										<p>
											<b> description: </b> {product.description}
										</p>
									</li>
									<li className="list-group-item">
										<b>price: ${product.price}</b>
									</li>
									<li className="list-group-item">
										<Rating
											rating={product.rating}
											numReviews={product.numReviews}
										/>
									</li>
									<li class="list-group-item">
										<b>
											Status:{" "}
											{Number(product.countInStock) > 0 ? (
												<span className="badge badge-dark">In Stock</span>
											) : (
												<span className="badge badge-danger">Out Of Stock</span>
											)}
										</b>
									</li>
									<li class="list-group-item">
										<b>Quantity: </b>
										<select
											name=""
											id=""
											value={qty}
											onChange={(e) => setQty(e.target.value)}
											className="px-3"
										>
											{[...Array(product.countInStock).keys()].map((x) => (
												<option value={x + 1}>{x + 1}</option>
											))}
										</select>
									</li>
									<li class="list-group-item">
										<button className="btn btn-dark" onClick={addToCartHandler}>
											Add To cart
										</button>
									</li>
								</ul>
							</div>
						</div>
						<hr className="mt-5" />

						<div className="row m-3">
							<div className="col-lg-7">
								{reviewLoading ? (
									<div className="example">
										<Spin />
									</div>
								) : (
									<>
										<h1 className="mb-0">write a customer review</h1>
										{reviewError && (
											<div id="review-loading-box">
												<AlertMessage type="error">{reviewError}</AlertMessage>
											</div>
										)}
										{success && (
											<div id="review-loading-box">
												<AlertMessage type="success">
													<p>Review is submitted successfully</p>
												</AlertMessage>
											</div>
										)}

										<form action="" onSubmit={reviewSubmitHandler}>
											<label for="rating" className="rating-label">
												Rating:
											</label>
											<select
												name="rating"
												id="rating"
												className="text-uppercase p-2"
												required
												onChange={(e) => setRating(e.target.value)}
											>
												<option value="3">choose your rating</option>
												<option value="1">1-poor</option>
												<option value="2">2-fair</option>
												<option value="3">3-good</option>
												<option value="4">4-very good</option>
												<option value="5">5-excellent</option>
											</select>
											<div className="comment-box mt-2">
												<textarea
													name=""
													id=""
													cols="20"
													rows="3"
													placeholder="write a comment..."
													required
													className="mr-2 px-2"
													onChange={(e) => setReview(e.target.value)}
												></textarea>
											</div>
											<button
												type="submit"
												className="btn btn-dark btn-sm p-2 mt-2 text-uppercase"
											>
												review
											</button>
										</form>
									</>
								)}
							</div>
							<div className="col-lg-5">
								<h1 className="text-center text-uppercase">
									Reviews ({product.reviews.length})
								</h1>
								<hr />
								<div className="show-review-box">
									{product.reviews
										.slice(0)
										.reverse()
										.map((review) => (
											<div>
												<div className="show-review-sub-box">
													<div className="left-show-review">
														<span className="review-img">
															{review.name.substring(0, 1)}
														</span>
														<strong className="text-uppercase">
															{review.name}
														</strong>
													</div>
													<div className="right-show-review">
														<Rating rating={review.rating} />
														<p>{review.comment}</p>
														<span>{<Time time={review.createdAt} />}</span>
													</div>
												</div>
												<hr />
											</div>
										))}
								</div>
							</div>
						</div>
					</>
				)
			)}
		</>
	);
};

export default ProductDetailsScreen;
