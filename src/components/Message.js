import React from "react";

const Message = ({ children, color }) => {
	return (
		<div
			className={`alert alert-${color} alert-dismissible fade show`}
			role="alert"
		>
			{children}
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				aria-label="Close"
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
};

export default Message;
