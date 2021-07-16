import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import moment from 'moment';
import {
    initiateGetTransactions,
} from '../actions/transactions';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BASE_API_URL } from '../utils/constants';
import axios from 'axios'; //GET, requests to an API end point, server
import { getTransactions } from '../utils/common';
import { Form, Button } from 'react-bootstrap';
//import DatePicker from 'react-datepicker';
import _ from 'lodash';
import { initiateAddAccntDetails } from '../actions/account';
import { resetErrors } from '../actions/errors';
import AddAccountForm from './AddAccountForm';


class Report extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        account: this.props.account, //bring in account
        transactions: [],
        transaction: this.props.transaction, //payout freq

        formatted_date: this.props.formatted_date,
        // deposit_amount: this.transactions.deposit_amount,
        // withdraw_amount: this.transactions.withdraw_amount,
        // total_balance: this.transactions.total_balance,

        // contract_balance: this.transactions.contract_balance

    }


    // // Using useEffect to call the API once mounted and set the data
    // useEffect = () => {
    //     (async () => {
    //         const result = await axios(`${BASE_API_URL}`);
    //         setTransactions(result.transactions);
    //     })();
    // };
    // componentDidMount(transactions) {
    //     this.props.setTransactions(transactions);
    // }

    //dispatch(setTransactions(profile.data));

    //trying to display data from transactions table
    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.transactions, this.props.transactions)) {
            this.setState({
                transactions: this.props.transactions
            });
        }
        if (!_.isEqual(prevProps.errors, this.props.errors)) {
            this.setState({
                errorMsg: this.props.errors
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetErrors());
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        });
    };

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        });
    };
    handleSubmit = (event) => {
        //event.preventDefault(); //prevents page from reloading when submitting event(form)

        this.setState({ formSubmitted: true });
        const { startDate, endDate } = this.state;
        const convertedStartDate = moment(startDate).format('YYYY-MM-DD');
        const convertedEndDate = moment(endDate).format('YYYY-MM-DD');

        const { account } = this.props;
        this.props.dispatch(
            initiateGetTransactions(
                account.account_id,
                convertedStartDate,
                convertedEndDate
            )
        );
    };

    render() {
        const { account } = this.props;
        const { transactions } = this.props;

        return (
            <div>
                <div>
                    <body>
                        <br />
                        <table className="transactions">
                            <thead>
                                <tr>
                                    <th>Transaction Date</th>
                                    <th>Deposits</th>
                                    <th>Withdrawals</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.formatted_date}</td>
                                    <td>{this.deposit_amount}</td>
                                    <td>{this.props.withdraw_amount}</td>
                                    <td>{this.props.total_balance}</td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    account: state.account,
    transactions: state.transactions,
    errors: state.errors
});

export default connect(mapStateToProps)(Report);