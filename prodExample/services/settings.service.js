import axios from 'axios'

const getSettings = api_token => {
  const requestOptions = {
    params: {
      api_token
    }
  }
  return axios.get('/api/v1/settings/get', requestOptions)
  .then(res => {
    const { data: { settings } } = res;

    if (settings) return settings;
  })
  .catch(err => {
    return handleFailureMessageResponse(err);
  });

  return Promise.resolve(bloggers);
}

export const settingsService = {
  getSettings
}