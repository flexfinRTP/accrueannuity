import React from 'react';
import { Link } from 'react-router-dom'; //uses link to specify a specific path by using Link to (use exact to only display that path)
import { Form, Button } from 'react-bootstrap'; //import form and button
import { connect } from 'react-redux'; //connects react component to redux store
import _ from 'lodash';
import {
    initiateGetAccntDetails,
    initiateAddAccntDetails,
    initiateUpdateAccntDetails
} from '../actions/account';
import {
    initiateWithdrawAmount,
    initiateDepositAmount,
    initiateTimedPayment
} from '../actions/transactions';
import { resetErrors } from '../actions/errors';
import { validateFields } from '../utils/common';
//import { maskNumber } from '../utils/mask'; //deleted use 3.23.21
import AddAccountForm from './AddAccountForm';

class AccountForm extends React.Component {
    state = {
        amount: '',
        account: this.props.account,
        editAccount: false,
        payout_amt: '',
        errorMsg: '',
        payout_freq: this.props.payout_freq,

        selectedType: 'withdraw'
    };

    componentDidMount() {
        const { email } = this.props;
        if (email) {
            this.props.dispatch(initiateGetAccntDetails()); //calls initiateGetAccntDetails
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetErrors()); //calls reset errors
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.account, this.props.account)) {
            this.setState({ account: this.props.account });
        }
        if (!_.isEqual(prevProps.errors, this.props.errors)) {
            this.setState({ errorMsg: this.props.errors });
        }
    }

    handleUpdateAccount = (payout_amt) => {
        const fieldsToValidate = [{ payout_amt }];

        const allFieldsEntered = validateFields(fieldsToValidate); //is payout_amt field filled out, if not throw error
        if (!allFieldsEntered) {
            this.setState({
                errorMsg: {
                    update_error: 'Please enter desired payout amount'
                }
            });
        } else {
            this.setState({
                errorMsg: '' //no error displayed
            });
            this.props.dispatch(initiateUpdateAccntDetails(payout_amt)); //calls updateaccntdetails payout_amt prop 
        }
    };

    handleAmountChange = (event) => {
        this.setState({ amount: event.target.value }); //user defined amount, amount prop comes from here
    };

    handleEditAccount = (event) => {
        event.preventDefault(); //prevents page from reloading when submitting event(form) **Wont update balance when enable due to c_balance funconality
        this.setState((prevState) => ({ editAccount: !prevState.editAccount }));
    };

    handleInputChange = (event) => {
        this.setState({
            payout_amt: event.target.value //user defined payout amount, payout_amt comes from here
        });
    };

    handleOnSubmit = (event) => { //onSubmit have deposit submit = withdraw from contract
        event.preventDefault(); //prevents page from reloading when submitting event(form)
        let { amount, account, payout_amt, payout_freq } = this.state;

        const { selectedType } = this.props;
        const fieldsToValidate = [{ amount }];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) { //throw error if no withdraw amount is withdrawn
            this.setState({
                errorMsg: {
                    [selectedType === 'withdraw'
                        ? 'withdraw_error'
                        : 'add_error']: 'Please enter an amount to exchange.'
                }
            });
        } else { // dispatch objects when button is selected, have deposit submit = withdraw from contract
            let { total_balance } = account;
            let { contract_balance } = account;
            let { interest_rate } = account;

            amount = +amount;
            payout_amt = +payout_amt;
            payout_freq = +payout_freq;
            interest_rate = +0.05; //interest rate @ 5%

            contract_balance = +contract_balance;
            total_balance = +total_balance;
            if (selectedType === 'withdraw' && amount <= total_balance) { //withdraw conditional
                this.props.dispatch(initiateWithdrawAmount(account.account_id, amount));
                this.setState({
                    errorMsg: ''
                });
            } else if (selectedType === 'deposit' && amount <= contract_balance) { //deposit conditional //remove && for any input
                this.props.dispatch(initiateDepositAmount(account.account_id, amount));
                this.setState({
                    errorMsg: ''
                });
            } else if (selectedType === 'summary') {
                this.props.dispatch(initiateTimedPayment(account.account_id, amount));
                this.setState({
                    amount: {payout_amt},
                    errorMsg: ''
                });
            } else if (selectedType === 'auto' && this.minutes === 0) { //auto payment at end of countdown
                this.props.dispatch(initiateTimedPayment(account.account_id, amount));
                this.setState({
                    amount: {payout_amt}, //amount to initiateTimedPayment = user-defined payout_amt + interest rate
                    errorMsg: ''
                });

                // } 
                //  else if (selectedType === 'auto') {
                //     this.props.dispatch(initiateTimedPayment(account.account_id, payout_amt, payout_freq));
                //     this.setState({
                //         selectedType: 'auto',
                //         errorMsg: ''
                //     });
            } else {
                this.setState({
                    errorMsg: {
                        [selectedType === 'withdraw'
                            ? 'withdraw_error'
                            : 'add_error']: "Error: Check Balances"
                    }
                });
            }
        }
    };

    setSelectedType = (selectedType) => { //sets selectedtype state depending on button onclick
        this.setState({ selectedType });
    };

    handleAddAccount = (account) => {
        const { payout_freq, contract_name, payout_amt } = account;
        this.props
            .dispatch(initiateAddAccntDetails(payout_freq, contract_name, payout_amt))
            .then(() => this.props.dispatch(initiateGetAccntDetails()));
    };

    render() {
        const { selectedType } = this.props;
        const { editAccount, payout_amt, errorMsg, account } = this.state;
        const payout_freq = account.payout_freq;
        const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1); //renders only selectedType

        return payout_freq ? (
            //Pressing the Edit Contract Button
            editAccount ? (
                <div className="edit-account-form  col-md-6 offset-md-3">
                    <h3>
                        Contract Details
                        <a
                            href="/#"
                            className="edit-account"
                            onClick={this.handleEditAccount} //goes to edit contract details function
                        >
                            Go Back
                        </a>
                    </h3>
                    <hr />

                    <Form>
                        {errorMsg && errorMsg.update_error && ( //display error
                            <p className="errorMsg">{errorMsg.update_error}</p>
                        )}

                        <Form.Group controlId="contract_name">
                            <Form.Label>Contract Name:</Form.Label>
                            <span className="label-value">
                                {account && account.contract_name}
                            </span>
                        </Form.Group>

                        <Form.Group controlId="payout_freq">
                            <Form.Label>Payout Frequency:</Form.Label>
                            <span className="label-value">{account && payout_freq} seconds</span>
                        </Form.Group>

                        <Form.Group controlId="payout_amt">
                            <Form.Label>Payout Amount:</Form.Label>
                            <span className="label-value">${account && account.payout_amt}</span>
                            <Form.Control
                                type="text"
                                min="0"
                                placeholder="Enter Desired Payout Amount ($)"
                                value={payout_amt}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={() => this.handleUpdateAccount(payout_amt)}
                        >
                            Update Contract
                        </Button>

                    </Form>
                </div>
                //defualt display for /Account
            ) : (

                <div className="account-form col-md-6 offset-md-3">
                    {errorMsg && errorMsg.withdraw_error && (
                        <p className="errorMsg">{errorMsg.withdraw_error}</p>
                    )}
                    {errorMsg && errorMsg.add_error && (
                        <p className="errorMsg">{errorMsg.add_error}</p>
                    )}

                    <Form onSubmit={this.handleOnSubmit} className="account-form">
                        <Form.Group controlId="type">
                            <Form.Label>{type}</Form.Label>
                            <a
                                href="/#"
                                className="edit-account"
                                onClick={this.handleEditAccount}
                            >
                                View/Edit Contract
                                </a>
                        </Form.Group>
                        <hr />

                        <Form.Group controlId="contract_name">
                            <Form.Label>Contract Name:</Form.Label>
                            <span className="label-value">
                                {account && account.contract_name}
                            </span>
                        </Form.Group>

                        <Form.Group controlId="accnt_no">
                            <Form.Label>Available Balance: $</Form.Label>
                            <span className="label-value">
                                {account && account.total_balance}
                            </span>
                        </Form.Group>

                        <Form.Group controlId="accnt_no">
                            <Form.Label>Contract Balance: $</Form.Label>
                            <span className="label-value">
                                {account && account.contract_balance}
                            </span>
                        </Form.Group>
                        <hr />
                        <Form.Group controlId="amount">
                            <Form.Label>Exchange Amount: </Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                placeholder={`Enter amount to ${selectedType}`}
                                value={this.state.amount}
                                onChange={this.handleAmountChange}
                            />
                        </Form.Group>
                        <Button variant="primary"
                            type="submit">
                            Submit
                        </Button>
                        {/* <hr /> */}
                        {/* <Button variant="info"
                            type="add"
                            onClick={() => this.setSelectedType('add')}>
                            Add Funds
                        </Button> */}
                    </Form>
                </div>
            )
        ) : (
            <AddAccountForm handleAddAccount={this.handleAddAccount} />
        );
    }
}

const mapStateToProps = (state) => ({ //get new items from the state, get state from redux and map it to props of component and use inside of component. state as param
    email: state.auth && state.auth.email, //email prop is set to the state of auth and email
    account: state.account, //account prop is set to state of account
    errors: state.errors //errors prop is set to state of errors
});

export default connect(mapStateToProps)(AccountForm);

//EXTRA NOTES
///...copy of state (spread) use to add to state

// ternary operator == ? is true, : is false

//propTypes can set props to certain type only, payout_amt: PropTypes.int or double
//propTypes can be func, array, object, string...etc