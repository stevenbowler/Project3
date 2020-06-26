//@ts-check
/**@module*/
import moment from "moment";
import { savesCampGrounds, updateFavoritesCount } from "../redux/actionCreator";
import { connect } from "react-redux";
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
// import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";
// import { Link } from "react-router-dom";
//import { Col, Row, Container } from "../components/Grid";
import {
  // Button,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  // Card,
  // CardImg,
  // CardText,
  // CardBody,
  // CardTitle,
  // CardSubtitle,
  Col,
  Row,
  Container,
  // Collapse,
} from "reactstrap";
import { CampGroundList, ListItem } from "../components/SearchCampGroundList";

// import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    // campGrounds: [],
    entityId: "",
    campGround: "",
    city: "",
    state: "",
    distance: "",
    rating: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD")
      .add(5, "days")
      .format("YYYY-MM-DD"),
    description: "",
    availability: "",
    imageURL: "",
    infoLink: "",
    revervationURL: "",
    zipCode: "",
    miles: "",
    query: "",
    result: {},
    isValidZipCode: false,
  };



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
    console.log("campGroundSearch: zipCode miles", this.state.zipCode, this.state.miles);
    query = `${this.state.zipCode}&exact=false&radius=${this.state.miles}&size=20&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=${this.state.startDate}T00%3A00%3A00Z&end_date=${this.state.endDate}T00%3A00%3A00Z&include_unavailable=false?name=`;
    API.getCampGrounds(query)
      .then((res) => {
        this.props.dispatch(savesCampGrounds(res.data.results));
        this.props.dispatch(updateFavoritesCount(res.data.length))
        console.log(res.data.results);
      })

      .catch((err) => console.log(err));
  };

  handleValidation(pattern, value) {
    if (!pattern) return true;
    // string pattern, one validation rule
    if (typeof pattern === "string") {
      console.log(pattern);

      const condition = new RegExp(pattern, "g");
      return condition.test(value);
    }
    // array patterns, multiple validation rules
    if (typeof pattern === "object") {
      const conditions = pattern.map((rule) => new RegExp(rule, "g"));
      return conditions.map((condition) => condition.test(value));
    }
  }
	/**
	 * handle changes in input field
	 * @function handleInputChange */
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    if (this.handleValidation("^\\d{5}", value)) {
      this.setState({
        isValidZipCode: true,
      });
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div>
              <Jumbotron>
                <h1 style={{ fontSize: "60px" }}>
                  <span style={{ fontWeight: "bold", fontSize: "120px" }}>camp</span>.SITE
								</h1>
                <hr></hr>
                <h2>find last-minute camping reservations</h2>
              </Jumbotron>
              <Form>
                <Row form>
                  <Col xs={6}>
                    <FormGroup>
                      <Input
                        className="form-control form-control-lg"
                        autoComplete="off"
                        type="text"
                        name="zipCode"
                        placeholder={this.props.currentLocationZipCode}
                        onChange={this.handleInputChange}
                        value={this.state.zipCode}
                      />
                      <Label
                        for="exampleEmail"
                        style={{ paddingLeft: "15px", color: "forestgreen" }}
                      >
                        Location
											</Label>
                    </FormGroup>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                      <Input
                        className="form-control form-control-lg"
                        autoComplete="off"
                        type="select"
                        name="miles"
                        placeholder="Select Miles"
                        value={this.state.miles}
                        id="milesSelect"
                        onChange={this.handleInputChange}
                      >
                        <option>50</option>
                        <option>100</option>
                        <option>200</option>
                        <option>300</option>
                        <option>400</option>
                        <option>500</option>
                      </Input>
                      <Label
                        for="milesSelect"
                        style={{ paddingLeft: "15px", color: "forestgreen" }}>Miles
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  onClick={this.campGroundSearch}
                  style={{
                    border: "none",
                    color: "white",
                    backgroundColor: "forestgreen",
                    padding: "15px",
                    fontSize: "25px",
                    marginBottom: "20px"
                  }}
                >
                  SEARCH
								</button>
              </div>
              {console.log(this.handleValidation(`^\\d`, this.state.zipCode))}

              {this.state.isValidZipCode &&
                this.props.campGrounds &&
                this.props.campGrounds.length > 0 ? (
                  <CampGroundList>
                    {this.props.campGrounds.map((campGround, index) => {
                      return (
                        <Col xs={12} md={6} key={index}>
                          <ListItem
                            username={this.props.username} //added by Steven, need the username prop to pull getCampgrounds in Saved.js
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
                        </Col>
                      );
                    })}
                  </CampGroundList>
                ) : (
                  <h2>No camp grounds to display</h2>
                )}
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
    currentLocationZipCode: state.currentLocationZipCode,
  };
}
export default connect(mapStateToProps)(Search);
