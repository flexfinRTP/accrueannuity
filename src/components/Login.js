import React from 'react';
import { connect } from 'react-redux';
//connects react component to redux state
import { Form, Button } from 'react-bootstrap';
//import indvivual components form and button
import { validateFields } from '../utils/common';
//makes sure form fields across entire app are not empty
import { Link } from 'react-router-dom';
//accessible nav throughout app

//import logo from './logo.png';
//<img src={logo} className="app-logo" alt="logo" />

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMsg: ''
    };

    handleLogin = (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        const fieldsToValidate = [{ email }, { password }];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            this.setState({
                errorMsg: {
                    signin_error: 'Please fill out all fields.'
                }
            });
            //login fails and displays error
        } else {
            this.setState({
                errorMsg: {
                    signin_error: ''
                }
            });
            //login is succesfull
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const { errorMsg } = this.state;

        return (
            <div className="login-page">
                <h1>Accrue Annuity</h1>

                <div className="login-form">
                    <Form onSubmit={this.handleLogin}>
                        {errorMsg && errorMsg.signin_error && (
                            <p className="errorMsg centered-message">
                                {errorMsg.signin_error}
                            </p>
                        )}

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
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

                        <div className="action-items">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>

                            <Link to="/register" className="btn btn-secondary">
                                Create New Account
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect()(Login);