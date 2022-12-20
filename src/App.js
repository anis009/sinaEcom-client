import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { RouterProvider } from "react-router-dom/dist";
import router from "./Router/Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div style={{ maxWidth: 1450 }} className="mx-auto mb-0">
			<RouterProvider router={router}></RouterProvider>
			<Toaster></Toaster>
		</div>
	);
}

export default App;
