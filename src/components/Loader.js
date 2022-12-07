import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
	return (
		<div>
			<ThreeCircles
				height="100"
				width="100"
				color="black"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="three-circles-rotating"
				outerCircleColor=""
				innerCircleColor=""
				middleCircleColor=""
			/>
		</div>
	);
};

export default Loader;