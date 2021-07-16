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
  initiateWithdrawAmount,
  initiateDepositAmount,
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
    payout_amt: this.props.payout_amt,
    startDate: new Date(),
    endDate: new Date(),
    transactions: this.props.transactions, //added 5.16
    formSubmitted: true,
    errorMsg: '',
  };

  getData() {
    setTimeout(() => {
      console.log('Transactions are fetched');
      this.setState({
        transactions: this.state.transactions
      })
    }, 1000)
  }

  componentDidMount() {
    this.getData();
    fetch(initiateGetTransactions())
    fetch(initiateDepositAmount())
    fetch(initiateWithdrawAmount())
    .then(transactions => {
      this.setState({
        transactions: [this.state.transactions]
    })
    });
    
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.transactions, this.props.transactions)) {
  //     this.setState({
  //       transactions: this.props.transactions
  //     });
  //   }
  //   if (!_.isEqual(prevProps.errors, this.props.errors)) {
  //     this.setState({
  //       errorMsg: this.props.errors
  //     });
  //   }
  // }

  handleAutoPayment() {
    const minutes = this.minutes; //this.minutes needs to be imported from countdown via state.
    if (minutes === 0) {
      this.setState({
        time: this.secondsToTime(minutes),
        minutes: this.payout_freq, //needs to be payout_freq not static #
        total_balance: (this.total_balance + 60), //should be + {payout_amt}
        contract_balance: (this.contract_balance - this.payout_amt)
      })
    }

  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  handleSubmit = (event) => {
    // event.preventDefault();

    this.setState({ formSubmitted: true });

    const { account } = this.props;
    this.props.dispatch(
      initiateGetTransactions(
        account.account_id,
      ),
      initiateDepositAmount(),
      initiateWithdrawAmount()
    )
  };

  render() {
    //const { selectedType } = this.props;

    const { account } = this.props;
    // const { transactions } = this.props;
    const { payout_freq } = this.props;
    const { transactions } = this.state;
    const deposit_amount = transactions.deposit_amount;
    //const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

    //current date declaration
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
              <span className="label-value">
                {account && account.payout_freq} seconds
              </span>
            </Form.Group>

            <Form.Group controlId="payout_amt">
              <Form.Label>Payout Amount:</Form.Label>
              <span className="label-value">
                ${account && account.payout_amt}
              </span>
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

            {/* <Form.Group controlId="contract_balance">
              <Form.Label>Interest Payment: $</Form.Label>
              <span className="label-value">
                {}
              </span>
            </Form.Group> */}
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
            payout_amt={account.payout_amt}
            contract_balance={account.contract_balance}
            total_balance={account.total_balance}
          />
        </div>

        <hr />
        {/* <br></br>

        // <div className="interest-rate">
        //   <table>
        //     <tbody>
        //       <tr>
        //         <th>Interest Rate:</th>
        //       </tr>
        //       <tr>
        //         <td>5%</td>
        //       </tr>
        //     </tbody>
        //   </table>
        // </div>

        <ul>
          {this.state.transactions.map((transaction) => (
            <li key={transaction.id}>{transaction.total_balance}</li>
          ))}
        </ul>

        <p>{this.state.transactions}</p>

        <Button type="submit"
          className="btn-report"
          transactions={transactions}
          onClick={this.handleSubmit}
        >
          Transaction History
        </Button>


        {/* {this.state.transactions.map((transaction, index) => (
          <div><p key={index}>{transaction.deposit_amount} from {transactions.total_balance}</p></div>
        ))} */}


        <Report transactions={this.transactions} />

        <br></br><br></br>

        {/* <div>
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
                  <td>{this.state.transactions.formatted_date}</td>
                  <td>{this.props.deposit_amount}</td>
                  <td>{this.props.withdraw_amount}</td>
                  <td>{this.props.total_balance}</td>

                  <td>{this.props.contract_balance}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </div> */}

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