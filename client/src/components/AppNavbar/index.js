//@ts-check
/**@module 
 * @requires react
 * @requires reactstrap
*/
import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavbarText,
    Nav,
    NavItem,
    NavLink,
    Button,
    ButtonGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import {
    toggleNavbar,
    logout,
    toggleLoginModal,
    toggleRegisterModal,
} from '../../redux/actionCreator';
import "./style.css";
import { Badge } from 'reactstrap';


class AppNavbar extends Component {

    /**
     * Send back toggle signal to App.js, to open/close navbar
     * @function toggle
     */
    toggleNavbar = () => this.props.dispatch(toggleNavbar());

    /**
     * Onclick request to register
     * @function register
     */
    register = () => this.props.dispatch(toggleRegisterModal());

    /**
     * Onclick request to login
     * @function login
     */
    login = () => this.props.dispatch(toggleLoginModal());

    /**
     * Onclick request to logout
     * @function logout
     */
    logout = () => this.props.dispatch(logout());
    
   

  
    render() {
        return (
            // <div> //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
            <Navbar dark expand="md" className="mb-5 sticky-top nav-bar">
                <NavbarBrand className="text-light mx-3 pt-3" href="/">CAMPsite</NavbarBrand>
                <NavbarText className="text-light" placeholder="test"><small>{this.props.username}</small></ NavbarText>

                <NavbarToggler onClick={this.toggleNavbar}></NavbarToggler>
                <Collapse isOpen={this.props.isOpenNavbar} navbar>
                    <Nav className="ml-auto text-light" navbar>



                        <NavItem>
                            <NavLink className="mx-2 pt-3 hover-underline" href="/search">Search</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="mx-2 pt-3 hover-underline" href="/saved">Favorites</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="mx-2 pt-3 hover-underline" href="/contact">Explore</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="mx-2 pt-3 hover-underline" href="/about">About</NavLink>
                        </NavItem>

                        <ButtonGroup block size="lg">
                            <Button className="authentication-buttons mx-2" color="outline-light" hidden={this.props.loggedIn === "true" ? true : false} float="left" display="inline" onClick={this.register}>Register</Button>
                            <Button className="authentication-buttons mx-2" color="outline-light" hidden={this.props.loggedIn === "true" ? true : false} float="left" display="inline" onClick={this.login}>Login</Button>
                            <Button className="authentication-buttons mx-2" color="outline-light" hidden={this.props.loggedIn === "true" ? false : true} float="left" display="inline" onClick={this.logout}>Logout</Button>
                        </ButtonGroup>
                    </Nav>
                </Collapse>
            </Navbar>
            // </div >  //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
        );
    }

}



const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email,
        loggedIn: state.loggedIn,
        isOpenNavbar: state.isOpenNavbar
    }
}

export default connect(mapStateToProps)(AppNavbar);
// export default AppNavbar;