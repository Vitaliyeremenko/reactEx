import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? user : { error: null };

export function user(state = initialState, action) {
  switch(action.type) {
      case userConstants.SEND_ENTRY_TIME:
        return {}
    case userConstants.UPDATE:
      return {
        ...state,
        ...action.user,
        fetching: false,
      }
    // changing password in dashboard
    case userConstants.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case userConstants.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case userConstants.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        fetching: false
      }
    // resetting password if forgot (step 1)
    case userConstants.RESET_PASSWORD_LINK_REQUEST:
      return {
        fetching: true
      }
    case userConstants.RESET_PASSWORD_LINK_SUCCESS:
      return {
        message: action.message
      }
    case userConstants.RESET_PASSWORD_LINK_FAILURE:
      return {}

    // resetting password if forgot (step 2)
    case userConstants.RESET_PASSWORD_VALIDATE_REQUEST:
      return {
        fetching: true
      }
    case userConstants.RESET_PASSWORD_VALIDATE_SUCCESS:
      return {
        isTokenValid: true,
      }
    case userConstants.RESET_PASSWORD_VALIDATE_FAILURE:
      return {}

    // resetting password if forgot (step 3)
    case userConstants.RESET_PASSWORD_REQUEST:
      return {
        fetching: true
      }
    case userConstants.RESET_PASSWORD_SUCCESS:
      return {}
    case userConstants.RESET_PASSWORD_FAILURE:
      return {}

    // user settings
    case userConstants.CHANGE_SETTINGS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case userConstants.CHANGE_SETTINGS_SUCCESS:
      return {
        ...state,
        ...action.user,
        fetching: false,
      };
    case userConstants.CHANGE_SETTINGS_FAILURE:
      return {
        fetching: false,
        ...state
      };

    case userConstants.GET_PLATFORM_AUTH_LINK_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case userConstants.GET_PLATFORM_AUTH_LINK_SUCCESS:
      return {
        ...state,
        fetching: false,
      }
    case userConstants.GET_PLATFORM_AUTH_LINK_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case userConstants.CLEAR_PLATFORM_ERROR:
      return {
        ...state,
        fetching: false,
        error: null,
        errorInst: null
      }
    case userConstants.SET_PLATFORM_ERROR:
      return {
        ...state,
        errorInst: action.error
      }
    case userConstants.AUTH_PERSONAL_INSTAGRAM:
    case userConstants.AUTH_INSTAGRAM_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case userConstants.AUTH_PERSONAL_INSTAGRAM_SUCCESS:
    case userConstants.AUTH_INSTAGRAM_SUCCESS:
      return {
        ...action.user,
        fetching: false,
      }
    case userConstants.AUTH_PERSONAL_INSTAGRAM_FAILURE:
    case userConstants.AUTH_INSTAGRAM_FAILURE:
      return {
        ...state,
        fetching: false,
      }
    case userConstants.AUTH_INSTAGRAM_SELECT_REQUEST: 
      return {
        ...state,
        fetching: true,
      }
    case userConstants.AUTH_INSTAGRAM_SELECT_SUCCESS:
      return {
        ...state,
        fetching: false,
        pages: action.pages,
      }
    case userConstants.AUTH_INSTAGRAM_SELECT_FAILURE:
      return {
        ...state,
        fetching: false,
      }
    case userConstants.EDIT_INSTAGRAM_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case userConstants.EDIT_INSTAGRAM_SUCCESS:
      return {
        ...state,
        ...action.user,
        fetching: false,
      }
    case userConstants.EDIT_INSTAGRAM_FAILURE:
      return {
        ...state,
        fetching: false
      }
    case userConstants.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case userConstants.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.user,
        fetching: false,
      }
    case userConstants.PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        fetching: false,
      }
    case userConstants.CHECK_TOKEN_REQUEST:
      return {
        ...state,
      }
    case userConstants.CHECK_TOKEN_SUCCESS:
      return {
        ...state,
      }
    case userConstants.CHECK_TOKEN_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}