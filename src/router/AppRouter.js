import React from 'react';
import { connect } from 'react-redux'; 
//connects react component to redux state
import { Route, Switch, BrowserRouter } from 'react-router-dom';
//Route renders UI component when path matches the URL
//Switch stops render at matching route, display only one route used
//BrowserRouter keeps UI sync with URL by using HTML5 history(pushState, replaceState)

import Login from '../components/Login';
import Register from '../components/Register';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path="/" component={Login} exact={true} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AppRouter);