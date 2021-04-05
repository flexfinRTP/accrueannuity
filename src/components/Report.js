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
        account: this.props.account,
        //amount: '',
        //editAccount: false,
        //payout_amt: '',
        //errorMsg: ''
        payout_freq: this.props.payout_freq,
        transactions: this.props.transactions
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


render() {
    const { account } = this.props;
    const { transactions } = this.props;

    return (
        <div>
            <div>
                <body>
                    <br />
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Deposits</th>
                                <th>Withdrawals</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{transactions.formatted_date}</td>
                                <td>{transactions.deposit_amount}</td>
                                <td>{transactions.withdraw_amount}</td>
                                <td>{transactions.total_balance}</td>
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