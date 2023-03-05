import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout/AdminLayout";
import Main from "../../Layout/Main/Main";
import AddProductScreen from "../../screens/admin/AddProductScreen";
import EditProductScreen from "../../screens/admin/EditProductScreen";
import ProductScreen from "../../screens/admin/ProductScreen";
import CartSreen from "../../screens/CartScreen";
import CartScreen from "../../screens/CartScreen";
import HomeScreen from "../../screens/HomeScreen";
import PayScreen from "../../screens/PayScreen";
import PlaceOrderScreen from "../../screens/PlaceOrderScreen";
import ProductDetailsScreen from "../../screens/ProductDetailsScreen";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";
import ShippingScreen from "../../screens/ShippingScreen";
import SigninScreen from "../../screens/SigninScreen";
import SignupScreen from "../../screens/SignupScreen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <HomeScreen></HomeScreen>,
			},
			{
				path: "/profile",
				element: <ProfileScreen></ProfileScreen>,
			},
			{
				path: "/cart",
				element: <CartScreen></CartScreen>,
			},
			{
				path: "/product/:id",
				element: <ProductDetailsScreen></ProductDetailsScreen>,
			},
			{
				path: "/search/:searchProduct",
				element: <SearchScreen />,
			},
			{
				path: "/shipping",
				element: <ShippingScreen></ShippingScreen>,
			},
			{
				path: "/payment",
				element: <PayScreen></PayScreen>,
			},
			{
				path: "/placeorder/:orderId",
				element: <PlaceOrderScreen></PlaceOrderScreen>,
			},
			{
				path: "/login",
				element: <SigninScreen></SigninScreen>,
			},
			{
				path: "/signup",
				element: <SignupScreen></SignupScreen>,
			},
		],
	},
	{
		path: "/admin",
		element: <AdminLayout></AdminLayout>,
		children: [
			{
				path: "/admin",
				element: <div>anis mola</div>,
			},
			{
				path: "/admin/addproduct",
				element: <AddProductScreen />,
			},
			{
				path: "/admin/product",
				element: <ProductScreen />,
			},
		],
	},
]);

export default router;
