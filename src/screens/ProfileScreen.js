import React from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import UserScreen from "./UserScreen";
import MyOrdersScreen from "./MyOrdersScreen";
const { TabPane } = Tabs;
const ProfileScreen = () => {
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo } = userSignup;
	console.log(userInfo);
	return (
		<div>
			<Tabs defaultActiveKey="1" centered>
				<TabPane tab="user" key="1">
					<UserScreen />
				</TabPane>
				<TabPane tab="my orders" key="2">
					<MyOrdersScreen />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default ProfileScreen;
