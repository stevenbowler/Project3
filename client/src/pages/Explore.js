//@ts-check
/**@module*/
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
                // this.setState({ result: res.data, campGrounds: res.data.results })

                this.props.dispatch(savesCampGrounds(res.data.results));
                console.log(res.data.results);
            })

            .catch((err) => console.log(err));
        // this.campGroundSearch();
        // this.forceUpdate();
    }


    /**@function campGroundSearch */
    campGroundSearch = (query) => {
        console.log("campGroundSearch: zipCode miles", this.state.zipCode, this.state.miles);
        query = `${this.state.zipCode}&exact=false&radius=${this.state.miles}&size=20&fq=-entity_type%3Atour&fq=campsite_type_of_use%3AOvernight&fq=campsite_type_of_use%3Ana&fq=entity_type%3Acampground&fq=reservable%3A1&sort=available&start=0&start_date=${this.state.startDate}T00%3A00%3A00Z&end_date=${this.state.endDate}T00%3A00%3A00Z&include_unavailable=false?name=`;
        API.getCampGrounds(query)
            .then((res) => {
                this.props.dispatch(savesCampGrounds(res.data.results));
                console.log(res.data.results);
            })
            .catch((err) => console.log(err));
    };

    /**validate changes in input field 
    * @function handleValidation
    * @param {boolean} pattern after validation
    * @param {string} value current string input from field
    * */
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


	/**handle changes in input field
    * @function handleInputChange 
    * @param {object} event event object
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
                            {/*<Jumbotron>
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
                            </div> */}
                            {console.log(this.handleValidation(`^\\d`, this.state.zipCode))}

                            {/* {this.state.isValidZipCode && */}
                            {this.props.campGrounds &&
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
                                                        // distance={campGround.distance}
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
export default connect(mapStateToProps)(Explore);
