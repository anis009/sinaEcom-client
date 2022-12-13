import React from "react";
import { Outlet } from "react-router-dom/dist";
import DashboardHeader from "../../Admin/components/DashboardHeader";
import SideBar from "../../Admin/components/Sidebar";
import sidebar_menu from "../../Admin/constants/sidebar-menu";
const AdminLayout = () => {
	return (
		<div className="dashboard-body">
			<DashboardHeader></DashboardHeader>
			<div className="d-flex">
				<SideBar menu={sidebar_menu}></SideBar>
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default AdminLayout;
