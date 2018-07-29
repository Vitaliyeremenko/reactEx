import { contactsConstants } from '../constants';

export function contacts(state = {}, action) {
  switch (action.type) {
    case contactsConstants.REQUEST:
      return {
        loading: true
      };
    case contactsConstants.SUCCESS:
      return {
        loading: false,
      };
    case contactsConstants.FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}