import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux store
import { Form, Button } from 'react-bootstrap'; //import button
import AccountForm from './AccountForm';
import _ from 'lodash';
import Summary from './Summary';
import { history } from '../router/AppRouter';
import Account from './Account';
// import CountdownTimer from './Countdown';
import LockedHeader from './LockedHeader';
import CountdownTimer from './CountdownTimer';
import Report from './Report';

//Locked should only display logout(LockedHeader) and Contract Summary, no withdraw or deposit functionality
class Locked extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedType: 'auto',
      // amount: '',
      //account: this.props.account,
      // editAccount: false,
      // payout_amt: '',
      // errorMsg: ''
    };
  }
  // setSelectedType = (selectedType) => { //sets selectedtype state depending on button onclick
  //   this.setState({ selectedType });
  // };

  //   componentDidMount() {
  //     const { Header } = this.props;
  //     if (Header) {
  //         this.props.dispatch(initiateGetAccntDetails()); //calls initiateGetAccntDetails
  //     }
  // }
  componentDidMount() {
    if (window.location.pathname === '/Locked') 
    return null;
  }


  render() {
    //const { selectedType } = this.state;
    const { account } = this.props;
    const { transactions } = this.props;
    const { payout_freq } = this.props;
    //const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

    //current date
    const timeElasped = Date.now();
    const today = new Date(timeElasped);
    const today2 = today.toDateString();


    return (
      <div className="locked-main">
        <div>
          <LockedHeader />
        </div>

        <div>
          <button id="locked-btn" 
          path="/account"
          onClick={() => history.push('/account')}>
            Click to Go Back
          </button>
        </div>

        <br></br>

        <div>
          <p id="contract-locked">Your Contract is Locked!</p>
        </div>
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

          <Form.Group controlId="accnt_no">
            <Form.Label>Contract Balance: $</Form.Label>
            <span className="label-value">
              {account && account.contract_balance}
            </span>
          </Form.Group>
        </div>

        <br />
        <div>
          <p><strong>Today's Date is: {today2}</strong></p>
          <h3>Time Until Next Payment:</h3>
          <p>Countdown / goes here</p>
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

          <div>
          <Report
            transactions={transactions}
          />
        </div>
        </div>

      </div>
      </div>
    );
  }
} //need header to go away on button click, not on refresh!!

const mapStateToProps = (state) => ({
  email: state.auth && state.auth.email,
  account: state.account,
  errors: state.errors
});

export default connect(mapStateToProps)(Locked);