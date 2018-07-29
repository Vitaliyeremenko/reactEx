import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions, interfaceActions } from './';
import { history } from '../helpers';

const setUserError = () => {
  return {
    type: userConstants.SET_PLATFORM_ERROR,
    error: 'Чтобы завершить регистрацию  добавьте платформу.'
  }
}

const checkUserSettings = (user, dispatch) => {
  for (const key in user) {
    if (user.hasOwnProperty(key)) {
      if (key !== 'error' && key !== 'errorInst' && key !== 'instagram' && user[key] === null) {
        history.push('/dashboard/settings');
        return { type: userConstants.CHECK_USER_SETTINGS }
      }
    }
  }
  if ((user['instagram'] === null) && user.role === 'blogger') {
    history.push('/dashboard/platforms/add')
    dispatch(setUserError())
  }
  return { type: userConstants.CHECK_USER_SETTINGS }
};

const clearUserError = () => {
  return {
    type: userConstants.CLEAR_PLATFORM_ERROR
  }
}

function login(email, password) {
  return dispatch => {
    dispatch(request({
      email
    }));

    userService.login(email, password)
      .then(
        user => {
          const { role } = user;
          
          dispatch(success());
          dispatch(update(user));
          dispatch(interfaceActions.setInterface(role));
          checkUserSettings(user, dispatch);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

function logout() {
  userService.logout();
  return {
    type: userConstants.LOGOUT
  };
}

function register(email, role) {
  return dispatch => {
    dispatch(request(email, role));

    userService.register(email, role)
      .then(
        message => {
          dispatch(success());
          logout();
          dispatch(alertActions.success(message));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) {
    return {
      type: userConstants.REGISTER_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.REGISTER_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.REGISTER_FAILURE,
      error
    }
  }
}

function activation(email, token) {
  return dispatch => {
    dispatch(request(email, token));

    userService.activation(email, token)
      .then(
        message => {
          dispatch(success());
          dispatch(alertActions.success(message));
          setTimeout(() => logout(), 3000);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
          setTimeout(() => logout(), 3000);
        }
      );
  };

  function request(user) {
    return {
      type: userConstants.ACTIVATION_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.ACTIVATION_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.ACTIVATION_FAILURE,
      error
    }
  }
}

function update(user) {
  localStorage.setItem('user', JSON.stringify(user));

  return {
    type: userConstants.UPDATE,
    user
  }
}

function resetPasswordLink(email) {
  return dispatch => {
    dispatch(request(email));

    userService.resetPasswordLink(email)
      .then(
        message => {
          dispatch(success())
          dispatch(alertActions.success(message))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(email) {
    return {
      type: userConstants.RESET_PASSWORD_LINK_REQUEST,
      email
    }
  }

  function success(message) {
    return {
      type: userConstants.RESET_PASSWORD_LINK_SUCCESS,
      message
    }
  }

  function failure(error) {
    return {
      type: userConstants.RESET_PASSWORD_LINK_FAILURE,
      error
    }
  }
}

function resetPasswordValidate(token) {
  return dispatch => {
    dispatch(request(token));

    userService.resetPasswordValidate(token)
      .then(
        message => {
          dispatch(success())
          dispatch(alertActions.success(message))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(token) {
    return {
      type: userConstants.RESET_PASSWORD_VALIDATE_REQUEST,
      token
    }
  }

  function success(message) {
    return {
      type: userConstants.RESET_PASSWORD_VALIDATE_SUCCESS,
      message
    }
  }

  function failure(error) {
    return {
      type: userConstants.RESET_PASSWORD_VALIDATE_FAILURE,
      error
    }
  }
}

function resetPassword(password, token) {
  return dispatch => {
    dispatch(request({ password, token }));

    userService.resetPassword(password, token)
      .then(
        message => {
          dispatch(success())
          dispatch(alertActions.success(message))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(data) {
    return {
      type: userConstants.RESET_PASSWORD_VALIDATE_REQUEST,
      data
    }
  }

  function success(message) {
    return {
      type: userConstants.RESET_PASSWORD_VALIDATE_SUCCESS,
      message
    }
  }

  function failure(error) {
    return {
      type: userConstants.RESET_PASSWORD_VALIDATE_FAILURE,
      error
    }
  }
}

function changeSettings(user) {
  return dispatch => {
    dispatch(request(user));

    userService.changeSettings(user)
      .then(
        user => {
          dispatch(success(user));
          dispatch(update(user));
          dispatch(alertActions.success('Изменения успешно сохранены.'))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request(user) {
    return {
      type: userConstants.CHANGE_SETTINGS_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.CHANGE_SETTINGS_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.CHANGE_SETTINGS_FAILURE,
      error
    }
  }
}

function changePassword(passwords, user) {
  return dispatch => {
    dispatch(request(passwords, user));

    userService.changePassword(passwords, user)
      .then(
        response => {
          const { message, user } = response;
          
          dispatch(success())
          dispatch(update(user));
          dispatch(alertActions.success(message))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(info) {
    return {
      type: userConstants.CHANGE_PASSWORD_REQUEST,
      info
    }
  }

  function success(message) {
    return {
      type: userConstants.CHANGE_PASSWORD_SUCCESS,
      message
    }
  }

  function failure(error) {
    return {
      type: userConstants.CHANGE_PASSWORD_FAILURE,
      error
    }
  }
}

function getPlatformAuthLink(name, api_token) {
  return dispatch => {
    dispatch(request({ name, api_token }))

    userService.getPlatformAuthLink(name, api_token)
      .then(
        platform => {
          dispatch(success(platform))
          window.location.href = platform.link;
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      );
  }

  function request(name, api_token) {
    return {
      type: userConstants.GET_PLATFORM_AUTH_LINK_REQUEST,
      params: {
        name,
        api_token
      }
    }
  }

  function success(platform) {
    return {
      type: userConstants.GET_PLATFORM_AUTH_LINK_SUCCESS,
      platform
    }
  }

  function failure(error) {
    return {
      type: userConstants.GET_PLATFORM_AUTH_LINK_FAILURE,
      error
    }
  }
};

function authInstagram(user, instagram_business_account_id) {
  return dispatch => {
    dispatch(request());
    
    userService.authInstagram(user, instagram_business_account_id)
      .then(
        user => {
          dispatch(success(user));
          dispatch(update(user));
          history.push('/dashboard/platforms/edit/instagram');
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() {
    return {
      type: userConstants.AUTH_INSTAGRAM_REQUEST
    }
  }

  function success(user) {
    return {
      type: userConstants.AUTH_INSTAGRAM_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.AUTH_INSTAGRAM_FAILURE,
      error
    }
  }
}

function authPersonalInstagram(user, api_token, access_token) {
  return dispatch => {
    dispatch(request());
    
    userService.authPersonalInstagram(user, api_token, access_token)
      .then(
        user => {
          dispatch(success(user));
          dispatch(update(user));
          history.push('/dashboard/platforms/edit/instagram');
        },
        error => {
          dispatch(failure())
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() {
    return {
      type: userConstants.AUTH_PERSONAL_INSTAGRAM
    }
  }

  function success(user) {
    return {
      type: userConstants.AUTH_PERSONAL_INSTAGRAM_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.AUTH_PERSONAL_INSTAGRAM_FAILURE,
      error
    }
  }
}

const authInstagramSelect = (user, code) => {
  const request = (params = { user, code }) => ({
    type: userConstants.AUTH_INSTAGRAM_SELECT_REQUEST,
    params,
  });

  const success = pages => ({
    type: userConstants.AUTH_INSTAGRAM_SELECT_SUCCESS,
    pages,
  });

  const failure = err => ({
    type: userConstants.AUTH_INSTAGRAM_SELECT_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request(user, code));

    userService.authInstagramSelect(user, code)
      .then(
        (pages) => {
          dispatch(success(pages))
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
          setTimeout(() => history.push('/dashboard/platforms/add'), 1500);
        }
      );
  }
};

function editInstagram(user, settings) {
  return dispatch => {
    dispatch(request(settings))

    userService.editInstagram(user, settings)
      .then(
        user => {
          dispatch(success(user))
          dispatch(update(user))
          history.push('/dashboard/platforms');
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(settings) {
    return {
      type: userConstants.EDIT_INSTAGRAM_REQUEST,
      settings
    }
  }

  function success(instagram) {
    return {
      type: userConstants.EDIT_INSTAGRAM_SUCCESS,
      instagram
    }
  }

  function failure(error) {
    return {
      type: userConstants.EDIT_INSTAGRAM_FAILURE,
      error
    }
  }
}

function profileUpdate(api_token) {
  return dispatch => {
    dispatch(request(api_token));

    userService.profileUpdate(api_token)
      .then(
        user => {
          dispatch(success(user))
          dispatch(update(user))
        },
        err => {
          setTimeout(() => dispatch(logout()), 1000)
          // dispatch(failure(err))
          // dispatch(alertActions.error(err))
        }
      )
  }

  function request(api_token) {
    return {
      type: userConstants.PROFILE_UPDATE_REQUEST,
      api_token
    }
  }

  function success(user) {
    return {
      type: userConstants.PROFILE_UPDATE_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.PROFILE_UPDATE_FAILURE,
      error
    }
  }
}

const checkToken = (api_token) => {
  const request = (api_token) => ({
    type: userConstants.CHECK_TOKEN_REQUEST,
    api_token,
  });

  const success = () => ({
    type: userConstants.CHECK_TOKEN_SUCCESS,
  });

  const failure = () => ({
    type: userConstants.CHECK_TOKEN_FAILURE
  });

  return (dispatch) => {
    dispatch(request(api_token));

    userService.checkToken(api_token)
      .then(
        response => dispatch(success(response)),
        (error) => {
          dispatch(failure(error))
          dispatch(logout())
        }
      )
  }
};

function sendEntryTime(user) {
    return dispatch => {
      // dispatch(request(user));
      userService.sendEntryTime(user);
    }
}
export const userActions = {
  login,
  logout,
  register,
  activation,
  checkToken,
  resetPassword,
  clearUserError,
  authPersonalInstagram,
  changeSettings,
  authInstagram,
  editInstagram,
  profileUpdate,
  changePassword,
  resetPasswordLink,
  checkUserSettings,
  resetPasswordValidate,
  getPlatformAuthLink,
  authInstagramSelect,
    sendEntryTime
};