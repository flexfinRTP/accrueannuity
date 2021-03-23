import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import { Form, Button } from 'react-bootstrap'; //import form and button
import { initiateLogin } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common'; //makes sure form fields across entire app are not empty
import { Link } from 'react-router-dom'; //accessible nav throughout app
//import logo from '../public/logo.png';
//<img src={logo} className="app-logo" alt="logo" />

const Login = (props) => { //initialize login state empty
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const processOnMount = useCallback(() => { //when page loads, make sure errors are cleared
    setErrorMsg(props.errors);
    return () => props.dispatch(resetErrors());
  }, [props]);

  useEffect(() => {
    processOnMount();
  }, [processOnMount]);

  const handleLogin = (event) => { //login using email, password
    event.preventDefault();
    const { email, password } = state;
    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate); //all fields have values @ login
    if (!allFieldsEntered) {
      setErrorMsg({
        signin_error: 'Please enter all the fields.'
      });
      //login fails and displays error
    } else {
      setErrorMsg({
        signin_error: ''
      });
      // login is successful
      props.dispatch(initiateLogin(email, password));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state, //email, pass defined
      [name]: value
    });
  };

  return (
    <div className="login-page">
      <div>
        <img id="logo-main" src={process.env.PUBLIC_URL + '/logo.png'} alt=""/> 
      </div>
      <div className="login-form">
        <Form onSubmit={handleLogin}>
          {errorMsg && errorMsg.signin_error && (
            <p className="errorMsg centered-message">{errorMsg.signin_error}</p>
          )}
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="action-items">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Link to="/register" className="btn btn-secondary">
              Create account
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors
});

//export default connect()(Login);
export default connect(mapStateToProps)(Login);