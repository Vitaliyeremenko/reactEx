const handleError = (error) => {
  const { response } = error;
  const { data } = response;

  if (!_.isEmpty(data)) {
    return Promise.reject(data);
  }

  return Promise.reject(response.statusText);
};

export {
  handleError
};
