import React from "react";
// import "./style.css";
import SaveBtn from "../SaveBtn"
import { Col, Row, Container } from "../Grid";
import API from "../../utils/API";
// import { savesCampGrounds } from "../redux/actionCreator";
// import { connect } from "react-redux";



// This file exports both the List and ListItem components

export function CampGroundList({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}
export function ListItem(props) {
  const saveCampGround = (campGroundData) => {
    API.saveCampGround(campGroundData)
    
      .then(res => console.log("save to mongo", res))
      
      .catch(err => console.log(err));
  }
  return (
    <li>
      <Container>
             <Row>
              <Col size="xs1 sm1 m1">
              <img alt={props.campGround} src={props.imageURL} />
              </Col>
              <Col size="xs8 sm8 m8">
              
              <h3 style={{color:"white"}}>{props.campGround}</h3>
              <p style={{color:"white"}}>
                {props.rating} {props.city}, {props.state} ({props.distance} miles away)</p>
             </Col>
                <Col size="xs11 sm11 m11">
              <p style={{color:"white"}}>
                {props.description}
              </p>
             <a target="_blank" rel="noopener noreferrer" href={"https://www.recreation.gov/camping/campgrounds/"+props.entityId}> INFO</a>
             <a target="_blank" rel="noopener noreferrer" href={"https://www.recreation.gov/camping/campgrounds/"+props.entityId + "/availability"}> RESERVE</a>
             <SaveBtn onClick={() => saveCampGround({id:props.id, 
                        username:props.username,
                        entityId:props.entityId,
                        campGround:props.campGround,
                        city:props.city,
                        state:props.state,
                        distance:props.distance,
                        rating:props.rating,
                        description:props.description,
                        imageURL:props.imageURL,
                        })}></SaveBtn>
            </Col>
          </Row>
      </Container>
    </li>

  )
}

