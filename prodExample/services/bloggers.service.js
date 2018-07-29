import axios from 'axios';

const search = (params = {}, skipLocalStorage = false) => {
  const requestOptions = {
    params
  };

  if (params) {
    localStorage.setItem('bloggersSearchParams', JSON.stringify(params));
  }

  const bloggers = JSON.parse(localStorage.getItem('bloggers'));

  if (!bloggers || skipLocalStorage) {
    return axios.get('/api/v1/bloggers/search', requestOptions)
    .then(res => {
      const { data } = res;

      if (data) {
        localStorage.setItem('bloggers', JSON.stringify(data))

        return data;
      }
    })
    .catch(err => {
      localStorage.removeItem('bloggers');
      return handleFailureMessageResponse(err);
    });
  }

  return Promise.resolve(bloggers);
}

const loadMore = (params = {}, skipLocalStorage = false) => {
  const requestOptions = {
    params: {
      ...JSON.stringify(localStorage.getItem('bloggersSearchParams')),
      ...params
    }
  };
    return axios.get('/api/v1/bloggers/search', requestOptions)
    .then(res => {
      const { data } = res;
        return data;
    })
    .catch(err => {
      return handleFailureMessageResponse(err);
    });
  }

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

export const bloggersService = {
  search,
  loadMore
};