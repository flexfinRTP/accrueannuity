import React from 'react';
import { connect } from 'react-redux';
//connects react component to redux state
import { Form, Button } from 'react-bootstrap';
//import indvivual components form and button
import { validateFields } from '../utils/common';
//makes sure form fields across entire app are not empty
import { Link } from 'react-router-dom';
//accessible nav throughout app

class Register extends React.Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        cpassword: '',
        successMsg: '',
        errorMsg: '',
        isSubmitted: false
    };

    registerUser = (event) => {
        event.preventDefault();
        const { first_name, last_name, email, password, cpassword } = this.state;

        const fieldsToValidate = [
            { first_name },
            { last_name },
            { email },
            { password },
            { cpassword }
        ];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            this.setState({
                errorMsg: {
                    signup_error: 'Please fill out all fields.'
                }
            });
        } else {
            if (password !== cpassword) {
                this.setState({
                    errorMsg: {
                        signup_error: 'Confirm password does not match.'
                    }
                });
            } else {
                this.setState({ isSubmitted: true });
            }
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        const { errorMsg, successMsg, isSubmitted } = this.state;
        return (
            <div className="login-page">
                <h2>Register New User</h2>
                <div className="login-form">
                    <Form onSubmit={this.registerUser}>
                        {errorMsg && errorMsg.signup_error ? (
                            <p className="errorMsg centered-message">
                                {errorMsg.signup_error}
                            </p>
                        ) : (
                            isSubmitted && (
                                <p className="successMsg centered-message">{successMsg}</p>
                            )
                        )}

                        <Form.Group controlId="first_name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="Enter first name"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="last_name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Enter last name"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="cpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="cpassword"
                                placeholder="Enter confirm password"
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <div className="action-items">
                            <Button variant="primary" type="submit">
                                Register
                            </Button>

                            <Link to="/" className="btn btn-secondary">
                                Login
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect()(Register);