import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import { Button } from 'react-bootstrap'; //import button
import AccountForm from './AccountForm';
import Summary from './Summary';
import { history } from '../router/AppRouter';
import Account from './Account';

class Locked extends React.Component {
    constructor() {
        super();
        this.state = {
        };
      }

  render() {
    const { selectedType } = this.state;


    return (
      <div>
        <div>

          <button id="locked-btn" onClick={() => history.push('/Locked')}>
            Click to Lock in
          </button>

          <button id="locked-btn" onClick={() => history.push('/Account')}>
            Click to Go Back
          </button>

          <div>
            <Summary />
        </div>


        </div>
      </div>
    );
  }
}

export default connect()(Locked);