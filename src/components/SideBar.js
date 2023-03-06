import React from "react";
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};
	return (
		<div
			className="accordion"
			style={{ width: "100%" }}
			id="accordionPanelsStayOpenExample"
		>
			<div className="accordion-item">
				<h2 className="accordion-header" id="panelsStayOpen-headingOne">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#panelsStayOpen-collapseOne"
						aria-expanded="true"
						aria-controls="panelsStayOpen-collapseOne"
					>
						products
					</button>
				</h2>
				<div
					id="panelsStayOpen-collapseOne"
					className="accordion-collapse collapse show"
					aria-labelledby="panelsStayOpen-headingOne"
				>
					<div className="accordion-body">
						<div className="m-2">
							<Link to="/admin/addproduct" className="btn btn-light w-100">
								Add product
							</Link>
						</div>
						<div className="mt-2">
							<Link to="/admin/product" className="btn btn-light w-100">
								Show products
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<h2 className="accordion-header" id="panelsStayOpen-headingTwo">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#panelsStayOpen-collapseTwo"
						aria-expanded="false"
						aria-controls="panelsStayOpen-collapseTwo"
					>
						users
					</button>
				</h2>
				<div
					id="panelsStayOpen-collapseTwo"
					className="accordion-collapse collapse"
					aria-labelledby="panelsStayOpen-headingTwo"
				>
					<div className="accordion-body">
						<div className="m-2 pt-2">
							<Link className="btn btn-light w-100">Add user</Link>
						</div>
						<div className="m-2 pt-2">
							<Link className="btn btn-light w-100">Show users</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="accordion-item">
				<h2 className="accordion-header" id="panelsStayOpen-headingThree">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#panelsStayOpen-collapseThree"
						aria-expanded="false"
						aria-controls="panelsStayOpen-collapseThree"
					>
						category
					</button>
				</h2>
				<div
					id="panelsStayOpen-collapseThree"
					className="accordion-collapse collapse"
					aria-labelledby="panelsStayOpen-headingThree"
				>
					<div className="accordion-body">
						<div className="m-2 pt-2">
							<Link to="/admin/addcategory" className="btn btn-light w-100">
								Add category
							</Link>
						</div>
						<div className="m-2 pt-2">
							<Link className="btn btn-light w-100">Show category</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
