import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'; //connects react component to redux store
import moment from 'moment';
import Summary from './Summary';
import { account, payout_freq } from './Summary';
//import logo from './logo.svg';

class CountdownTimer extends React.Component {
    constructor(props) {
        super(props);

        this.account = this.props.account //bring in account
        this.payout_freq = this.account.payout_freq //payout freq
        this.payout_amt = this.account.payout_amt

        this.state = { time: {}, minutes: this.payout_freq }; 
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let minutesFormula = secs % (60 * 60);
        let minutes = Math.floor(minutesFormula / 60);

        let secondsFormula = minutesFormula % 60;
        let seconds = Math.ceil(secondsFormula);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        const timeLeft = this.secondsToTime(this.state.minutes);
        this.setState({ time: timeLeft });
        this.startTimer(); //runs timer when page is loaded
    }

    startTimer() {
        if (this.timer === 0 && this.state.minutes > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown(state, account, payout_amt) {
        // Remove one second, set state so a re-render happens.
        const minutes = this.state.minutes - 1;
        this.setState({
            time: this.secondsToTime(minutes),
            minutes: minutes,
        });

        // Check if we're at zero, than reset to user specified payout_freq and payout_amt to total_balance
        if (minutes === 0) {
            //clearInterval(this.timer);
            this.setState({
                time: this.secondsToTime(minutes),
                minutes: this.payout_freq, //needs to be payout_freq not static #
                ...state,
                // total_balance: (+state.total_balance + +{payout_amt}),
                // contract_balance: (+state.contract_balance - +{payout_amt})
            })
        }
    }

    // timeCont = (account_id, start_date, end_date) => {
    //     start_date = moment(start_date).format('YYYY-MM-DD');
    //     end_date = moment(end_date).format('YYYY-MM-DD');
    //     this.setState({ errorMsg: '' });
    //     this.props
    //       .dispatch(timeCont(account_id, start_date, end_date))
    //       .then(() => this.setState({}));
    //   };

    render() {
        return (
            <div>
                {this.state.time.m} minutes {this.state.time.s} seconds
                <br></br>
                {/* <button onClick={this.startTimer}>Start </button> */}
                <br></br>

            </div>
        ); //onClick={this.startTimer}
    }
}

const mapStateToProps = (state) => ({
    email: state.auth && state.auth.email,
    account: state.account,
    errors: state.errors,
  });
// ? = if time is not up, display timer. : = else/false, then display text


//need countdown timer to reset at 0 and restart specified payment_freq (90sec)
//timer should not reset on page refresh, component mount issue.

export default connect(mapStateToProps)(CountdownTimer);