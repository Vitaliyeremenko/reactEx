import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';

const RequiredRoute = ({ component: Component, allowedRoles, _interface, ...rest }) => {
	return <Route {...rest} render={props => {
		if (!_.isEmpty(allowedRoles) && _.includes(allowedRoles, _interface.type)) {
			return <Component {...props} />
		}

		return (
			<div className="d-flex justify-content-center py-4">
				<h5 className="text-danger">Страница недоступна</h5>
			</div>
		)

		// return <Redirect to={{
		// 		pathname: '/dashboard/search',
		// 		state: { from: props.location }
		// 	}} />;
	}} />
}

function mapStateToProps(state) {
	const { _interface } = state;

  return {
  	_interface
  }
}

const connectedRequiredRoute = connect(mapStateToProps)(RequiredRoute);
export {
  connectedRequiredRoute as RequiredRoute
}