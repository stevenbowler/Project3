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
    
      getCampGrounds = () => {
        API.getCampGrounds()
          .then(res => {
            this.setState({ savedCampGrounds: res.data })
          })
          .catch((err => console.log(err)))
        }
        deleteCampGrounds = () => {
            API.deleteCampGrounds()
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
                        {(this.state.savedCampGrounds && this.state.savedCampGrounds.length > 0) ?

                    <CampGroundList>
                  {this.state.savedCampGrounds.map((savedCampGround, index) => {
                  return (  <div key={index}>
                      <ListItem
                        key={savedCampGround._id}
                        campGround={savedCampGround.name}
                        location={savedCampGround.location}
                        rating={savedCampGround.average_rating}
                        description={savedCampGround.description}
                        availability={savedCampGround.availability}
                        imageURL={savedCampGround.preview_image_url}
                        />
                     </div>
                  )
                   })}
                            </CampGroundList>
                :
                <h2>No camp grounds to display</h2>
                  }
            
          </Col>

        </Row>
      </Container>
    );
  }
}

export default Saved;
