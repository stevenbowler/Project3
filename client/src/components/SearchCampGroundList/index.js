//@ts-check
/**@module */
import React from "react";
import SaveBtn from "../SaveBtn";
import EquipmentList from "../EquipmentList";
import API from "../../utils/API";
import {
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col,
	CardImgOverlay,
} from "reactstrap";
import "./style.css";
import StarRating from "../StarRating";
import Description from "../Description";
import { updateFavoritesCount } from "../../redux/actionCreator";

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

			.then((res) => {
				API.getCampGround(props.username)
					.then(res => {
						console.log("save results", res.data)
						props.props.dispatch(updateFavoritesCount(res.data.length.toString()));
					})
					.catch((err => console.log(err)));
				//window.location.reload()
				console.log("save to mongo", res)
			})

			.catch((err) => console.log(err));
	};
	return (

		<div className="card-div">
			{props.availability !== "unavailable" && props.availability !== "not reservable" ?
				<>
					<hr style={{ border: "1px solid black" }}></hr>
					<Col lg="5" className="card-image-wrapper">
						<CardImg top width="100%" height="300px" alt={props.campGround} src={props.imageURL}></CardImg>
						<CardImgOverlay>
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
										campsite_equipment_name: props.campsite_equipment_name,
										price_range_max: props.price_range_max,
										price_range_min: props.price_range_min,
										availability: props.availability,
										number_of_ratings: props.number_of_ratings
									})

								}
							></SaveBtn>
						</CardImgOverlay>
					</Col>
					<Col lg="7" className="card-body-wrapper">
						<CardBody style={{ paddingLeft: "0px" }}>
							<CardTitle style={{ display: "flex" }}>
								<a
									style={{ color: "black" }}
									target="_blank"
									rel="noopener noreferrer"
									href={"https://www.recreation.gov/camping/campgrounds/" + props.entityId}
								>
									<h3>{props.campGround}</h3>
								</a>
								{props.rating ?
									<>
										<StarRating>{props.rating}</StarRating>
										{props.number_of_ratings ?
											<span style={{ fontSize: "16px", paddingLeft: "5px", marginBottom: "-5px !important" }}>
												{"("}
												{props.number_of_ratings}
												{")"}
											</span>
											: ""}
									</>
									: ""}
							</CardTitle>
							<CardSubtitle>
								<h6>
									<span style={{ fontWeight: "bold" }}>
										{props.city}, {props.state}
									</span>{" "}
							({props.distance} miles away)
						</h6>
							</CardSubtitle>
							{props.campsite_equipment_name && props.campsite_equipment_name.length > 0 ?
								<>
									<hr></hr>
									<EquipmentList>{props.campsite_equipment_name}</EquipmentList>
									<hr></hr>
								</>
								: 	
								<>
									<hr></hr>
									See campsite for equipment
									<hr></hr>
								</>}
							<div style={{ float: "right" }}>
								<a
									style={{ color: "black" }}
									target="_blank"
									rel="noopener noreferrer"
									href={"https://www.recreation.gov/camping/campgrounds/" + props.entityId}
								>
									<h2 style={{ textTransform: "capitalize" }}>{props.availability}</h2>
								</a>
								{props.price_range_min > 0 && props.price_range_max > 0 ?
									<h6>
										{props.price_range_min !== props.price_range_max ? "Price Range: " + "$" + (Math.round(props.price_range_min)) + " - " + "$" + (Math.round(props.price_range_max)) : "Price Range: " + "$" + (Math.round(props.price_range_min))}
									</h6>
									: "View details for price"}
							</div>

							{/*<CardText>{props.description}</CardText>*/}
							{/*	<Button>
						<a
							style={{ color: "white" }}
							target="_blank"
							rel="noopener noreferrer"
							href={"https://www.recreation.gov/camping/campgrounds/" + props.entityId}
						>
							{" "}
							INFO
						</a>
					</Button> */}
							{/* <Button>
						{" "}
						<a
							style={{ color: "white" }}
							target="_blank"
							rel="noopener noreferrer"
							href={
								"https://www.recreation.gov/camping/campgrounds/" + props.entityId + "/availability"
							}
						>
							{" "}
							RESERVE
						</a>
					</Button>*/}
						</CardBody>
					</Col>
				</>
				: ""}
		</div>

	);
}
