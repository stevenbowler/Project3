import React from "react";
// import "./style.css";
import DeleteBtn from "../DeleteBtn"
import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
// import { savesCampGrounds } from "../redux/actionCreator";
// import { connect } from "react-redux";


import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import Ratings from "react-ratings-declarative";

// This file exports both the List and ListItem components

export function CampGroundList({ children }) {

	return (
		<div className="list-overflow-container">
			<ul className="list-group">{children}</ul>
		</div>
	);
}
export function ListItem(props) {
	const deleteCampGround = (campGroundData) => {
		API.deleteCampGround(campGroundData)
		
		  .then(res => { 
			this.props.dispatch(deleteCampGrounds(res.data.results))
		  })
		  
		  .catch(err => console.log(err));
	  }
  return (
    <li>
      	<Container>
      <Row className="mb-5">
					<Col size="md-12">
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
                <CardText>{props.description}</CardText>
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
             			<DeleteBtn onClick={() => deleteCampGround({id:props.id, 
                        username:props.username,
                        entityId:props.entityId,
                        campGround:props.campGround,
                        city:props.city,
                        state:props.state,
                        distance:props.distance,
                        rating:props.rating,
                        description:props.description,
                        imageURL:props.imageURL,
                        })}></DeleteBtn>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</li>
	);
}
