//@ts-check
/**@module*/
import { savesCampGrounds } from "../redux/actionCreator";
import { connect } from "react-redux";
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { CampGroundList, ListItem } from "../components/CampGroundList";
// import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    entityId: "",
    campGround: "",
    location: "",
    rating: "",
    description: "",
    availability: "",
    imageURL: "",
    infoLink: "",
    revervationURL: "",
    zipCode: "",
    miles: "",
    query: "",
    result: {},
    isValidZipCode: false
  };
  // previousName = this.props.username;

  /**
   * Initial loadsearch and set previous state variable to track login username change
  //  * @function componentDidMount */
  // componentDidMount() {
  //   this.loadCampGrounds();
  //   this.previousName = this.props.username;
  // }

  /**
   * If there was a login then reload campGrounds with the newly logged in users choices
  //  * @function componentDidUpdate */
  // componentDidUpdate() {
  //   if (this.previousName !== this.props.username) {  // if login or logout update campGrounds displayed
  //     this.loadCampGrounds();
  //     this.previousName = this.props.username;
  //   }
  // }
  campGroundSearch = (query) => {
    query = `${this.state.zipCode}&exact=false&radius=${this.state.miles}&size=20&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=2020-06-16T00%3A00%3A00Z&end_date=2020-06-20T00%3A00%3A00Z&include_unavailable=false?name=`
    API.getCampGrounds(query).then(res => {
      // this.setState({ result: res.data, campGrounds: res.data.results })
      this.props.dispatch(savesCampGrounds(res.data.results))
      console.log(res.data.results)
    })

      .catch(err => console.log(err));

  }
  saveCampGround = campGroundData => {
    API.saveCampGround(campGroundData = {
      entityId: this.state.entity_id,
      campGround: this.state.campGround,
      location: this.state.location,
      rating: this.state.rating,
      description: this.state.description,
      availability: this.state.availability,
      imageURL: this.state.imageURL,
      infoLink: this.state.infoLink,
      revervationURL: this.state.reservationURL,
      zipCode: this.state.zipCode,
      miles: this.state.miles
    })
      .then(res => this.campGroundSearch())
      .catch(err => console.log(err));
  };
  getEntityId = (query) => {
    query = `camping/campgrounds/${this.state.entityId}/availability`
    API.getEntityId(query).then(res => {
      //set state to 5 available days
      this.setState({ result: res.data, campGrounds: res.data.results })
      console.log(res.data.results)
    })

      .catch(err => console.log(err));
  }
  // handleSaveCampGround= event => {
  //   event.preventDefault();
  //     API.saveCampGround({
  //       campGround: this.state.campGround,
  //       location:this.state.location,
  //       rating: this.state.rating,
  //       description: this.state.description,
  //       availability: this.state.availability,
  //       imageURL: this.state.imageURL,
  //       infoLink: this.state.infoLink,
  //       revervationURL: this.state.reservationURL,
  //       zipCode: this.state.zipCode,
  //       miles:this.state.miles
  //     })
  //       .then(res => this.campGroundSearch())
  //       .catch(err => console.log(err));
  //   };

  handleValidation(pattern, value) {

    if (!pattern) return true;
    // string pattern, one validation rule
    if (typeof pattern === 'string') {
      console.log(pattern)

      const condition = new RegExp(pattern, 'g');
      return condition.test(value);
    }
    // array patterns, multiple validation rules
    if (typeof pattern === 'object') {
      const conditions = pattern.map(rule => new RegExp(rule, 'g'));
      return conditions.map(condition => condition.test(value));
    }
  }
  /**
   * handle changes in input field
   * @function handleInputChange */
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (this.handleValidation("^\\d{5}", value)) {
      this.setState({
        isValidZipCode: true
      })
    }
  };



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12" >
            <div>
              <Jumbotron>
                <h1>Camp ground Search</h1>
                <h1>Search for and save your favorite camp grounds</h1>
              </Jumbotron>
              <h1 style={{ color: "white" }}>Find camping spots within <input className="form-control form-control-lg" autoComplete="off" type="text" name="miles" onChange={this.handleInputChange} value={this.state.miles} /> miles of zip code</h1>
              <input className="form-control form-control-lg" autoComplete="off" type="text" name="zipCode" onChange={this.handleInputChange} value={this.state.zipCode} />
              <button type="submit" onClick={this.campGroundSearch} >
                Search
      </button>
              {console.log(this.handleValidation(`^\\d`, this.state.zipCode))}




              {(this.state.isValidZipCode && this.props.campGrounds && this.props.campGrounds.length > 0) ?
                <CampGroundList>
                  {this.props.campGrounds.map((campGround, index) => {
                    return (
                      <div key={index}>
                        <ListItem
                          key={campGround._id}
                          entityId={campGround.entity_id}
                          campGround={campGround.name}
                          location={campGround.location}
                          rating={campGround.average_rating}
                          description={campGround.description}
                          availability={campGround.availability}
                          imageURL={campGround.preview_image_url}
                        />
                        <SaveBtn onClick={() => this.saveCampGround(campGround._id)}></SaveBtn>

                        {/* <SaveBtn
                        campGround={campGround.name}
                        location={campGround.location}
                        rating={campGround.average_rating}
                        description={campGround.description}
                        availability={campGround.availability}
                        imageURL={campGround.preview_image_url}
                        /> */}
                      </div>
                    )
                  })}
                </CampGroundList>
                :
                <h2>No camp grounds to display</h2>
              }
            </div>
          </Col>

        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    campGrounds: state.campGrounds
  }
}
export default connect(mapStateToProps) (Search);