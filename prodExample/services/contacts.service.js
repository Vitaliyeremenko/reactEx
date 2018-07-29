import axios from 'axios';

export const contactsService = {
  send
};

function send(message) {
  const requestOptions = {
    ...message
  };

  return axios.post('/api/v1/contact', requestOptions)
    .then(handleSuccessMessageResponse)
    .catch(handleFailureMessageResponse);
}

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
    return Promise.reject(data);
  }
  
  return Promise.reject(response.statusText);
}