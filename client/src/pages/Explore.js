//@ts-check
/**@module*/
import AwesomeComponent from "../components/Spinner"
import moment from "moment";
import { savesCampGrounds } from "../redux/actionCreator";
import { connect } from "react-redux";
import React, { Component } from "react";
import API from "../utils/API";
import {
    Col,
    Row,
    Container,
} from "reactstrap";
import { CampGroundList, ListItem } from "../components/ExploreCampGroundList";


// import { Input, TextArea, FormBtn } from "../components/Form";
/**@class */
class Explore extends Component {
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
    // zipCodeArray = ["20001", "78550"]
    zipCodeArray = ["78550", "87001", "58001", "46001", "20001", "71601", "33001", "98001", "35004", "99501"];
    zipCode = "78550";

    /**Choose random zipCode then search recreation.gov and display, explore campsites around the country
     * @function componentDidMount
     * 
    */
    componentDidMount() {
        this.zipCode = this.zipCodeArray[Math.floor(Math.random() * 10).toString()];
        console.log(this.zipCode)
        this.setState({ zipCode: this.zipCode, miles: "500" });
        this.query = `${this.zipCode}&exact=false&radius=500&size=20&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=${this.state.startDate}T00%3A00%3A00Z&end_date=${this.state.endDate}T00%3A00%3A00Z&include_unavailable=false?name=`;
        API.getCampGrounds(this.query)
            .then((res) => {
                this.props.dispatch(savesCampGrounds(res.data.results));
                console.log(res.data.results);
            })

            .catch((err) => console.log(err));
    }


    /**@function campGroundSearch */
    campGroundSearch = () => {
        console.log("campGroundSearch: zipCode miles", this.state.zipCode, this.state.miles);
        var query = `${this.state.zipCode}&exact=false&radius=${this.state.miles}&size=10&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=${this.state.startDate}T00%3A00%3A00Z&end_date=${this.state.endDate}T00%3A00%3A00Z&include_unavailable=false?name=`;
        API.getCampGrounds(query)
            .then((res) => {
                this.props.dispatch(savesCampGrounds(res.data.results));
                console.log(res.data.results);
            })
            .catch((err) => console.log(err));
    };

    /**validate changes in input field 
    // * @function handleValidation
    // * @param {boolean} pattern after validation
    // * @param {string} value current string input from field
    // * */
    // handleValidation(pattern, value) {
    //     if (!pattern) return true;
    //     // string pattern, one validation rule
    //     if (typeof pattern === "string") {
    //         // console.log(pattern);

    //         const condition = new RegExp(pattern, "g");
    //         return condition.test(value);
    //     }
    //     // array patterns, multiple validation rules
    //     if (typeof pattern === "object") {
    //         const conditions = pattern.map((rule) => new RegExp(rule, "g"));
    //         return conditions.map((condition) => condition.test(value));
    //     }
    // }


	/**handle changes in input field
    // * @function handleInputChange 
    // * @param {object} event event object
    // */
    // handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({
    //         [name]: value,
    //     });
    //     if (this.handleValidation("^\\d{5}", value)) {
    //         this.setState({
    //             isValidZipCode: true,
    //         });
    //     }
    // };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div>
                            {/* {console.log(this.handleValidation(`^\\d`, this.state.zipCode))} */}

                            {/* {this.state.isValidZipCode && */}
                            {this.props.campGrounds &&
                                this.props.campGrounds.length > 0 ? (
                                    <CampGroundList>
                                        {this.props.campGrounds.map((campGround, index) => {
                                            // console.log("Explore.js line 201 undefined campGround: ", campGround);

                                              if (typeof campGround.addresses === "undefined" || campGround.addresses[0].state_code === "" || campGround.addresses[0].city === "") {    //sb added for addresses=undefined, crashes app
                                            // if (campGround.addresses[0].state_code === "" || campGround.addresses[0].city === "") {    //sb added for addresses=undefined, crashes app

                                                // var campGroundAddressesCity = "Unknown";
                                                // var campGroundAddressesStateCode = "Unknown";

                                                var campGroundAddressesCity = campGround.city;
                                                var campGroundAddressesStateCode = campGround.state_code;
                                            } else {
                                                campGroundAddressesCity = campGround.addresses[0].city
                                                campGroundAddressesStateCode = campGround.addresses[0].state_code
                                            }
                                            //sb added for addresses=undefined, crashes app

                                            if (typeof campGround.price_range === "undefined") {    //sb added for price_range=undefined, crashes app
                                                var campGroundPriceRangeMax = "Unknown";
                                                var campGroundPriceRangeMin = "Unknown";
                                            } else {
                                                campGroundPriceRangeMax = campGround.price_range.amount_max;
                                                campGroundPriceRangeMin = campGround.price_range.amount_min;
                                            }
                                            if (typeof campGround.preview_image_url === "undefined") {
                                                var placeholderImage = "./camping.png"

                                            } else {
                                                placeholderImage = campGround.preview_image_url
                                            }
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
                                                        // distance={campGround.distance}
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

                                    <AwesomeComponent />
                                    // <h2>No campgrounds to display</h2>
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
export default connect(mapStateToProps)(Explore);
