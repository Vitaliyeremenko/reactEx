import { platformConstants } from '../constants';
import { platformService } from '../services';
import { alertActions } from './alert.actions';

function getAllCategories(api_token) {
  return dispatch => {
    dispatch(request(api_token))

    platformService.getAllCategories(api_token)
      .then(
        categories => {
          dispatch(success(categories))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  
  function request(api_token) {
    return {
      type: platformConstants.GET_ALL_CATEGORIES_REQUEST,
      api_token
    }
  }
  function success(categories) {
    return {
      type: platformConstants.GET_ALL_CATEGORIES_SUCCESS,
      categories
    }
  }
  function failure(error) {
    return {
      type: platformConstants.GET_ALL_CATEGORIES_FAILURE,
      error
    }
  }
}

function getAllFormats(api_token, platform) {
  return dispatch => {
    dispatch(request(platform))

    // service
    platformService.getAllFormats(api_token, platform)
      .then(
        formats => {
          dispatch(success(formats))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(platform) {
    return {
      type: platformConstants.GET_ALL_FORMATS_REQUEST,
      platform
    }
  }
  function success(formats) {
    return {
      type: platformConstants.GET_ALL_FORMATS_SUCCESS,
      formats
    }
  }
  function failure(error) {
    return {
      type: platformConstants.GET_ALL_FORMATS_FAILURE,
      error
    }
  }
}

const getAllAdTypes = api_token => {
  const request = api_token => ({
    type: platformConstants.GET_ALL_AD_TYPES_REQUEST,
    api_token
  })
  
  const success = adTypes => ({
    type: platformConstants.GET_ALL_AD_TYPES_SUCCESS,
    adTypes
  })

  const failure = error => ({
    type: platformConstants.GET_ALL_AD_TYPES_FAILURE,
    error
  })
  
  return dispatch => {
    dispatch(request(api_token))

    platformService.getAllAdTypes(api_token)
      .then(
        adTypes => {
          dispatch(success(adTypes))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}

export const platformActions = {
  getAllCategories,
  getAllFormats,
  getAllAdTypes
};