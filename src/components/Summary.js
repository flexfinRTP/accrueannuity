import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import { Form, Button } from 'react-bootstrap'; //import form and button
import AccountForm from './AccountForm';
import _ from 'lodash';
import moment from 'moment';
import CountdownTimer from './CountdownTimer';
import Report from './Report';
import {
  initiateGetTransactions,
} from '../actions/transactions';
import { resetErrors } from '../actions/errors';

class Summary extends React.Component {

  state = {
    account: this.props.account,
    //amount: '',
    //editAccount: false,
    //payout_amt: '',
    //errorMsg: ''
    payout_freq: this.props.payout_freq,
    startDate: new Date(),
    endDate: new Date(),
    transactions: [],
    formSubmitted: true,
    errorMsg: '',
  };

  getData() {
    setTimeout(() => {
      console.log('Our transactions are fetched');
      this.setState({
        transactions: this.props.transactions
      })
    }, 1000)
  }

  componentDidMount() {
    this.getData();
    this.setState({
      transactions: this.props.transactions
    });
  }

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
    //const { selectedType } = this.props;

    const { account } = this.props;
    // const { transactions } = this.props;
    const { payout_freq } = this.props;
    const {
      startDate,
      endDate,
      transactions,
      formSubmitted,
      errorMsg
    } = this.state;
    //const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

    //current date
    const timeElasped = Date.now();
    const today = new Date(timeElasped);
    const today2 = today.toDateString();

    return (
      <div className="summary-main">
        <div>

          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="contract_name">
              <Form.Label>Contract Name:</Form.Label>
              <span className="label-value">
                {account && account.contract_name}
              </span>
            </Form.Group>

            <Form.Group controlId="payout_freq">
              <Form.Label>Payout Frequency:</Form.Label>
              <span className="label-value">{account && account.payout_freq} minutes</span>
            </Form.Group>

            <Form.Group controlId="payout_amt">
              <Form.Label>Payout Amount:</Form.Label>
              <span className="label-value">${account && account.payout_amt}</span>
            </Form.Group>

            <Form.Group controlId="total_balance">
              <Form.Label>Available Balance: $</Form.Label>
              <span className="label-value">
                {account && account.total_balance}
              </span>
            </Form.Group>

            <Form.Group controlId="contract_balance">
              <Form.Label>Contract Balance: $</Form.Label>
              <span className="label-value">
                {account && account.contract_balance}
              </span>
            </Form.Group>
          </Form>
        </div>

        <br />
        <div>
          <p><strong>Today's Date is: {today2}</strong></p>
        </div>
        <br />

        <div>
          <h3>Time Until Next Payment:</h3>
          <CountdownTimer
            currTime={this.payout_freq}
            state={account.payout_freq} //pass payout_freq as the current state of countdownTimer
            seconds={account.payout_freq}
          />
        </div>

        <br></br>

        <div className="interest-rate">
          <table>
            <tr>
              <th>Interest Rate:</th>
            </tr>
            <tr>
              <td>5%</td>
            </tr>
          </table>
        </div>

        <p>{this.state.transactions}</p>

        <Button type="submit"
          className="btn-report"
          transactions={transactions}
        >
          Transaction History
        </Button>

        <Report transactions={transactions} />

        <br></br><br></br>

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
                  <td>{this.state.formatted_date}</td>
                  <td>{this.deposit_amount}</td>
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
//table needs dynamic variables described above
//rate needs dynamic variable for implementation into contract

const mapStateToProps = (state) => ({
  email: state.auth && state.auth.email,
  account: state.account,
  transactions: state.transactions,
  errors: state.errors
});

export default connect(mapStateToProps)(Summary);