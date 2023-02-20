import React from "react";
import { FaStarHalf, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const Rating = ({ rating, numReviews }) => {
	rating = Number(rating);
	return (
		<div className="ratingBox text-light">
			<span className="">
				{rating >= 1 ? (
					<FaStar className="rating"></FaStar>
				) : rating >= 0.5 ? (
					<FaStarHalfAlt className="rating"></FaStarHalfAlt>
				) : (
					<FaRegStar className="rating"></FaRegStar>
				)}
			</span>
			<span>
				{rating >= 2 ? (
					<FaStar className="rating"></FaStar>
				) : rating >= 1.5 ? (
					<FaStarHalfAlt className="rating"></FaStarHalfAlt>
				) : (
					<FaRegStar className="rating"></FaRegStar>
				)}
			</span>

			<span>
				{rating >= 3 ? (
					<FaStar className="rating"></FaStar>
				) : rating >= 2.5 ? (
					<FaStarHalfAlt className="rating"></FaStarHalfAlt>
				) : (
					<FaRegStar className="rating"></FaRegStar>
				)}
			</span>

			<span>
				{rating >= 4 ? (
					<FaStar className="rating"></FaStar>
				) : rating >= 3.5 ? (
					<FaStarHalfAlt className="rating"></FaStarHalfAlt>
				) : (
					<FaRegStar className="rating"></FaRegStar>
				)}
			</span>
			<span>
				{rating >= 5 ? (
					<FaStar className="rating"></FaStar>
				) : rating >= 4.5 ? (
					<FaStarHalfAlt className="rating"></FaStarHalfAlt>
				) : (
					<FaRegStar className="rating"></FaRegStar>
				)}
			</span>
			{numReviews && <span className="ml-1">{` (${numReviews}reviews)`}</span>}
		</div>
	);
};

export default Rating;
