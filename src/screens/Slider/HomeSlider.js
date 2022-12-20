import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
const HomeSlider = () => {
	let settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 700,
		infinite: true,
		dots: true,
	};

	const renderSlides = () =>
		[
			{
				url: "https://i.ibb.co/c1RLmzZ/mobile-phone-ga828e63dd-1920-1-1400x250.jpg",
			},
			{
				url: "https://i.ibb.co/c1RLmzZ/mobile-phone-ga828e63dd-1920-1-1400x250.jpg",
			},
			{
				url: "https://i.ibb.co/c1RLmzZ/mobile-phone-ga828e63dd-1920-1-1400x250.jpg",
			},
		].map((url, index) => (
			<div key={index}>
				<img
					src={url.url}
					width="100%"
					height="250px"
					className="rounded"
					alt=""
				/>
			</div>
		));
	return (
		<div className="w-100 px-5 p-2">
			<Slider dots={true} {...settings}>
				{renderSlides()}
			</Slider>
		</div>
	);
};

export default HomeSlider;
