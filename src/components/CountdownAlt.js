import _ from 'lodash';
import { connect } from 'react-redux'; //connects react component to redux state

//countdown to Date
//its a clusterfuck
const Countdown = () => {
    let end = new Date('04/20/2021 4:20 PM')

    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let timer;

    function showRemaining() {
        let now = new Date();

        let timeLeft = end - now;

        if (timeLeft < 0) {
            clearInterval(timer);
            return;
        }
        let days = Math.floor(timeLeft / _day);
        let hours = Math.floor((timeLeft % _day) / _hour);
        let minutes = Math.floor((timeLeft % _hour) / _minute);
        let seconds = Math.floor((timeLeft % _minute) / _second);
    };
    return (
        <div>
            document.getElementById('countdown').innerHTML = days + 'days ';
            document.getElementById('countdown').innerHTML += hours + 'hrs ';
            document.getElementById('countdown').innerHTML += minutes + 'mins ';
            document.getElementById('countdown').innerHTML += seconds + 'secs';
            <div>
                {this.days} Days
                {this.hours} Hrs
                {this.minutes} Mins
                {this.seconds} Secs
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});
// timer = setInterval(showRemaining, 1000);
export default connect(mapStateToProps)(Countdown);
