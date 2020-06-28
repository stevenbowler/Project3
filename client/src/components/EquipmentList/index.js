//@ts-check
/**@module */
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

/**@function EquipmentList */
function EquipmentList({ children }) {
	const equipmentArray = [];
	// console.log("children: ", children);					//sb
	// console.log("typeof children: ", typeof children);	//sb
	var childrenLength = -1;								// sb
	if (typeof children === "undefined") {					// sb
		console.log("children undefined");					// sb
		var childrenLength = -1;							// sb
	} else { if (typeof children.length !== "undefined") childrenLength = children.length };			// sb

	for (let i = 0; i < childrenLength; i++) {
		if (children[i] === "Tent") {
			equipmentArray.push("Tent");
		}
		if (children[i] === "RV") {
			equipmentArray.push("RV/Motorhome");
		}
		if (children[i] === "Trailer") {
			equipmentArray.push("Trailer");
		}
	}

	return (
		<div>
			<ListGroup horizontal>
				{/*<h5 style={{margin:"12px"}}>Equipment:</h5>*/}
				{equipmentArray.map((equipment) => (
					<ListGroupItem>{equipment}</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}

export default EquipmentList;
