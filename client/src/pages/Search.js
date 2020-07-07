//@ts-check
/**@module*/
import moment from "moment";
import { savesCampGrounds } from "../redux/actionCreator";
import { connect } from "react-redux";
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Container,
} from "reactstrap";
import { CampGroundList, ListItem } from "../components/SearchCampGroundList";
// import CampGround from "../../../models/campGround";


class Search extends Component {
  constructor(props){
    super(props)
  }
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



  /** Wait for dom to load, then Search currentLocationZipCode to display nearest campsites
   * @function componentDidMount */
  componentDidMount() {
    setTimeout(() => {
      // console.log("this.props.currentLocationZipCode: ", this.props.currentLocationZipCode);
      if (this.props.currentLocationZipCode) {
        this.setState({ zipCode: this.props.currentLocationZipCode, miles: "500", isValidZipCode: true });
      }
      // this.campGroundSearch();
      this.forceUpdate();
    }, 1000);
  }


  /**
   * @function campGroundSearch
   */
  campGroundSearch = () => {
    var query = `${this.state.zipCode}&exact=false&radius=${this.state.miles}&size=20&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=${this.state.startDate}T00%3A00%3A00Z&end_date=${this.state.endDate}T00%3A00%3A00Z&include_unavailable=false?name=`;
    API.getCampGrounds(query)
      .then((res) => {
        if (typeof res.data.results !== "undefined") this.props.dispatch(savesCampGrounds(res.data.results));
      
      })
      .catch((err) => console.log(err));
  };

  /**
   * 
   * @param {*} pattern 
   * @param {*} value 
   */
  handleValidation(pattern, value) {
    if (!pattern) return true;
    // string pattern, one validation rule
    if (typeof pattern === "string") {
      // console.log(pattern);

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
   * 
   * @param {*} event 
   */
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
                        placeholder="Enter valid Zipcode"
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
                      // console.log("Explore.js line 201 undefined campGround: ", campGround);


                        if (typeof campGround.addresses === "undefined" || campGround.addresses[0].state_code === "" || campGround.addresses[0].city === "") {    //sb added for addresses=undefined, crashes app

                        // var campGroundAddressesCity = "Unknown";
                        // var campGroundAddressesStateCode = "Unknown";

                        var campGroundAddressesCity = campGround.city;
                        var campGroundAddressesStateCode = campGround.state_code;
                      } else {
                        campGroundAddressesCity = campGround.addresses[0].city
                        campGroundAddressesStateCode = campGround.addresses[0].state_code
                      }

                      if (typeof campGround.price_range === "undefined") {    //sb added for price_range=undefined, crashes app
                        var campGroundPriceRangeMax = "Unknown";
                        var campGroundPriceRangeMin = "Unknown";
                      } else {
                        campGroundPriceRangeMax = campGround.price_range.amount_max;
                        campGroundPriceRangeMin = campGround.price_range.amount_min;
                      }
                      var placeholderImage = campGround.preview_image_url ? campGround.preview_image_url : './camping.png';

                      return (
                        <Col xs={12} key={index}>
                          <ListItem
                            props={this.props}
                            username={this.props.username} //added by Steven, need the username prop to pull getCampgrounds in Saved.js
                            key={campGround._id}
                            entityId={campGround.entity_id}
                            campGround={campGround.name}
                            // city={campGround.addresses[0].city}            //sb replaced w next two lines and if typeof above
                            // state={campGround.addresses[0].state_code}
                            city={campGroundAddressesCity}
                            state={campGroundAddressesStateCode}
                            distance={campGround.distance}
                            rating={campGround.average_rating}
                            description={campGround.description}
                            imageURL={placeholderImage}
                            campsite_equipment_name={campGround.campsite_equipment_name}
                            // price_range_max={campGround.price_range.amount_max}          //sb
                            // price_range_min={campGround.price_range.amount_min}          //sb
                            price_range_max={campGroundPriceRangeMax}                    //sb added for undefined case
                            price_range_min={campGroundPriceRangeMin}                    //sb
                            availability={campGround.availability}
                            number_of_ratings={campGround.number_of_ratings}
                            campGroundSearch={  this.campGroundSearch }
                          />
                        </Col>
                      );
                    })}
                  </CampGroundList>
                ) : (
                  this.state.zipCode.length < 6 ? "" : <h2>No camp grounds to display</h2>
                )}
            </div>
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
    currentLocationZipCode: state.currentLocationZipCode,
  };
}
export default connect(mapStateToProps)(Search);
