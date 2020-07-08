//@ts-check
/**@module */
import React, { Component } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
// import DeleteBtn from "../components/DeleteBtn";
import { CampGroundList, ListItem } from "../components/SaveCampGroundList";
import API from "../utils/API";
import { savesCampGrounds, updateFavoritesCount } from "../redux/actionCreator";
import { connect } from "react-redux";

/**@class */
class Saved extends Component {
  constructor(props){
    super(props)
  }
  state = {
    savedCampGrounds: []
  };

  /**
   * @function componentDidMount
   */
  componentDidMount() {
    this.getCampGround(this.props.username);
  }


  /**
   * @function getCampGround
   * @param {*} campGroundData 
   */
  getCampGround = (campGroundData) => {
    console.log("this.props.campGrounds", this.props.campGrounds);
    API.getCampGround(campGroundData)
      .then(res => {
        this.props.dispatch(savesCampGrounds(res.data));
        this.props.dispatch(updateFavoritesCount(res.data.length.toString()));
        // this.setState({ savedCampGrounds: res })
      })
      .catch((err => console.log(err)));
    console.log("this.props.campGrounds", this.props.campGrounds);
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
                      props={this.props}
                      key={campGround.id}
                      id={campGround._id}
                      username={campGround.username}
                      entityId={campGround.entityId}
                      campGround={campGround.campGround}
                      city={campGround.city}
                      state={campGround.state}
                      distance={campGround.distance}
                      rating={campGround.rating}
                      description={campGround.description}
                      imageURL={campGround.imageURL}
                      campsite_equipment_name={campGround.campsite_equipment_name}
						          price_range_max={campGround.price_range_max}
								      price_range_min={campGround.price_range_min}
								      availability={campGround.availability}
								      number_of_ratings={campGround.number_of_ratings}
                      getCampGround={  this.getCampGround }
                    />
                  </div>
                  )
                })}
              </CampGroundList>
              :
              <h2 style={{ color: "white" }}>No camp grounds to display</h2>
            }

          </Col>

        </Row>
      </Container>
    );
  }
}

/**
 * @function mapStateToProps
 * @param {@} state 
 */
function mapStateToProps(state) {
  return {
    campGrounds: state.campGrounds,
    username: state.username,
  }
}
export default connect(mapStateToProps)(Saved);
