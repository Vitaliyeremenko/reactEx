function getAllCategories(api_token, isUseStorage) {
  const requestOptions = {
    params: {
      api_token
    }
  };

  let categories = JSON.parse(localStorage.getItem('categories'));

  if (!categories || isUseStorage) {
    return axios.get('/api/v1/platforms/categories', requestOptions)
    .then(res => {
      const { data } = res;
      const { categories } = data;

      if (categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
  
        return categories;
      }

      return data;
    })
    .catch(handleFailureMessageResponse);
  }

  return Promise.resolve(categories);
}

function getAllFormats(api_token, platform, isUseStorage) {
  const requestOptions = {
    params: {
      api_token,
      platform
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  }

  const formats = JSON.parse(localStorage.getItem(`${platform}_formats`));
  console.log(requestOptions.params);
  if (!formats || isUseStorage) {
    return axios.get('/api/v1/a10vertise/formats', requestOptions)
      .catch(handleFailureMessageResponse)
      .then(res => {
        const { data } = res;
        const { ad_formats } = data;
          console.log(formats,'inres');

        if (ad_formats) {
          localStorage.setItem(`${platform}_formats`, JSON.stringify(ad_formats));

          return ad_formats;
        }

        return data;
      })
  }

  return Promise.resolve(formats);
}

const getAllAdTypes = api_token => {
  const requestOptions = {
    params: {
      api_token
    }
  }

  const ad_types = JSON.parse(localStorage.getItem('ad_types'));

  if (!ad_types) {
    return axios.get('/api/v1/a10vertise/types', requestOptions)
    .then(res => {
      const { data } = res;

      if (data && data.ad_types) {
        localStorage.setItem('ad_types', JSON.stringify(data.ad_types));

        return data.ad_types;
      }
    })
    .catch(handleFailureMessageResponse)
  }

  return Promise.resolve(ad_types);
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
    return Promise.reject(data.message);
  }
  
  return Promise.reject(response.statusText);
}

export const platformService = {
  getAllCategories,
  getAllFormats,
  getAllAdTypes,
};