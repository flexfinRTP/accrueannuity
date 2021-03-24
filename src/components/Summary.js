import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import { Form, Button } from 'react-bootstrap'; //import form and button
import AccountForm from './AccountForm';

class Summary extends React.Component { //timer counting in UNIX
  constructor(props) {
    super(props)
    this.state = {
      account: this.props.account,
      time: 0,
      isOn: false,
      start: 0
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }
  resetTimer() {
    this.setState({ time: 0, isOn: false }) //
  }

  render() {
    const { selectedType } = this.props;

    const { account } = this.props;
    //const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);


    let start = (this.state.time === 0) ?
      <button onClick={this.startTimer}>start</button> :
      null
    let stop = (this.state.time === 0 || !this.state.isOn) ?
      null :
      <button onClick={this.stopTimer}>stop</button>
    let resume = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.startTimer}>resume</button>
    let reset = (this.state.time === 0 || this.state.isOn) ?
      null :
      <button onClick={this.resetTimer}>reset</button>
    return (
      <div>
        <div>
          <Form.Group controlId="contract_name">
            <Form.Label>Contract Name:</Form.Label>
            <span className="label-value">
              {this.account && this.account.contract_name}
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
        </div>

        <br></br>

        <div>
          <table>
            <tr>
              <th></th>
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

        <br></br>

        <div>
          <table>
            <tr>
              <th>Interest Rate:</th>
            </tr>
            <tr>
              <td id="rate">5%</td>
            </tr>
          </table>
        </div>

        <br></br>

        <div>
          <h3>timer: {(this.state.time)}</h3>
          {start}
          {resume}
          {stop}
          {reset}
        </div>
      </div>
    )
  }
}
//table needs dynamic variables described above
//rate needs dynamic variable for implementation into contract

export default connect()(Summary);