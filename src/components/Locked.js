import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux store
import { Form, Button } from 'react-bootstrap'; //import button
import AccountForm from './AccountForm';
import Summary from './Summary';
import { history } from '../router/AppRouter';
import Account from './Account';
import CountdownTimer from './CountdownTimer';
import Timer from './Timer';

class Locked extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedType: 'locked',
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
  render() {
    //const { selectedType } = this.state;

    return (
      <div className="locked-main">
        <div>
          <button id="locked-btn" onClick={() => history.push('/Account')}>
            Click to Go Back
          </button>
        </div>

        <br></br>

        <div>
          <p id="contract-locked">Your Contract is Locked!</p>
        </div>

        <div>
          <Summary />
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