import React from "react";

const Category = ({ category }) => {
	return (
		<div
			role="button"
			className="ms-5 pointer-event  g-col-4 mx-auto mb-4 rounded-lg border d-flex shadow  category-box justify-content-center align-items-center"
		>
			<h4 className="text-light text-capitalize">{category?.name}</h4>
		</div>
	);
};

export default Category;
