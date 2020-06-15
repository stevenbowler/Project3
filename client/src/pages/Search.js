//@ts-check
/**@module*/
import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    campSites: [],
    name: "",
    location: "",
    rating: "",
    description:"",
    availability:"",
    imageURL:"",
    infoLink:"",
    revervationURL:""
  };
  // previousName = this.props.username;

  /**
   * Initial loadsearch and set previous state variable to track login username change
   * @function componentDidMount */
  componentDidMount() {
    this.loadCampSites();
    this.previousName = this.props.username;
  }

  /**
   * If there was a login then reload books with the newly logged in users choices
   * @function componentDidUpdate */
  componentDidUpdate() {
    if (this.previousName !== this.props.username) {  // if login or logout update books displayed
      this.loadCampSites();
      this.previousName = this.props.username;
    }
  }
  bookSearch = (query) => {
    query = `${this.state.query}`
    API.search(query).then(res =>
        this.setState({ result: res.data, books: res.data.items }))
        .catch(err => console.log(err));
}

  /**
   * This is where the magic happens ... the infamous / route
   * @function loadBooks */
  loadCampSites = () => {
    console.log("username: ", this.props.username);
    API.getCampSites({ username: this.props.username, token: this.props.token, email: this.props.email })
      .then(res => {
        this.setState({ CampSites: res.data, name: "",
        location: "",
        rating: "",
        description:"",
        availability:"",
        imageURL:"",
        infoLink:"",
        revervationURL:""  })
      }
      )
      .catch(err => console.log(err));
  };

  /**
   * Delete a book from the list
   * @function deleteBook */
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadCampSites())
      .catch(err => console.log(err));
  };

  /**
   * handle changes in input field
   * @function handleInputChange */
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  /**
   * Onclick submit of new choice book/author etc.
   * @function handleFormSubmit */
  handleFormSubmit = event => {
    event.preventDefault();
    // if (this.state.title && this.state.author) {
      API.saveCampSite({
        name: this.state.name,
        location: this.state.location,
        rating: this.props.rating,
        description: this.state.description,
        availability: this.state.availability,
        imageURL: this.state.imageURL,
        infoLink: this.state.infoLink,
        reservationURL: this.state.reservationURL
      })
        .then(res => this.loadCampSites())
        .catch(err => console.log(err));
    // }
  };

  render() {
    return (
        <Container fluid>
            <Row>
                <Col size="md-12">
                    <div>
                        <Jumbotron>
                            <h1>Google Books Search</h1>
                            <h1>Search for and save your favorite books</h1>
                        </Jumbotron>
                        <input className="form-control form-control-lg" autoComplete="off" type="text" name="query" onChange={this.handleInputChange} />
                        <button class="btn" type="submit" onClick={this.campSearch} >
                            Search for Books
      </button>

                        {(this.state.books && this.state.books.length > 0) ?
                            <CampSiteList>
                                {this.state.books.map(book => {
                                    // return (
                                        <div>
                                            <ListItem
                                                key={book.id}
                                                name={book.volumeInfo.name}
                                                location={book.volumeInfo.location}
                                                rating={book.volumeInfo.imageLinks.thumbnail}
                                                description={book.volumeInfo.description}
                                                availability={book.volumeInfo.availability}
                                                infoLink={book.volumeInfo.availability}
                                                reservationURL={book.volumeInfo.availability}
                                            />
                                            <SaveBtn

                                                title={book.volumeInfo.title}
                                                authors={book.volumeInfo.authors}
                                                description={book.volumeInfo.description}
                                                image={book.volumeInfo.imageLinks.thumbnail}
                                                link={book.volumeInfo.previewLink}

                                            />
                                        </div>
                                    )
                                }
                                )}
                            </BookList>
                            :
                            <h2>No books to display</h2>
                        }
                    </div>
                </Col>

            </Row>
        </Container>
    );
  }
}

export default CampSites;
