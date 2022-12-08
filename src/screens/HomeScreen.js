import React from "react";
import ProductList from "../components/ProductList";
import FooterScreen from "./FooterScreen";

const HomeScreen = () => {
	return (
		<>
			<ProductList />
			<FooterScreen></FooterScreen>
		</>
	);
};

export default HomeScreen;
