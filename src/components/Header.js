import React from 'react';
import { Link } from 'react-router-dom'; //uses link to specify a specific path by using Link to (use exact to only display that path)

const Header = () => {

  if (window.location.pathname === '/Locked') return null;
  //removes header AFTER page refresh, need to remove header onClick "locked" button

  return (
    <header>
      <div>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" />
      </div>
      <div className="links">
        <Link to="/account" className="link">
          Account
        </Link>
        <Link to="/profile" className="link">
          Profile
        </Link>
        <Link to="/logout" className="link">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
