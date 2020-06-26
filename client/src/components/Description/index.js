import React, { useState } from "react";
import { Collapse, Button, CardText } from "reactstrap";

function Description({ children }) {
	const [collapse, setCollapse] = useState(false);
	const [status, setStatus] = useState("Closed");

	const onEntering = () => setStatus("Opening...");

	const onEntered = () => setStatus("Opened");

	const onExiting = () => setStatus("Closing...");

	const onExited = () => setStatus("Closed");

	const toggle = () => setCollapse(!collapse);

	return (
		<div>
			<Button color="primary" onClick={toggle} style={{ marginBottom: "1rem"}}>
				Description
			</Button>
			<h5>Descritpion {status}</h5>
			<Collapse
                style={{backgroundColor:"white"}}
				isOpen={collapse}
				onEntering={onEntering}
				onEntered={onEntered}
				onExiting={onExiting}
				onExited={onExited}
			>
				<CardText>{children}</CardText>
			</Collapse>
		</div>
	);
}

export default Description;
