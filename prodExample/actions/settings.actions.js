import { settingsConstans } from '../constants/settings.constants'
import { alertActions } from '../actions'
import { settingsService } from '../services';


const getSettings = api_token => {
  const request = api_token => {
    return {
      type: settingsConstans.GET_SETTINGS,
      params: {
        api_token
      }
    }
  }
  const success = settings => {
    return {
      type: settingsConstans.GET_SETTINGS_SUCCESS,
      settings,
    }
  }
  const failure = error => {
    return {
      type: settingsConstans.GET_SETTINGS_FAILURE,
      error
    }
  }
  return dispatch => {
    dispatch(request(api_token))

    settingsService.getSettings(api_token)
      .then(
        settings => {
          dispatch(success(settings))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}

export const settingsActions = {
  getSettings
} 