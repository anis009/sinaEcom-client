import { useState } from "react";
import { Alert } from "antd";
import "./Alert.css";

const AlertMessage = ({ children, type }) => {
	const [visible, setVisible] = useState(true);

	const handleClose = () => {
		setVisible(false);
	};

	return (
		<div style={{ width: "100%" }}>
			{visible ? (
				<Alert
					message={children}
					type={type}
					closable
					afterClose={handleClose}
				/>
			) : null}
		</div>
	);
};

export default AlertMessage;
