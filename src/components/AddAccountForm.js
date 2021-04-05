import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux store
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap'; //import form and button
import { validateFields } from '../utils/common';

class AddAccountForm extends React.Component {
  state = {
    payout_freq: '',
    contract_name: '',
    payout_amt: '',
    errorMsg: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleAddAccount = (event) => {
    event.preventDefault();
    const { payout_freq, contract_name, payout_amt } = this.state;
    const fieldsToValidate = [{ payout_freq }, { contract_name }, { payout_amt }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          add_error: 'Please enter all the fields.'
        }
      });
    } else {
      this.props.handleAddAccount(this.state);
    }
  };

  render() {
    const { payout_freq, contract_name, payout_amt, errorMsg } = this.state;
    return (
      <div className="edit-account-form  col-md-6 offset-md-3">
        <Form onSubmit={this.handleAddAccount} className="account-form">
          {errorMsg && errorMsg.add_error && (
            <p className="errorMsg centered-message">{errorMsg.add_error}</p>
          )}
          <Form.Group controlId="type">
            <Form.Label>Add account</Form.Label>
          </Form.Group>
          <hr />
          <Form.Group controlId="contract_name">
            <Form.Label>Contract Name: </Form.Label>
            <Form.Control
              type="text"
              name="contract_name"
              placeholder="Enter Your Contract Name"
              value={contract_name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="payout_freq">
            <Form.Label>Payout Frequency:</Form.Label>
            <Form.Control
              type="text"
              name="payout_freq"
              placeholder="Enter Desired Payout Frequency in Minutes"
              value={payout_freq}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="payout_amt">
            <Form.Label>Payout Amount:</Form.Label>
            <Form.Control
              type="text"
              name="payout_amt"
              placeholder="Enter Desired Payout Amount ($)"
              value={payout_amt}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(AddAccountForm);