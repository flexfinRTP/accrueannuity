import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux store
import { Button } from 'react-bootstrap'; //import button
import AccountForm from './AccountForm';
import Summary from './Summary';
import { history } from '../router/AppRouter';
//import Locked from './Locked';

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedType: 'withdraw', //default selectedType
    };
  }



  setSelectedType = (selectedType) => { //sets selectedtype state depending on button onclick
    this.setState({ selectedType });
  };

  render() {
    const { selectedType } = this.state; //display current selectedType
    


    // const currentType = [ ...selectedType ]; //array of types to delete

    // const indexType = currentType.findIndex(selectedType); //find index of currentType selected

    // if (indexType === 'locked') { //if index in selectedType array is 'locked' then splice other selectedtypes from appearing
    //   currentType.splice(indexType, 1);
    // } else {
    //   currentType.push(selectedType); //else push the selectedtype normally
    // }

    // this.setState({ //set currentType(selectedType) as the current array only
    //   currentType: indexType,
    // })



    return ( //display buttons and give them a selectedType so only that component will show
      <div>
        <div className="account">
          <Button
            variant="primary"
            className={`${selectedType === 'withdraw' ? 'active account-btn' : 'account-btn'}`}
            onClick={() => this.setSelectedType('withdraw')}
          >
            Withdraw to Contract
          </Button>
          <Button
            variant="secondary"
            className={`${selectedType === 'deposit' ? 'active account-btn' : 'account-btn'}`}
            onClick={() => this.setSelectedType('deposit')}
          >
            Deposit to Account
          </Button>
          <Button
            variant="info"
            className={`${selectedType === 'summary' ? 'active account-btn' : 'account-btn'}`}
            onClick={() => this.setSelectedType('summary')}
          >
            Summary
          </Button>

          <button 
          variant="lock"
          className={`${selectedType === 'auto' ? 'active account-btn' : 'account-btn'}`}
          style={{backgroundColor:'red', color:'white'}}
          color='red'
          path="/Locked"

          onClick={() => 
          {this.setSelectedType('auto'); 
          history.push('/Locked')}}
          >
            Lock Contract
          </button>


        </div>
        <div>
          {selectedType === 'withdraw' || selectedType === 'deposit' || selectedType === 'add' || selectedType === 'auto' ? ( //tells to display withdraw, deposit condit from AccountForm. if false display Summary
            <AccountForm selectedType={selectedType} /> //displays selectedType
          ) : (
            <Summary /> //or summary page
          )}
        </div>
      </div>
    );
  }
}

export default connect()(Account);