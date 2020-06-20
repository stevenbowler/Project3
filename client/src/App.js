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
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Nav from "./components/Nav";  // was in original Week 20 Activity 11
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
//import { Container } from 'reactstrap';   // was used in origial MERNshell
import AppNavbar from './components/AppNavbar';
import LoginRegisterModals from './components/LoginRegisterModals';
import Modal from './components/ExtraModal';
import { connect } from 'react-redux';
import { login, logout, loginError } from './redux/actionCreator';



// set background color below navbar
//@ts-ignore
//document.body.style = 'background: black;';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
    this.loggedIn = false;
    this.name = "";
    this.timerOn = false;
    this.state = {
      isOpenNavBar: false,
      isOpenLoginModal: false,
      isOpenRegisterModal: false,
      isOpenLeaderBoardModal: false,
    };
  }


  // LIFECYCLE METHODS and related support functions

  componentDidMount() {
    if (!sessionStorage["name"]) {
      console.log("app.js componentDidMount: ", this.state.name);
      sessionStorage.setItem("name", "Guest...Login");
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("email", "");
      sessionStorage.setItem("loggedIn", "false");
    } else console.log("sessionStorage.name already exists");
  }

  // componentDidUpdate() {
  // }

  // componentWillUnmount() {
  // }



  // STATE HANDLERS and related support functions FROM COMPONENTS

  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleNavbar
   */
  handleToggleNavbar = () => {
    this.setState({ isOpenNavBar: !this.state.isOpenNavBar });
    if (this.state.isOpenNavBar) this.setState({ gameOn: false });
  }


  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function handleToggleLeaderBoardModal
   */
  handleToggleLeaderBoardModal = () => {
    // console.log("handleToggleLeaderBoard userBestScore:", userBestScore);
    this.setState({ isOpenRegisterModal: false });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: !this.state.isOpenLeaderBoardModal });
  }



  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar
   * @function handleToggleLoginRegisterModal
   */
  handleToggleLoginRegisterModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLoginModal: false });
    this.setState({ isOpenLeaderBoardModal: false });
  }


  /**
   * handle state.isOpenNavBar toggle for ReactStrap AppNavBar 
   * @function
  */
  handleToggleLoginModal = () => {
    this.setState({ isOpenRegisterModal: !this.state.isOpenRegisterModal });
    this.setState({ isOpenLeaderBoardModal: false });
    this.setState({ isOpenLoginModal: !this.state.isOpenLoginModal });
  }



  /**
   * this is object with registration data
   * @typedef {object} data
   * @property {string} name - 8+ digit user name regex alpha-numeric
   * @property {string} email - email format string
   * @property {string} password - minimum 8 digit password regex alpha-numeric
   * 
  */


  /**
   * @function handleLogin
   * @param {data} data
   */
  handleLogin = (data) => {
    axios
      .post(
        '/api/users/login',
        {
          email: data.email,
          password: data.password
        })
      .then(response => {
        console.log(`login user: ${response.data.user.email}`);
        var reduxPayload = {
          token: response.data.token,
          username: response.data.user.name,
          email: response.data.user.email,
          loggedIn: "true"
        };
        this.props.dispatch(login(reduxPayload));
        this.handleToggleLoginModal();
      })
      .catch(error => {
        console.log("loginResponseError: ", error.response.data.statusMessage);
        this.props.dispatch(loginError(error.response.data.statusMessage));
        this.handleToggleLoginModal();
      });
  }




  /**
   * called from LoginRegisterModals component to handle registration request attribute changes
   * @function handleRegister
   * @param {data} data 
   * */
  handleRegister = (data) => {
    axios
      .post(
        '/api/users/register',        // first register
        {
          name: data.name,
          email: data.email,
          password: data.password
        })
      .then(response => {
        console.log(`register user: ${response.data.name} ${response.data.date}`);
        axios
          .post(
            '/api/users/login',       // then login
            {
              email: data.email,
              password: data.password
            })
          .then(response => {
            console.log(`login user: ${response.data.user.name}`);
            this.props.dispatch(login({
              token: response.data.token,
              email: response.data.user.email,
              username: response.data.user.name,
              loggedIn: true
            }));
            // this.props.dispatch(toggleLoginModal());
          }).catch(error => {
            console.log("Could not login after register")
            this.props.dispatch(loginError(error.response.data.statusMessage));
          });
      })
      .catch(error => {
        console.log(" Could not register from App.js: " + error.message);
      })
      .finally(() => {
        this.handleToggleLoginModal();
      });
  }






  /**
   * handle the logout event
   * @function handleLogout
   */
  handleLogout = () => {
    console.log(`logout: ${this.props.username}`);
    this.props.dispatch(logout());
  }


  /**
   * handle the Changecolor event from Navbar
   * @function handleChangeColor
   */
  handleChangeColor = () => {
    console.log("changeColor");
    var randomRed = Math.floor(Math.random() * 255);
    var randomGreen = Math.floor(Math.random() * 255);
    var randomBlue = Math.floor(Math.random() * 255);
    // console.log(randomGreen);
    //@ts-ignore
    document.body.style = `background-color: rgb(${randomRed}, ${randomGreen}, ${randomBlue});`;
    this.setState({ backgroundColor: `rgb(${randomRed}, ${randomGreen}, ${randomBlue})` });
  }

  /**
   * handle the Tutorial button event, play the tutorial for this app
   * @function handleTutorial
   */
  handleTutorial = () => {
    console.log("handleTutorial");
    window.location.href = "https://drive.google.com/file/d/1dXeXGydfJTvsE2GS7LnczJzTW0EKO-wS/view?usp=sharing";
  }


  render() {
    return (
      <Router>
        <div ref={this.wrapper}>
          <AppNavbar
            isOpen={this.state.isOpenNavBar}
            onRegister={this.handleToggleLoginRegisterModal}
            onLogin={this.handleToggleLoginModal}
            onLogout={this.handleLogout}
            onLeaderBoard={this.handleToggleLeaderBoardModal}
            onToggle={this.handleToggleNavbar}
            onTutorial={this.handleTutorial}
            onChangeColor={this.handleChangeColor}
          />
          <LoginRegisterModals
            isOpenLoginModal={this.state.isOpenLoginModal}
            isOpenRegisterModal={this.state.isOpenRegisterModal}
            onCancel={this.handleToggleLoginRegisterModal}
            onRegister={this.handleRegister}
            onLogin={this.handleLogin}
          />
          <Modal
            // loggedIn={this.state.loggedIn}
            onLogout={this.handleLogout}
            isOpenLeaderBoardModal={this.state.isOpenLeaderBoardModal}
            onCancel={this.handleToggleLeaderBoardModal}
          // token={this.state.token}
          // email={this.state.email}
          // userName={this.state.name}
          />
          <Switch>
            <Route exact path="/" render={(props) => <Search {...props} username={this.state.name} token={this.token} email={this.email} />} />
            {/* <Route exact path="/" component={Search} />*/}
            <Route exact path="/saved" render={(props) => <Saved {...props} />} />
            {/* <Route exact path="/saved" component={Saved} />  */}
            <Route exact path="/books/:id" component={null} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    username: state.username,
    email: state.email,
    token: state.token,
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App);

// export default App;
