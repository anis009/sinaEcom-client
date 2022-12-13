import React from "react";
import { Outlet } from "react-router-dom/dist";
import Navbar from "../../components/Navbar";
import FooterScreen from "../../screens/Footer/FooterScreen";

const Main = () => {
	return (
		<div>
			<Navbar></Navbar>
			<Outlet></Outlet>
			<FooterScreen></FooterScreen>
		</div>
	);
};

export default Main;
