import React from "react";
import Iphone from "../../images/categories/iphone.jpg";

const Category = ({ category }) => {
	return (
		<div
			style={{ backgroundImage: `url(${Iphone})` }}
			className="pointer-event rounded-lg border category-box justify-content-center align-items-center"
		>
			<h4 className="text-light text-capitalize">{category?.name}</h4>
		</div>
	);
};

export default Category;
