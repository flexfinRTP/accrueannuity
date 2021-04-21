import React from 'react';
import { Link } from 'react-router-dom'; //uses link to specify a specific path by using Link to (use exact to only display that path)


//use this header when contract is locked
const LockedHeader = () => {

  //removes header AFTER page refresh, need to remove header onClick "locked" button

  if (window.location.pathname === '/account') return null;

//   handleHeader = () => {
//     this.setState({  }); 
// };

  return (
    <header>
      <div>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" />
      </div>
      <div className="links">
        <Link to="/logout" className="link">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default LockedHeader;