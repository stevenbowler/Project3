//@ts-check
/**@module 
 * @requires react
 * @requires react-router-dom
 * @requires module:/src/pages/Books
 * @requires module:/src/pages/Detail
 * @requires module:/src/pages/NoMatch
 * @requires bootstrap
 * @requires axios
 * @requires module:/src/components/AppNavbar
 * @requires module:/src/components/LoginRegisterModals
 * @requires module:/src/components/ExtraModal
*/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import { connect } from 'react-redux';
import { logout, updateFavoritesCount } from './redux/actionCreator';
import locationAPI from "./utils/locationAPI";
import API from "./utils/API";


/**@class */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();   //Facebook workaround

  }


  // LIFECYCLE METHODS and related support functions
  /**Find local zipcode and if wasn't previously logged-in in this session then reset with logout
   * @function componentDidMount
   */
  componentDidMount() {
    locationAPI.findZipCode(this.props.dispatch);
    if (!sessionStorage["name"]) {
      this.props.dispatch(logout());    // on load, reset all user settings, only when not already set
      this.props.dispatch(updateFavoritesCount("0"));    // on load, reset all user settings, only when not already set
    } else console.log("sessionStorage.name already exists");
    API.getCampGround(this.props.username)
      .then(res => {
        this.props.dispatch(updateFavoritesCount(res.data.length.toString()));
      })
      .catch((err => console.log(err)));
  }


  render() {
    return (
      <Router>
        <div ref={this.wrapper}>
          <AppNavbar />
          <LoginModal />
          <RegisterModal />
          <Switch>

            <Route exact path="/" render={(props) => <Search {...props} />} />
            <Route exact path="/search" render={(props) => <Search {...props} />} />
            <Route exact path="/saved" render={(props) => <Saved {...props} />} />
            <Route exact path="/explore" render={(props) => <Explore {...props} />} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

/**@function mapStateToProps */
const mapStateToProps = (state) => {
  return {
    username: state.username,
    email: state.email,
    token: state.token,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);