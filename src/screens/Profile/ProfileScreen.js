import React from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import UserScreen from "./UserScreen";
import MyOrdersScreen from "./MyOrdersScreen";
import "./Profile.css";
const { TabPane } = Tabs;
const ProfileScreen = () => {
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo } = userSignup;
	console.log(userInfo);
	return (
		<div>
			<Tabs defaultActiveKey="2" centered>
				<TabPane className="text-light" tab="user" key="1">
					<UserScreen />
				</TabPane>
				<TabPane
					className="text-light"
					style={{ color: "white" }}
					tab="my orders"
					key="2"
				>
					<MyOrdersScreen />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default ProfileScreen;
