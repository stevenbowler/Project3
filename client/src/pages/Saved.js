import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { CampGroundList, ListItem } from "../components/CampGroundList";
import API from "../utils/API";

class Saved extends Component {
    state = {
        savedCampGrounds: []
    };

    componentDidMount() {
        this.getCampGrounds();
      }
    
      getBooks = () => {
        API.getCampGrounds()
          .then(res => {
            this.setState({ savedCampGrounds: res.data })
          })
          .catch((err => console.log(err)))
        }
        deleteBook = () => {
            API.deleteBook()
              .then(res => {
                this.setState({ savedCampGrounds: res.data })
              })
              .catch((err => console.log(err)))
            }
        render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                <h1>Favorites</h1>
                            </h1>
                        </Jumbotron>
                    <CampGroundList>
                  {this.state.campGrounds.map((campGround, index) => {
                  return (  <div key={index}>
                      <ListItem
                        key={campGround.id}
                        campGround={campGround.name}
                        location={campGround.location}
                        rating={campGround.average_rating}
                        description={campGround.description}
                        availability={campGround.availability}
                        imageURL={campGround.preview_image_url}
                        />
                     </div>
                  )
                   })}
                            </CampGroundList>
                :
                <h2>No camp grounds to display</h2>
              
            
          </Col>

        </Row>
      </Container>
    );
  }
}

export default Saved;
