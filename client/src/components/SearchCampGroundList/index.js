import React from "react";
// import "./style.css";
import SaveBtn from "../SaveBtn";
//import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
import { notification } from "../../redux/actionCreator";
import { connect } from "react-redux";
import {
	Collapse,
	Col,
	Row,
	Container,
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
} from "reactstrap";
import Ratings from "react-ratings-declarative";
import "./style.css";

// This file exports both the List and ListItem components

export function CampGroundList({ children }) {
	return (
		<Container>
			<Row>
				{children}
			</Row>
		</Container>
	);
}
export function ListItem(props) {
	const saveCampGround = (campGroundData) => {
		API.saveCampGround(campGroundData)

			.then((res) => console.log("save to mongo", res))

			.catch((err) => console.log(err));
	};

	

	return (
			<Card>
				<CardImg top width="100%" alt={props.campGround} src={props.imageURL}></CardImg>
				<CardBody>
					<CardTitle>
						<h2>
							{props.campGround}
							<Ratings
								rating={props.rating}
								widgetRatedColors="green"
								widgetEmptyColors="grey"
								widgetDimensions="20px"
								typeOfWidget="Point"
								widgetSpacings="1px"
							>
								<Ratings.Widget />
								<Ratings.Widget />
								<Ratings.Widget />
								<Ratings.Widget />
								<Ratings.Widget />
							</Ratings>
						</h2>
					</CardTitle>
					<CardSubtitle>
						<h5>
							<span style={{ fontWeight: "bold" }}>
								{props.city}, {props.state}
							</span>{" "}
							({props.distance} miles away)
						</h5>
					</CardSubtitle>
					<CardText>
						
						
						
						
						
						
						{props.description}</CardText>
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
								"https://www.recreation.gov/camping/campgrounds/" + props.entityId + "/availability"
							}
						>
							{" "}
							RESERVE
						</a>
					</Button>
					<SaveBtn
						onClick={() =>
							saveCampGround({
								id: props.id,
								username: props.username,
								entityId: props.entityId,
								campGround: props.campGround,
								city: props.city,
								state: props.state,
								distance: props.distance,
								rating: props.rating,
								description: props.description,
								imageURL: props.imageURL,
								// }), notification()}></SaveBtn>
							})
						}
					></SaveBtn>
				</CardBody>
			</Card>
	);
}
