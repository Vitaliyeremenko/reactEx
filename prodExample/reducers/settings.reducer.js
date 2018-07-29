import { settingsConstans } from '../constants';

const initialState = {}

export const settings = (state = initialState, action) => {
  switch (action.type) {
    case settingsConstans.GET_SETTINGS_SUCCESS:
      return {
        ...action.settings
      };
    case settingsConstans.GET_SETTINGS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}