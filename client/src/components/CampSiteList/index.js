// import React from "react";
import React, { Component } from "react";
import "./style.css";
import SaveBtn from "../SaveBtn"
import { Col, Row, Container } from "../Grid";
// import API from "../utils/API";


// This file exports both the List and ListItem components

export function BookList({ children }) {
  return (
    <div className="list-overflow-container">
    <ul className="list-group">{children}</ul>
  </div>
  );
}
export class ListItem extends React.Component{ 
  render(props){
    return(
          <li>
        <Container>
          <Row size="xs8 sm8 m8">
              <h3>{this.props.title}<span><h5>{this.props.author}</h5></span></h3>
              <button
              class="btn">
              <a
                target="_blank"
                href={this.props.link}
              >
                View
              </a></button>

             </Row>
             <Row>
              <Col size="xs1 sm1 m1">
              <img src={this.props.image} />
              </Col>
                <Col size="xs11 sm11 m11">
              <p>
                {this.props.description}
              </p>
             
            </Col>
          </Row>
        </Container>
      </li>
         
    )
  }
}
