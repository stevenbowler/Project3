//@ts-check
/**@module */
import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

/**
 * if route/resource not found display this page
 * @function NoMatch
 */
function About() {
	return (
		<Container fluid>
			<Row>
				<Col size="md-12">
					<Jumbotron>
						<h1 style={{ fontSize: "60px" }}>
							<span style={{ fontWeight: "bold", fontSize: "120px" }}>camp</span>.SITE
						</h1>
						<hr></hr>
						<h2>find last-minute camping reservations</h2>
					</Jumbotron>
                    <div>
                        <h4>CAMP.site helps you find last minute camping reservations</h4>
                    </div>
				</Col>
			</Row>
		</Container>
	);
}

export default About;
