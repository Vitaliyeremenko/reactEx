import { contactsConstants } from '../constants';
import { contactsService } from '../services';
import { alertActions } from './';

export const contactsActions = {
  send
};

function send(message) {
  return dispatch => {
    dispatch(request(message));

    contactsService.send(message)
      .then(
        response => {
          dispatch(success());
          dispatch(alertActions.success(response));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  }

  function request(message) {
    return {
      type: contactsConstants.REQUEST,
      message
    }
  }

  function success(status) {
    return {
      type: contactsConstants.SUCCESS,
      status
    }
  }

  function failure(error) {
    return {
      type: contactsConstants.FAILURE,
      error
    }
  }
}