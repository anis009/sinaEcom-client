import React from "react";

const Rating = ({ rating, numReviews }) => {
	rating = Number(rating);
	return (
		<div className="ratingBox">
			<span className="">
				{rating >= 1 ? (
					<img src="/images/star-filled.png" alt="" />
				) : rating >= 0.5 ? (
					<img src="/images/star-half-empty.png" alt="" />
				) : (
					<img src="/images/pixel-star.png" alt="" />
				)}
			</span>
			<span>
				{rating >= 2 ? (
					<img src="/images/star-filled.png" alt="" />
				) : rating >= 1.5 ? (
					<img src="/images/star-half-empty.png" alt="" />
				) : (
					<img src="/images/pixel-star.png" alt="" />
				)}
			</span>

			<span>
				{rating >= 3 ? (
					<img src="/images/star-filled.png" alt="" />
				) : rating >= 2.5 ? (
					<img src="/images/star-half-empty.png" alt="" />
				) : (
					<img src="/images/pixel-star.png" alt="" />
				)}
			</span>

			<span>
				{rating >= 4 ? (
					<img src="/images/star-filled.png" alt="" />
				) : rating >= 3.5 ? (
					<img src="/images/star-half-empty.png" alt="" />
				) : (
					<img src="/images/pixel-star.png" alt="" />
				)}
			</span>
			<span>
				{rating >= 5 ? (
					<img src="/images/star-filled.png" alt="" />
				) : rating >= 4.5 ? (
					<img src="/images/star-half-empty.png" alt="" />
				) : (
					<img src="/images/pixel-star.png" alt="" />
				)}
			</span>
			{numReviews && <span className="ml-1">{` (${numReviews}reviews)`}</span>}
		</div>
	);
};

export default Rating;
