import React from 'react';
import { connect } from 'react-redux'; //connects react component to redux state
import _ from 'lodash';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
//Route renders UI component when path matches the URL
//Switch stops render at matching route, display only one route used
//BrowserRouter keeps UI sync with URL by using HTML5 history(pushState, replaceState)
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Logout from '../components/Logout';
import Account from '../components/Account';

import Locked from '../components/Locked';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
  return (
    <Router history={history}>
      <div>
        {!_.isEmpty(auth.token) && <Header />}
        <div className="container">
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/account" component={Account} />
            <Route path="/profile" component={Profile} />

            <Route path="/locked" component={Locked} />

            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppRouter);
