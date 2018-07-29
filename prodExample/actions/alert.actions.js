import { alertConstants } from '../constants';
import { userActions } from '../actions';

const success = (message) => {
  return {
    type: alertConstants.SUCCESS,
    message
  };
}

const error = (message) => {
  return dispatch => {
    if (message === 'Unauthenticated.') {
      dispatch(userActions.logout());
    }
    return dispatch({
      type: alertConstants.ERROR,
      message
    });
  }
}

const clear = () => {
  return { type: alertConstants.CLEAR };
}

export const alertActions = {
  success,
  error,
  clear
};