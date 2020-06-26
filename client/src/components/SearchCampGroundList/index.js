//@ts-check
/**@module */
import React from "react";
// import "./style.css";
import SaveBtn from "../SaveBtn";
import { Row, Container } from "../Grid";
// import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
// import { savesCampGrounds } from "../redux/actionCreator";
// import { connect } from "react-redux";
import { Button, Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
// import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "./style.css";
import StarRating from "../StarRating";
import Description from "../Description"

// 
/**This file exports both the List and ListItem components
 * @function CampGroundList
 * @param {*} param0 
 */
export function CampGroundList({ children }) {
	return (
		<Container>
			<Row>{children}</Row>
		</Container>
	);
}


/**Sets every item in the list with a Saved button to save key data to Mongo on clicke
 * @function ListItem
 * @param {*} props 
 */
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
					<h3>
						{props.campGround}
						<StarRating>{props.rating}</StarRating>
					</h3>
				</CardTitle>

				<CardSubtitle>
					<h6>
						<span style={{ fontWeight: "bold" }}>
							{props.city}, {props.state}
						</span>{" "}
						({props.distance} miles away)
					</h6>
				</CardSubtitle>
				<hr></hr>

				{/*<CardText>{props.description}</CardText>*/}
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
						})
					}
				></SaveBtn>
				<Description>{props.description}</Description>
			</CardBody>
		</Card>
	);
}
