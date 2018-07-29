import { history, handleError } from '../helpers';
import axios from 'axios';

function login(email, password) {
  const requestOptions = {
    email,
    password
  };

  return axios.post('/api/v1/login', requestOptions)
    .then(res => {
      const {
        data
      } = res;
      const {
        user
      } = data;

      if (user) {
        return user;
      }

      return data;
    })
    .catch(handleError);
}

function logout() {
  // remove user from local storage to log user out
  // localStorage.removeItem('user');

  // remove all data from LS to log user out
  localStorage.clear();
  history.push('/login');
}

function register(email, role) {
  const requestOptions = {
    email,
    role
  };

  return axios.post('/api/v1/registration', requestOptions).then(handleSuccessMessageResponse).catch(handleError)
}

function activation(email, token) {
  const requestOptions = {
    email,
    token
  };

  return axios.post('/api/v1/registration/confirm', requestOptions).then(handleSuccessMessageResponse).catch(handleError)
}

function changeSettings(user) {

    let requestOptions = new FormData();

    for (let prop in user) {
        requestOptions.append(prop, user[prop])
    }

  return axios.post('/api/v1/user/edit', requestOptions,{
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
    .then(res => {
      const { data } = res;

      if (data && data.user) {

        return {
          ...user,
          ...data.user,
        };
      }

      return data;
    })
    .catch(handleFailureMessageResponse)
}

function changePassword(passwords, user) {
  const { api_token } = user;

  const requestOptions = {
    ...passwords,
    api_token
  }

  return axios.post('/api/v1/user/security', requestOptions)
    .then(res => {
      const { data } = res;
      const { message } = data;
      
      if (message) {
        return {
          user,
          message
        }
      }

      return data;
    })
    .catch(handleFailureMessageResponse)
}

function resetPasswordLink(email) {
  const requestOptions = {
    email
  }

  return axios.post('/api/v1/send/password/reset/link', requestOptions).then(handleSuccessMessageResponse).catch(handleFailureMessageResponse)
}

function resetPasswordValidate(token) {
  const requestOptions = {
    token
  }

  return axios.post('/api/v1/validate/password/reset', requestOptions).then(handleSuccessMessageResponse).catch(handleFailureMessageResponse)
}

function resetPassword(password, token) {
  const requestOptions = {
    password,
    token
  }

  return axios.post('/api/v1/password/reset', requestOptions).then(handleSuccessMessageResponse).catch(handleFailureMessageResponse)
}

function getPlatformAuthLink(name, api_token) {
  const requestOptions = {
    params: {
      name,
      api_token
    }
  }
  if (name === 'instagram_personal') {
    axios.get('/api/v1/platforms/instagram/auth/personal', { api_token })
    .then(handleSuccessMessageResponse)
    .catch(handleFailureMessageResponse)
  }
  return axios.get('/api/v1/platforms/auth-link', requestOptions)
    .then(handleSuccessMessageResponse)
    .catch(handleFailureMessageResponse)
}

const authPersonalInstagram = (user, api_token, access_token) => {

  const requestOptions = {
    api_token,
    access_token,
  }

  return axios.post('/api/v1/platforms/instagram/auth/personal', requestOptions)
    .then(res => {
      const { data } = res;
      const { instagram } = data;
      
      if (instagram) {
        return {
          ...user,
          instagram
        }
      }

      return data;
    })
    .catch(handleFailureMessageResponse)
}

function authInstagram(user, instagram_business_account_id) {
  const { api_token } = user;

  const requestOptions = {
    api_token,
    instagram_business_account_id,
  }

  return axios.post('/api/v1/platforms/instagram/auth/business', requestOptions)
    .then(res => {
      const { data } = res;
      const { instagram } = data;
      
      if (instagram) {
        return {
          ...user,
          instagram
        }
      }

      return data;
    })
    .catch(handleFailureMessageResponse)
}

const authInstagramSelect = (user, code) => {
  const { api_token } = user;
  const requestOptions = {
    api_token,
    code,
  };

  return axios.post('/api/v1/platforms/instagram/auth/business/select-page', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { pages } = data;

        if (pages) {
          return pages;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

function editInstagram(user, settings) {
  const { api_token } = user;
  const { categories } = settings;

  const requestOptions = {
    api_token,
    ...settings
  }

  return axios.post('/api/v1/platforms/instagram/edit', requestOptions)
    .then(res => {
      const { data } = res;
      const { platform } = data;

      if (platform) {
        return {
          ...user,
          instagram: {
            ...user.instagram,
            platform
          }
        }
      }

      return data;
    })
    .catch(handleFailureMessageResponse);
}

function profileUpdate(api_token) {
  const requestOptions = {
    params: {
      api_token
    }
  }

  return axios.get('/api/v1/user/profile', requestOptions)
    .then(res => {
      const { data } = res;
      const { user } = data;

      if (user) {
        return {
          ...user,
          api_token
        }
      }

      return data;
    })
    .catch(handleFailureMessageResponse)
}

const checkToken = (api_token) => {
  const requestOptions = {
    params: {
      api_token
    }
  };

  return axios.get('/api/v1/user/profile', requestOptions).then(res => res).catch(handleError);
};

// handlers
function handleSuccessMessageResponse(res) {
  const { data } = res;

  if (data.message) {
    return data.message;
  }

  return data;
}

function handleFailureMessageResponse(err) {
  const { response } = err;
  const { data } = response;

  if (data) {
    return Promise.reject(data.message);
  }
  
  return Promise.reject(response.statusText);
}

function sendEntryTime(user) {
    const { id } = user;

    axios.post('/api/v1/user/enter', {
        user_id: id
    })
        .then(res => {
            const { data } = res;
        })
}

export const userService = {
  login,
  logout,
  register,
  activation,
  changeSettings,
  changePassword,
  resetPasswordLink,
  resetPasswordValidate,
  authPersonalInstagram,
  resetPassword,
  getPlatformAuthLink,
  authInstagram,
  authInstagramSelect,
  editInstagram,
  profileUpdate,
  checkToken,
  sendEntryTime,
};

// function getAll() {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   };

//   return fetch('/users', requestOptions).then(handleResponse);
// }

// function getById(id) {
//   const requestOptions = {
//     method: 'GET',
//     headers: authHeader()
//   };

//   return fetch('/users/' + _id, requestOptions).then(handleResponse);
// }

// function update(user) {
//   const requestOptions = {
//     method: 'PUT',
//     headers: { ...authHeader(),
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   };

//   return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authHeader()
//   };

//   return fetch('/users/' + id, requestOptions).then(handleResponse);;
// }