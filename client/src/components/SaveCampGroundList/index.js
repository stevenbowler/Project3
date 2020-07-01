//@ts-check
/**@module */
import React from "react";
// import "./style.css";
import DeleteBtn from "../DeleteBtn";
import StarRating from "../StarRating";
import EquipmentList from "../EquipmentList";
//import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
import {
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
	CardImgOverlay,
} from "reactstrap";
import Ratings from "react-ratings-declarative";

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
				console.log("delete from mongo", res);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="card-div">
			<hr style={{ border: "1px solid black" }}></hr>
			{props.number_of_ratings}
			<Col md="5" className="card-image-wrapper">
				<CardImg top width="100%" alt={props.campGround} src={props.imageURL}></CardImg>
				<CardImgOverlay>
					<DeleteBtn onClick={() => deleteCampGround(props.id)}></DeleteBtn>
				</CardImgOverlay>
			</Col>
			<Col md="7" className="card-body-wrapper">
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
						<StarRating>{props.rating}</StarRating>
						<span style={{ fontSize: "16px", paddingLeft: "5px", marginBottom: "-5px !important" }}>
							{"("}
							{props.number_of_ratings}
							{")"}
						</span>
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
					<EquipmentList>{props.campsite_equipment_name}</EquipmentList>
					<hr></hr>
					<div style={{ float: "right" }}>
						<a
							style={{ color: "black" }}
							target="_blank"
							rel="noopener noreferrer"
							href={"https://www.recreation.gov/camping/campgrounds/" + props.entityId}
						>
							<h2 style={{ textTransform: "capitalize" }}>Check Availability</h2>
						</a>
						<h6>
							Price Range: ${props.price_range_min}-{props.price_range_max}
						</h6>
					</div>
				</CardBody>
			</Col>
		</div>
	);
}
