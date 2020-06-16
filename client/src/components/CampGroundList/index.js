import React from "react";
// import "./style.css";
// import SaveBtn from "../SaveBtn"
import { Col, Row, Container } from "../Grid";


// This file exports both the List and ListItem components

export function CampGroundList({ children }) {
  return (
    <div className="list-overflow-container">
    <ul className="list-group">{children}</ul>
  </div>
  );
}
export function ListItem (props){ 
 
    return(
          <li>
        <Container>
          <Row size="xs8 sm8 m8">
              <h3 style={{color:"white"}}>{props.campGround}</h3>
             </Row>
             <Row>
              <Col size="xs1 sm1 m1">
              <img alt={props.campGround} src={props.imageURL} />
              </Col>
                <Col size="xs11 sm11 m11">
              <p style={{color:"white"}}>
                {props.description}
              </p>
             
            </Col>
          </Row>
        </Container>
      </li>
         
    )
  }

