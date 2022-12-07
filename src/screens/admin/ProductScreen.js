import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "react-spinners/RingLoader";
import { getProduct } from "../../actions/productActions";
import Message from "../../components/Message";

const ProductScreen = () => {
	const getProducts = useSelector((state) => state.getProducts);
	const dispatch = useDispatch();
	const { error, loading, products } = getProducts;

	const loadingStyle = {
		display: "flex",
		justifyContent: "center",
		height: "60vh",
		alignItems: "center",
		width: "40vh",
		marginLeft: "400px",
		color: "red",
	};

	useEffect(() => {
		if (!products) {
			dispatch(getProduct());
		}
	}, [products, dispatch]);
	if (loading) {
		return <div>Loading...</div>;
	}
	let product_id = 0;
	return (
		<>
			<div style={{ marginLeft: "-100px" }}>
				{loading ? (
					<div style={loadingStyle}>
						<Loader />
					</div>
				) : error ? (
					<Message color="danger"> {error}</Message>
				) : (
					products && (
						<div className="productScreen">
							<table id="productScrren">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">image</th>
										<th scope="col">name</th>
										<th scope="col">user</th>
										<th scope="col">price</th>
										<th scope="col">brand</th>
										<th scope="col">countInStock</th>
										<th scope="col">category</th>
										<th colSpan="2">action</th>
									</tr>
								</thead>
								<tbody>
									{products &&
										products?.map((product) => (
											<tr>
												<td>{product_id++}</td>

												<td>
													{product.image &&
														product.image.map((img) => (
															<img
																src={img.name}
																alt=""
																key={img.name}
																style={{ width: "60px", height: "50px" }}
															/>
														))}
												</td>
												<td>{product.name.substring(0, 20)}</td>
												<td>{product.user.name}</td>
												<td>{product.price}</td>
												<td>{product.brand}</td>
												<td>{product.countInStock}</td>
												<td>{product.category}</td>
												<td>
													<Link to={`/admin/product/${product._id}`}>
														<i className="fas fa-edit"></i>
														Edit
													</Link>
												</td>
												<td>
													<p style={{ cursor: "pointer" }}>
														<i className="fas fa-trash mr-1"></i>
														Delete
													</p>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					)
				)}
			</div>
		</>
	);
};

export default ProductScreen;
