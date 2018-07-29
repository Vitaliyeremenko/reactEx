import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { history } from './helpers';
import { alertActions, userActions } from './actions';
import { PrivateRoute } from './components';
import {
  Advertisers,
  Bloggers,
  Contacts,
  NotFound,
  Login,
  Register,
  ResetPassword,
  Dashboard,
  Confirm,
  Terms,
} from './containers';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

    /**
     * scroll to top on history change and clear alert actions
     */
    history.listen((location, action) => {
      setTimeout(() => window.scrollTo(0, 0), 0);
      dispatch(alertActions.clear());
    });
  }

  render() {
    return (
      <div id="app">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Advertisers} />
            <Route exact path="/bloggers" component={Bloggers} />
            <Route exact path="/contacts" component={Contacts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/password/reset" component={ResetPassword} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/terms" component={Terms} />
            <PrivateRoute component={Dashboard} path="/dashboard" />
            <Route path="/register/confirm" component={Confirm} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, user } = state;
  return {
    alert,
    user,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
