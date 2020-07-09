//@ts-check
/**@module */
import React from "react";
import { Container, Row, Col, Card, CardImg, CardText } from "reactstrap";
import Jumbotron from "../components/Jumbotron";

/**
 * if route/resource not found display this page
 * @function About
 */
function About() {
	return (
		<Container fluid>
			<Row>
				<Col md="12">
					<Jumbotron>
						<h1 style={{ fontSize: "60px" }}>
							<span style={{ fontWeight: "bold", fontSize: "120px" }}>camp</span>.SITE
						</h1>
						<hr></hr>
						<br style={{ marginBottom: "200px" }}></br>
					</Jumbotron>

					<div className="card-div">
						<Col md="5" className="card-body-wrapper">
							<div>
								<h5
									className="text-center about-card-text"
									style={{
										fontSize: "3.5vw",
										color: "forestgreen",
										padding: "30px",
									}}
								>
									camp.SITE helps you find last-minute camping reservations{" "}
								</h5>
							</div>
						</Col>
						<Col md="7" className="card-image-wrapper" style={{paddingBottom:"30px"}}>
							<CardImg top alt="campground" src="/about-1.jpg"></CardImg>
						</Col>
					</div>
					<Card
						style={{
							fontSize: "3.5vw",
							color: "forestgreen",
							paddingLeft: "100px",
                            paddingRight: "100px",
                        }}
                        className="text-center"
					>
						Provide us with a location and we will check for campsites that are availabile
						within the next five days.{" "}
					</Card>

					<div className="card-div">
						<Col md="7" className="card-image-wrapper">
							<CardImg top alt="campground" src="/about-2.jpg"></CardImg>
						</Col>
						<Col md="5" className="card-body-wrapper">
							<div>
								<h5
									className="text-center about-card-text"
									style={{
										fontSize: "3.5vw",
										color: "forestgreen",
										padding: "30px",
									}}
								>
									Start searching campsites
                                    <
								</h5>
							</div>
						</Col>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default About;
