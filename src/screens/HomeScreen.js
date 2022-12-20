import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../actions/categoriesAction";
import ProductList from "../components/ProductList";
import Categories from "./Categories/Categories";
import HomeSlider from "./Slider/HomeSlider";

const HomeScreen = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
	return (
		<>
			<HomeSlider></HomeSlider>
			<Categories></Categories>
			<ProductList />
		</>
	);
};

export default HomeScreen;
