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
import AlertMessage from "../components/Alert";
import { addToCart } from "../actions/cartActions";
import { ADD_PRODUCT_REVIEW_RESET } from "../constants/productConstants";
import Time from "../components/Time";
import "./productDetailsScreen.css";
import { toast } from "react-hot-toast";
import ReactImageMagnify from "react-image-magnify";
const ProductDetailsScreen = () => {
	const [qty, setQty] = useState(1);
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(2.5);
	const navigate = useNavigate();

	const { id } = useParams();

	const dispatch = useDispatch();

	const getSingleProducts = useSelector((state) => state.getSingleProduct);
	const { userInfo } = useSelector((state) => state.userSignup);

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
		toast.success("The Product is added to cart");
		navigate("/");
	};

	if (loading) {
		return <Loader></Loader>;
	}

	const reviewSubmitHandler = async (e) => {
		if (!userInfo) {
			alert("Please,Login");
			return;
		}
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
								className="fas fa-long-arrow-alt-left text-light my-3 ml-2"
								style={{ fontSize: "20px" }}
							></i>
						</Link>
						<div>
							{/* product details section */}
							<div className="row mx-3">
								<div className="col-lg-6" style={{ zIndex: 2 }}>
									<ReactImageMagnify
										{...{
											smallImage: {
												alt: "Wristwatch by Ted Baker London",
												isFluidWidth: true,
												src: `${
													product?.image[0]?.name.includes("i.ibb.co")
														? product?.image[0]?.name
														: "https://sina-ecom-server.vercel.app/" +
														  product?.image[0]?.name
												}`,
											},
											largeImage: {
												src: `${
													product?.image[0]?.name.includes("i.ibb.co")
														? product?.image[0]?.name
														: "https://sina-ecom-server.vercel.app/" +
														  product?.image[0]?.name
												}`,
												width: 1200,
												height: 1800,
											},
										}}
									/>
									{/* <img
										src={`http://localhost:7070${product.image[0].name}`}
										className="img-fluid rounded-3"
										alt=""
										style={{ height: "450px", width: "100%" }}
									/> */}
								</div>
								<div className="col-lg-6 rounded-3">
									<ul className="list-group rounded-3 product-details-box bg-black  list-group-flush">
										<li className="list-group-item">
											<h3 className="text-light text-break">{product.name}</h3>
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
										<li className="list-group-item">
											<b>
												Status:{" "}
												{Number(product.countInStock) > 0 ? (
													<span className="badge badge-success">In Stock</span>
												) : (
													<span className="badge badge-danger">
														Out Of Stock
													</span>
												)}
											</b>
										</li>
										<li className="list-group-item">
											<b>Quantity: </b>
											<select
												name=""
												id=""
												value={qty}
												onChange={(e) => setQty(e.target.value)}
												className="px-3 bg-dark"
											>
												{[...Array(product.countInStock).keys()].map((x) => (
													<option className="bg-black" value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</li>
										<li className="list-group-item">
											<button
												className="btn btn-sm btn-success"
												onClick={addToCartHandler}
											>
												Add To cart
											</button>
										</li>
									</ul>
								</div>
							</div>
							<div className="row mx-3 my-5">
								<div className="col-lg-7">
									<div>
										{reviewError && (
											<div id="review-loading-box">
												<AlertMessage type="error">{reviewError}</AlertMessage>
											</div>
										)}
										{success && toast.success("Review successfully added")}
										{/* create your review */}
										<h1 className=" mb-1 text-capitalize text-light">
											write a customer review
										</h1>
										<hr />
										<form
											className="mb-2  p-3 rounded-3 create-review-box"
											onSubmit={reviewSubmitHandler}
										>
											<label for="rating" className="rating-label text-light">
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
												className="btn btn-success btn-sm p-2 mt-3 text-uppercase"
											>
												review
											</button>
										</form>
									</div>
								</div>
								<div className="col-lg-5">
									<h1 className="text-center  text-uppercase text-light">
										Reviews ({product.reviews.length})
									</h1>
									<hr />
									<div className="show-review-box">
										{product.reviews
											.slice(0)
											.reverse()
											.map((review) => (
												<div className="review-box rounded-3 p-3 mb-3">
													<div className="show-review-sub-box">
														<div className="left-show-review  d-flex justify-center align-items-center">
															<div className="review-profile-img mr-1 profile-belt">
																{review.name.substring(0, 2)}
															</div>
															<div className="text-capitalize text-light font-bold font-size-20">
																{review.name}
															</div>
														</div>
														<div className="right-show-review">
															<p className="mb-0">{review.comment}</p>
															<Rating rating={review.rating} />
															<p className="mb-0 mt-2">
																{<Time time={review.createdAt} />}
															</p>
														</div>
													</div>
												</div>
											))}
									</div>
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
