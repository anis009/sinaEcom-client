import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import "./Admin.css";
const AdminLayout = () => {
	return (
		<div className="overflow-hidden">
			<div className="row">
				<div className="col-md-3 px-0 bg-light" style={{ height: "100vh" }}>
					<SideBar />
				</div>
				<div className="col-md-9 bg-light">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
