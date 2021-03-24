import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import { Form, Button } from 'react-bootstrap'; //import form and button
import AccountForm from './AccountForm';
import _ from 'lodash';
import Moment from 'moment';
import App from './CountdownTimer';
import CountdownTimer from './CountdownTimer';


class Summary extends React.Component {
    state = {
      account: this.props.account,
      //amount: '',
      //editAccount: false,
      //payout_amt: '',
      //errorMsg: ''
    }

  render() {
    //const { selectedType } = this.props;

    const { account } = this.props;
    //const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

    return (
      <div className="summary-main">
        <div>
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
          <Form.Group controlId="accnt_no">
            <Form.Label>Available Balance: $</Form.Label>
            <span className="label-value">
              {account && account.total_balance}
            </span>
          </Form.Group>
        </div>

        <br></br>

        <div>
          <h3>Time Until Next Payment:</h3>
          <CountdownTimer />
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

        <br></br><br></br>

        <div>
          <table>
            <tr>
              <th>Date</th>
              <th>Deposit/Withdraw</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
            <tr>
              <td>01/01/2021</td>
              <td>Deposit</td>
              <td>$100</td>
              <td>$100</td>
            </tr>
          </table>
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
  errors: state.errors
});

export default connect(mapStateToProps)(Summary);