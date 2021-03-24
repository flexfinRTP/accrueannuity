import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'; //connects react component to redux state
import Moment from 'moment';
//import logo from './logo.svg';

class Example extends React.Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 90 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div>
            {this.state.time.m} minutes {this.state.time.s} seconds
            <br></br>
            <button onClick={this.startTimer}>Start </button>
                <br></br>
            </div>
        );
    }
}
// ? = if time is not up, display timer. : = else/false, then display text


//need countdown timer to reset at 0 and restart specified payment_freq (90sec)
//timer should not reset on page refresh, component mount issue.

export default connect()(Example);