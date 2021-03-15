import React from 'react';
import { connect } from 'react-redux';
//connects react component to redux state
import { Form, Button } from 'react-bootstrap';
//import indvivual components form and button
import { validateFields } from '../utils/common';
//makes sure form fields across entire app are not empty
import { Link } from 'react-router-dom';
//accessible nav throughout app

const Login = () => {
    return <div>Login</div>
};

export default Login;