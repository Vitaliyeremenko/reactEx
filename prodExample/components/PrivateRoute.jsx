import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

function mapStateToProps(state) {
  const { authentication } = state;
  const { loggedIn } = authentication;

  return {
    loggedIn
  }
}

const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export {
  connectedPrivateRoute as PrivateRoute
}