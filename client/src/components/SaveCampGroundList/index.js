//@ts-check
/**@module */
import React from "react";
// import "./style.css";
import SaveBtn from "../SaveBtn";
import EquipmentList from "../EquipmentList";

//import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
// import { savesCampGrounds } from "../redux/actionCreator";
// import { connect } from "react-redux";
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
import DeleteBtn from "../DeleteBtn";
import { updateFavoritesCount } from "../../redux/actionCreator";




/**This file exports both the List and ListItem components
 * @function CampGroundList
 * @param {*} children 
 */
export function CampGroundList({ children }) {

	return (
		<div className="list-overflow-container">
			<ul className="list-group">{children}</ul>
		</div>
	);
}

/**
 * @function ListItem
 * @param {*} props 
 */
export function ListItem(props) {

	const deleteCampGround = (event) => {
		API.deleteCampGround(event)
		.then((res) => {
			API.getCampGround(props.username)
				.then(res => {
					console.log("delete from results", res.data)
					props.props.dispatch(updateFavoritesCount(res.data.length.toString()));
								window.location.reload()

				})
				.catch((err => console.log(err)));
			console.log("delete from mongo", res)
		})

		.catch((err) => console.log(err));
};

	return (
		<div className="card-div">
			<hr style={{ border: "1px solid black" }}></hr>
			<Col lg="5" className="card-image-wrapper">
				<CardImg top width="100%" alt={props.campGround} src={props.imageURL}></CardImg>
				<CardImgOverlay>
					<DeleteBtn onClick={() => deleteCampGround(props.id)}>
					</DeleteBtn>
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
								<span style={{ fontSize: "16px", paddingLeft: "5px", marginBottom: "-5px !important" }}>
									{"("}
									{props.number_of_ratings}
									{")"}
								</span>
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
					{props.campsite_equipment_name ?
						<>
							<hr></hr>
							<EquipmentList>{props.campsite_equipment_name}</EquipmentList>
							<hr></hr>
						</>
						: ""}
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
		</div>

	);
}
