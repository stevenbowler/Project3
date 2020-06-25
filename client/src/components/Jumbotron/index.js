//@ts-check
/**@module */
import React from "react";

/**@function Jumbotron */
function Jumbotron({ children }) {
	return (
		<div
			style={{ height: 350, color:"forestgreen", backgroundColor:"white", clear: "both", paddingTop: 120, textAlign: "center" }}
			className="jumbotron"
		>
			{children}
		</div>
	);
}

export default Jumbotron;
