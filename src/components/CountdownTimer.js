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
    }

    startTimer() {
        if (this.timer === 0 && this.state.minutes > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        const minutes = this.state.minutes - 1;
        this.setState({
            time: this.secondsToTime(minutes),
            minutes: minutes,
        });

        // Check if we're at zero, than reset to user specified payout_freq
        if (minutes === 0) {
            //clearInterval(this.timer);
            this.setState({
                time: this.secondsToTime(minutes),
                minutes: this.payout_freq //needs to be payout_freq not static #
            })
        }
    }

    render() {
        
        //const payout_freq = account.payout_freq;

        return (
            <div>
                {this.state.time.m} minutes {this.state.time.s} seconds
                <br></br>
                <button onClick={this.startTimer}>Start </button>
                <br></br>

            </div>
        ); //onClick={this.startTimer}
    }
}

const mapStateToProps = (state) => ({
    email: state.auth && state.auth.email,
    account: state.account,
    errors: state.errors
  });
// ? = if time is not up, display timer. : = else/false, then display text


//need countdown timer to reset at 0 and restart specified payment_freq (90sec)
//timer should not reset on page refresh, component mount issue.

export default connect(mapStateToProps)(CountdownTimer);