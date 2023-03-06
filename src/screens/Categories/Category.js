import React from "react";

const Category = ({ category }) => {
	return (
		<div className=" d-flex flex-column rounded-lg border category-box justify-content-center align-items-center">
			<div className="">
				<img className="category__image" src={category?.image} alt="" />
			</div>
			<h4 className="text-light mt-2 text-capitalize">{category?.name}</h4>
		</div>
	);
};

export default Category;
