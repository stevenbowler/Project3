import React from "react";
// import "./style.css";
import DeleteBtn from "../DeleteBtn"
import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
import { Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import Ratings from "react-ratings-declarative";
import { deleteCampGround } from '../../redux/actionCreator';




// This file exports both the List and ListItem components

export function CampGroundList({ children }) {

	return (
		<div className="list-overflow-container">
			<ul className="list-group">{children}</ul>
		</div>
	);
}
export function ListItem(props) {
	

    const deleteCampGround = (id) => {
		const { dispatch } = props;
        // const id = parseInt(event.target.id);

		API.deleteCampGround(id)
		.then(res => console.log("delete from mongo", res)) 
		dispatch(deleteCampGrounds(id))
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
				 
						{/* <DeleteBtn onClick={() => deleteCampGround(props.id)}>
						</DeleteBtn> */}
						<DeleteBtn onClick={deleteCampGround}></DeleteBtn>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</li>
	);
}
