import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Category from "./Category";
import "./Categories.css";

const Categories = () => {
	const { categories, loading } = useSelector((state) => state.categories);

	return (
		<div>
			{loading && <Loader></Loader>}
			<h1 className="text-light fs-3 font-semibold ms-2 pt-3">Categories</h1>
			<div className="categories ms-2">
				{categories &&
					categories.map((category, index) => (
						<Category key={index} category={category}></Category>
					))}
			</div>
		</div>
	);
};

export default Categories;
