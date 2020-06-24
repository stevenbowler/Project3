//@ts-check
/**@module*/
import moment from "moment";
import { savesCampGrounds } from "../redux/actionCreator";
import { connect } from "react-redux";
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { CampGroundList, ListItem } from "../components/SearchCampGroundList";

// import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {

  state = {
    campGrounds: [],
    entityId: "",
    campGround: "",
    city: "",
    state: "",
    distance: "",
    rating: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD").add(5, "days").format("YYYY-MM-DD"),
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
  // this.setDates();

  // this.state.startDate = moment().format("DD-MM-YYYY")
  // var end = moment(this.state.startDate, "DD-MM-YYYY").add(5, "days")
  // this.state.endDate = end

  //   this.previousName = this.props.username;
  // }

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
    query = `${this.state.zipCode}&exact=false&radius=${this.state.miles}&size=20&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=${this.state.startDate}T00%3A00%3A00Z&end_date=${this.state.endDate}T00%3A00%3A00Z&include_unavailable=false?name=`
    API.getCampGrounds(query).then(res => {
      // this.setState({ result: res.data, campGrounds: res.data.results })

      this.props.dispatch(savesCampGrounds(res.data.results))
      console.log(res.data.results)

    })


      .catch(err => console.log(err));

  }


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
              <input className="form-control form-control-lg" autoComplete="off" type="text" placeholder={this.props.currentLocationZipCode} name="zipCode" onChange={this.handleInputChange} value={this.state.zipCode} />
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
                          city={campGround.addresses[0].city}
                          state={campGround.addresses[0].state_code}
                          distance={campGround.distance}
                          rating={campGround.average_rating}
                          description={campGround.description}
                          imageURL={campGround.preview_image_url}
                        />
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
    campGrounds: state.campGrounds,
    username: state.username,
    currentLocationZipCode: state.currentLocationZipCode
  }
}
export default connect(mapStateToProps)(Search);
