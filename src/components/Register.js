import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import { Form, Button } from 'react-bootstrap'; //import form and button
import { registerNewUser } from '../actions/auth';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom'; //accessible nav throughout app

const Register = (props) => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const processOnMount = useCallback(() => {
    setErrorMsg(props.errors);
    return () => props.dispatch(resetErrors());
  }, [props]);

  useEffect(() => {
    processOnMount();
  }, [processOnMount]);

  const registerUser = (event) => {
    event.preventDefault();

    const { first_name, last_name, email, password, cpassword } = state;
    const fieldsToValidate = [ //checks user as inputed values into all fields
      { first_name },
      { last_name },
      { email },
      { password },
      { cpassword }
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) { //if a field is empty, enter value into all firelds
      setErrorMsg({
        signup_error: 'Please enter all the fields.'
      });
    } else {
      if (password !== cpassword) { //password and confirm must match when entering values
        setErrorMsg({
          signup_error: 'Password and confirm password does not match.'
        });
      } else {
        setIsSubmitted(true);
        props
          .dispatch(registerNewUser({ first_name, last_name, email, password }))
          .then((response) => {
            if (response.success) {
              setSuccessMsg('User registered successfully.');
              setErrorMsg('');
            }
          });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ //brings in state of all "field names" and sets value based on event.target.(value)
      ...state,
      [name]: value
    });
  };

  return (
    <div className="login-page">
      <h2>Register User</h2>
      <div className="login-form">
        <Form onSubmit={registerUser}>
          {errorMsg && errorMsg.signup_error ? (
            <p className="errorMsg centered-message">{errorMsg.signup_error}</p>
          ) : (
            isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
            )
          )}
          <Form.Group controlId="first_name">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Enter first name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Enter last name"
              onChange={handleInputChange}
            />
          </Form.Group>
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
          <Form.Group controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="Enter confirm password"
              onChange={handleInputChange}
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
};

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Register);
