import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { CampGroundList, ListItem } from "../components/CampGroundList";
import API from "../utils/API";
import { savesCampGrounds } from "../redux/actionCreator";
import { connect } from "react-redux";

class Saved extends Component {
  state = {
    savedCampGrounds: []
  };

  componentDidMount() {
    this.getCampGround();
  }

  getCampGround = (campGroundData) => {
    API.getCampGround(campGroundData)
      .then(res => {
        this.props.dispatch(savesCampGrounds(res.data.results))
        // this.setState({ savedCampGrounds: res })
      })
      .catch((err => console.log(err)))
  }
  deleteCampGround = () => {
    API.deleteCampGround()
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
            {(this.props.campGrounds && this.props.campGrounds.length > 0) ?

              <CampGroundList>
                 {this.props.campGrounds.map((campGround, index) => {
                  return (<div key={index}>
                    <ListItem
                      key={campGround._id}
                      entityId={campGround.entity_id}
                      campGround={campGround.name}
                      city={campGround.addresses[0].city}
                      state={campGround.addresses[0].state_code}
                      distance={campGround.distance}
                      rating={campGround.average_rating}
                      description={campGround.description}
                      imageURL={campGround.preview_image_url}
                    />
                    <DeleteBtn onClick={() => this.deleteCampGround(campGround._id)}></DeleteBtn>
                  </div>
                  )
                })}
              </CampGroundList>
              :
              <h2 style={{color:"white"}}>No camp grounds to display</h2>
            }

          </Col>

        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    campGrounds: state.campGrounds,
    username: state.username
  }
}
export default connect(mapStateToProps) (Saved);
