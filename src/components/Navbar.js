import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import {
	USER_LOGIN_RESET,
	USER_REGISTER_RESET,
} from "../constants/userConstants";

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
				<Link className="navbar-brand px-2" to="/">
					SinaEcom
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavDropdown"
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
						<button type="submit">search</button>
					</form>

					<ul className="navbar-nav ml-auto">
						<li className="nav-item ">
							<Link
								className="nav-link d-flex   align-items-center font-size-20"
								to="/cart"
								style={{ display: "flex" }}
							>
								<i className="fas fa-cart-arrow-down font-size-20"></i>

								<div className="font-size-20 position-relative">
									<span>Cart</span>
									{Number(totalItems) !== 0 ? (
										<span
											style={{ top: -8, right: -5 }}
											class="badge badge-danger position-absolute flex align-items-center font-size-20 cart-badge"
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
								<li className="nav-item dropdown mr-2">
									<a
										className="nav-link dropdown-toggle"
										href="!#"
										id="navbarDropdownMenuLink"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										<span className="mr-1 ml-1">
											<i className="fas fa-user"></i>
										</span>
										{userInfo.name}
									</a>
									<div
										className="dropdown-menu"
										aria-labelledby="navbarDropdownMenuLink"
									>
										<Link
											className="dropdown-item d-block flex items-center"
											to="/profile"
										>
											<i className="fas fa-male mr-1"></i>
											<span>Profile</span>
										</Link>
										<p
											className="dropdown-item"
											onClick={logoutHandler}
											style={{ cursor: "pointer" }}
										>
											<i class="fas fa-sign-out-alt mr-1"></i>
											<span>Logout</span>
										</p>
									</div>
								</li>
								{userInfo.isAdmin && (
									<li className="nav-item mr-3">
										<Link
											className="nav-link"
											to="/admin"
											style={{ display: "flex" }}
										>
											<span className="mr-1 ml-1">
												<i class="fas fa-users-cog"></i>
											</span>
											admin
										</Link>
									</li>
								)}
							</>
						)}
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
