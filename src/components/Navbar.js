import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import {
	USER_LOGIN_RESET,
	USER_REGISTER_RESET,
} from "../constants/userConstants";
import "./Navbar.css";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo } = userSignup;
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const totalItems = cartItems.reduce((sum, item) => {
		return sum + Number(item.qty);
	}, 0);
	const logoutHandler = () => {
		dispatch({
			type: USER_REGISTER_RESET,
		});
		dispatch({
			type: USER_LOGIN_RESET,
		});
		navigate("/login");
	};

	const submitSearchHandler = (e) => {
		e.preventDefault();
		if (search) {
			navigate(`/search/${search}`);
		}
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand text-light px-2" to="/">
						SinaEcom
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<form className="search-box" onSubmit={submitSearchHandler}>
							<input
								type="search"
								name=""
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								id=""
								placeholder="search..."
							/>
							<button type="submit" className="">
								search
							</button>
						</form>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item ">
								<Link
									className="nav-link d-flex align-items-center font-size-20"
									to="/cart"
									style={{ display: "flex" }}
								>
									<i className="fas fa-cart-arrow-down font-size-20"></i>

									<div className="font-size-20 position-relative">
										<span>Cart</span>
										{Number(totalItems) !== 0 ? (
											<span
												style={{ top: -8, right: -5 }}
												className="badge badge-danger position-absolute flex align-items-center font-size-20 cart-badge"
											>
												<div>{totalItems}</div>
											</span>
										) : (
											""
										)}
									</div>
								</Link>
							</li>
							{!userInfo ? (
								<li className="nav-item mr-4">
									<Link
										className="nav-link flex  d-flex align-items-center"
										to="/login"
									>
										<i className="fas font-size-20 fa-sign-in-alt mr-1"></i>
										<span className="font-size-20">SignIn</span>
									</Link>
								</li>
							) : (
								<>
									<li className="nav-item mx-2  dropdown">
										<a
											className="nav-link dropdown-toggle"
											href="#"
											id="navbarDropdown"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											user
										</a>
										<ul
											className="dropdown-menu drop-down-bg"
											aria-labelledby="navbarDropdown"
										>
											<li>
												<Link
													className="dropdown-item text-light d-block flex items-center"
													to="/profile"
												>
													<i className="fas fa-male mr-1"></i>
													<span>Profile</span>
												</Link>
											</li>
											<li>
												<p
													className="dropdown-item text-light"
													onClick={logoutHandler}
													style={{ cursor: "pointer" }}
												>
													<i className="fas fa-sign-out-alt mr-1"></i>
													<span>Logout</span>
												</p>
											</li>
										</ul>
									</li>

									{userInfo.isAdmin && (
										<li className="nav-item me-2">
											<Link
												className="nav-link"
												to="/admin"
												style={{ display: "flex" }}
											>
												admin
											</Link>
										</li>
									)}
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
