import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import {
    initiateGetTransactions,
    setTransactions
} from '../actions/transactions';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { BASE_API_URL } from '../utils/constants';
import axios from 'axios'; //GET, requests to an API end point, server
import { getTransactions } from '../utils/common';


class Report extends React.Component {
    state = {
        account: this.props.account, //bring in account
        transactions: this.props.transactions,
        transaction: this.props.transaction, //payout freq

        // formatted_date: transactions.formatted_date,
        // deposit_amount: this.transactions.deposit_amount,
        // withdraw_amount: this.transactions.withdraw_amount,
        // total_balance: this.transactions.total_balance,

        // contract_balance: this.transactions.contract_balance

    }


    // Using useEffect to call the API once mounted and set the data
    // useEffect(() => {
    //     (async () => {
    //         const result = await axios(`${BASE_API_URL}`);
    //         transactionsData(result.transactions);
    //     })();
    // }, []);
    // componentDidMount(transactions) {
    //     this.props.setTransactions(transactions);
    // }

    //dispatch(setTransactions(profile.data));

    //trying to display data from transactions table

    render(props) {
        const { account } = this.props;
        const { transaction } = this.props;

        return (
            <div>
                <div>
                    <body>
                        <br />
                        <table className="transactions">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Deposits</th>
                                    <th>Withdrawals</th>
                                    <th>Balance</th>
                                    <th>Contract Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.formatted_date}</td>
                                    <td>{this.props.deposit_amount}</td>
                                    <td>{this.props.withdraw_amount}</td>
                                    <td>{this.props.total_balance}</td>

                                    <td>{this.props.contract_balance}</td>
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