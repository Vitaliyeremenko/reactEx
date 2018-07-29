import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class HasRole extends Component {
  render() {
    const {
      children,
      currentUserRole,
      requiredRole
    } = this.props;
    
    if (currentUserRole !== requiredRole) return null;
    
    return (
      <div>
        {children}
      </div>
    );
  }
 
}
 
const getMapStateToProps = (extendWith = {}) => state => {
  const { _interface } = state;

  return {
    currentUserRole: _interface.type ? _interface.type : 'nobody',
    ...extendWith
  }
};
 
export default connect(getMapStateToProps())(HasRole);

export const IsBlogger = connect(getMapStateToProps({requiredRole: 'blogger'}))(HasRole);
export const IsAdvertiser = connect(getMapStateToProps({requiredRole: 'advertiser'}))(HasRole);