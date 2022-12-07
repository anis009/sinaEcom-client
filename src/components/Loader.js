import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState("#ffffff");

	return (
		<div className="loader">
			<ScaleLoader loading={loading} size={100} />
		</div>
	);
};

export default Loader;
