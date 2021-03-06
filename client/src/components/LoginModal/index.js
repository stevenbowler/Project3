//@ts-check
/**@module 
 * @requires react
*/
import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import { toggleLoginModal } from '../../redux/actionCreator';
import API from '../../utils/userAPI';



const { passwordValidation, emailValidation, nameValidation } = require('../../utils/validationNameEmailPassword');

/**@class */
class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.validEmail = false;
        this.invalidEmail = false;
        this.validName = false;
        this.invalidName = false;
        this.validPassword = false;
        this.invalidPassword = false;
        this.invalidEmailMessage = "";
        this.invalidNameMessage = "";
        this.invalidPasswordMessage = "";
        this.login = false;
        this.wrapper = React.createRef();
    }


    /**
     * handle cancel onclick event
    * @function handleCancel
    */
    handleCancel = () => {
        this.validEmail = false;
        this.invalidEmail = false;
        this.validName = false;
        this.invalidName = false;
        this.validPassword = false;
        this.invalidPassword = false;
        this.invalidEmailMessage = "";
        this.invalidNameMessage = "";
        this.invalidPasswordMessage = "";
        this.props.dispatch(toggleLoginModal());
    }



    /**
     * @function handleSubmit
     * @param {*} event
     */
    handleSubmit = (event) => {
        // console.log("App.js handleSubmit logging in with: ", event.target.email.value);
        const data = {
            // name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        if (this.validEmail && this.validPassword) {
            // console.log("handleSubmit Login with email: " + event.target.email.value + "password: " + event.target.password.value);
            API.loginAPI(data, this.props.dispatch);
            this.validEmail = false;
            this.validPassword = false;
            event.preventDefault();
        }
        else event.preventDefault();
    }


    /**
     * Handle changes in name field on login/register form
     * @function handleNameChange
     * @param {*} event
     */
    handleNameChange = (event) => {
        const data = {
            name: event.target.value
        }
        const { error } = nameValidation(data);
        if (error) {
            this.validName = false;
            this.invalidName = true;
            this.invalidNameMessage = error.details[0].message;
            this.forceUpdate();
            //console.log("NameInput: " + event.target.value + "validation error: " + error.details[0].message);
            return;
        }
        if (event.target.value) {
            //console.log("NameInput: " + event.target.value);
            this.validName = true;
            this.invalidName = false;
            this.invalidNameMessage = "";
            this.forceUpdate();
        }
    }


    /**
     * handle each character input in email field
     * @function handleEmailChange
     * @param {*} event
     */
    handleEmailChange = (event) => {
        const data = {
            email: event.target.value
        }
        const { error } = emailValidation(data);
        if (error) {
            this.validEmail = false;
            this.invalidEmail = true;
            this.invalidEmailMessage = error.details[0].message;
            this.forceUpdate();
            //console.log("emailInput: " + event.target.value + "validation error: " + error.details[0].message);
            return;
        }
        if (event.target.value) {
            //console.log("emailInput: " + event.target.value);
            this.validEmail = true;
            this.invalidEmail = false;
            this.invalidEmailMessage = "";
            this.forceUpdate();
        }
    }



    /**
     * handle each character input in password field
     * @function handlePasswordChange
     * @param {*} event
     */
    handlePasswordChange = (event) => {
        const data = {
            password: event.target.value
        }
        const { error } = passwordValidation(data);
        if (error) {
            this.validPassword = false;
            this.invalidPassword = true;
            this.invalidPasswordMessage = error.details[0].message;
            this.forceUpdate();
            //console.log("PasswordInput: " + event.target.value + "validation error: " + error.details[0].message);
            return;
        }
        if (event.target.value) {
            //console.log("PasswordInput: " + event.target.value);
            this.validPassword = true;
            this.invalidPassword = false;
            this.invalidPasswordMessage = "";
            this.forceUpdate();

        }
    }


    render() {
        return (
            <div ref={this.wrapper}>
                <Modal isOpen={this.props.isOpenLoginModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} >
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="emailInput" sm={20}>Email (Login ID):</Label>
                                <Col sm={100}>
                                    <Input
                                        type="email"
                                        id="emailInput"
                                        defaultValue=""
                                        name="email"
                                        onChange={this.handleEmailChange}
                                        placeholder="8 characters minumum"
                                        valid={this.validEmail ? true : false}
                                        invalid={this.invalidEmail ? true : false} >
                                    </Input>
                                    <FormText>{this.invalidEmailMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="passwordInput" sm={20}>Password: </Label>
                                <Col sm={100}>
                                    <Input
                                        type="password"
                                        id="passwordInput"
                                        defaultValue=""
                                        name="password"
                                        onChange={this.handlePasswordChange}
                                        placeholder="8 characters minumum"
                                        valid={this.validPassword ? true : false}
                                        invalid={this.invalidPassword ? true : false} />
                                    <FormText>{this.invalidPasswordMessage}</FormText>
                                </Col>
                            </FormGroup>
                            <Button color="primary" type="submit" >{this.props.isOpenLoginModal ? "Login" : "Register"}</Button>{' '}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        email: state.email,
        loggedIn: state.loggedIn,
        isOpenLoginModal: state.isOpenLoginModal
    }
}

export default connect(mapStateToProps)(LoginModal);