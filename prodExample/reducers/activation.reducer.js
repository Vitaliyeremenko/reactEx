import { userConstants } from '../constants';

export function activation(state = {}, action) {
  switch (action.type) {
    case userConstants.ACTIVATION_REQUEST:
      return { activating: true };
    case userConstants.ACTIVATION_SUCCESS:
      return {};
    case userConstants.ACTIVATION_FAILURE:
      return {};
    default:
      return state
  }
}