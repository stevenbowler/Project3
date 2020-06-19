import React from "react";
// import "./style.css";
// import SaveBtn from "../SaveBtn"
import { Col, Row, Container } from "../Grid";
import { Button } from "reactstrap";

// This file exports both the List and ListItem components

export function CampGroundList({ children }) {
	return (
		<div className="list-overflow-container">
			<ul className="list-group">{children}</ul>
		</div>
	);
}
export function ListItem(props) {
	return (
		<li>
			<Container>
				{/* bootstrap */}
				{/* <Row>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" alt={props.campGround} src={props.imageURL} />
            <Card.Body>
              <Card.Title><h3 style={{ color: "white" }}>{props.campGround}</h3>
              </Card.Title>
              <Card.Text>
                <p style={{ color: "white" }}>
                  {props.description}
                </p>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Row> */}

				<Row>
					<Col size="xs1 sm1 m1">
						<img style={{ width: "100%" }} alt={props.campGround} src={props.imageURL} />
					</Col>
					<Col size="xs8 sm8 m8">
						<h3 style={{ color: "forestgreen" }}>{props.campGround}</h3>
						<p style={{ color: "forestgreen" }}>
							{props.rating} {props.city}, {props.state} ({props.distance} miles away)
						</p>
					</Col>
					<Col size="xs11 sm11 m11">
						<p style={{ color: "forestgreen" }}>{props.description}</p>
						<Button>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={"https://www.recreation.gov/camping/campgrounds/" + props.entityId}
							>
								{" "}
								INFO
							</a>
						</Button>
						<Button>
							{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={
									"https://www.recreation.gov/camping/campgrounds/" +
									props.entityId +
									"/availability"
								}
							>
								{" "}
								RESERVE
							</a>
						</Button>
					</Col>
				</Row>
			</Container>
		</li>
	);
}
