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
    // Container,
    Button,
    ButtonGroup
} from 'reactstrap';
import { connect } from 'react-redux';
import "./style.css";



class AppNavbar extends Component {
    /**
     * Toggle the navbar modal variable
     * @function toggleModal */
    toggleModal = () => this.modal = !this.modal;

    /** 
     * Unused
     */
    registerInput = () => this.toggleModal();

    /**
     * Send back toggle signal to App.js, to open/close navbar
     * @function toggle
     */
    toggle = () => this.props.onToggle();

    /**
     * Onclick request to register
     * @function register
     */
    register = () => this.props.onRegister();

    /**
     * Onclick request to login
     * @function login
     */
    login = () => this.props.onLogin();

    /**
     * Onclick request to logout
     * @function logout
     */
    logout = () => this.props.onLogout();

    /**
     * Onclick toggle leaderboard
     * @function leaderBoard
     */
    leaderBoard = () => this.props.onLeaderBoard();

    /**
     * Onclick request tutorial video
     * @function tutorial
     */
    tutorial = () => this.props.onTutorial();

    /**
     * Onclick request to change background color
     * @function changeColor
     */
    changeColor = () => this.props.onChangeColor();

    render() {
        return (
            // <div> //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
             <Navbar dark expand="md" className="mb-5 sticky-top nav-bar">
                {/* <Container> */}
                <NavbarBrand className="text-light mx-3 pt-3" href="/">CAMPsite</NavbarBrand>
                {/**<NavbarText className="text-light" placeholder="test">{this.props.username}</ NavbarText>*/}

                <NavbarToggler onClick={this.toggle}></NavbarToggler>
                <Collapse isOpen={this.props.isOpen} navbar>
                    <Nav className="ml-auto text-light" navbar>  
                          

                    <NavItem>
                        <NavLink className="mx-2 pt-3 hover-underline" href="/">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="mx-2 pt-3 hover-underline" href="/">Search</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="mx-2 pt-3 hover-underline" href="/">Favorties</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="mx-2 pt-3 hover-underline" href="/">Contact</NavLink>
                    </NavItem>

            
    

                    <ButtonGroup block size="lg">
                        <Button className="authentication-buttons mx-2" color="outline-light" hidden={this.props.loggedIn ? true : false} float="left" display="inline" onClick={this.register}>Register</Button>
                        <Button className="authentication-buttons mx-2" color="outline-light" hidden={this.props.loggedIn ? true : false} float="left" display="inline" onClick={this.login}>Login</Button>
                        <Button className="authentication-buttons mx-2" color="outline-light" hidden={this.props.loggedIn ? false : true} float="left" display="inline" onClick={this.logout}>Logout</Button>
                    </ButtonGroup>


                    

                     {/*<Button color="dark" hidden={this.props.loggedIn ? false : true} float="left" display="inline" onClick={this.leaderBoard}>Modal</Button>*/}   
        


                    </Nav>
                </Collapse>
                {/* </Container> */}

            </Navbar>

            // </div >  //removed to get sticky navbar with reactstrap https://github.com/reactstrap/reactstrap/issues/1179
        );
    }

}



const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email,
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(AppNavbar);
// export default AppNavbar;