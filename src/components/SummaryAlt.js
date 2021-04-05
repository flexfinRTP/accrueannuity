import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
//import DatePicker from 'react-datepicker';
import _ from 'lodash';
import moment from 'moment';
import {
    initiateGetTransactions,
} from '../actions/transactions';
import { initiateAddAccntDetails } from '../actions/account';
import Report from './Report';
import { resetErrors } from '../actions/errors';
import AddAccountForm from './AddAccountForm';

class SummaryAlt extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        transactions: [],
        isDownloading: false,
        formSubmitted: false,
        errorMsg: ''
    };

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
        event.preventDefault();

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
        const {
            transactions,
        } = this.state;

        return (
            <div className="summary-form">
                <p>Transaction History</p>
                <div className="transactions-section">
                    <React.Fragment>
                        <div className="main-info">
                            <p>Contract Name: {account.contract_name}</p>
                            <p>Payout Frequency: {account.payout_freq} minute(s)</p>
                            <p>Payout Amount: ${account.payout_amt}</p>
                            <p>Total available balance: ${account.total_balance}</p>
                        </div>
                        <Report transactions={transactions} />
                    </React.Fragment>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    account: state.account,
    transactions: state.transactions,
    errors: state.errors
});

export default connect(mapStateToProps)(SummaryAlt);