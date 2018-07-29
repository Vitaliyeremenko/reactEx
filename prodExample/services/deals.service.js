import { handleError } from '../helpers';

const bloggerCreate = (api_token, task_id) => {
  const requestOptions = {
    api_token,
    task_id,
  };

  return axios
    .post('/api/v1/deals/blogger/create', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        return data;
      }
    })
    .catch(handleError);
};

const bloggerGetDeals = (api_token, page, status) => {
  const requestOptions = {
    params: {
      api_token,
      page,
      status,
    },
  };

  return axios
    .get('/api/v1/deals/blogger/get/', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        return data;
      }

      return null;
    })
    .catch(handleError);
};

const bloggerCancelDeal = (api_token, id) => {
  const requestOptions = {
    api_token,
    id,
  };

  return axios
    .post('/api/v1/deals/blogger/cancel', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { deal } = data;

        if (deal) {
          return deal;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

const bloggerCheck = (api_token, id, result) => {
  const requestOptions = {
    api_token,
    id,
    result,
  };

  return axios
    .post('/api/v1/deals/blogger/check', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { deal } = data;

        if (deal) {
          return deal;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

const isMyDeal = (api_token, id) => {
  const requestOptions = {
    params: {
      api_token,
      id,
    },
  };

  return axios
    .get('/api/v1/deals/is-my-deal', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        return data;
      }

      return null;
    })
    .catch(handleError);
};

const advertiserCreate = (api_token, task_id, blogger_id) => {
  const requestOptions = {
    api_token,
    task_id,
    blogger_id,
  };

  return axios
    .post('/api/v1/deals/a10vertiser/create', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        console.log(data);
        return data;
      }

      return null;
    })
    .catch(handleError);
};

const advertiserGetDeals = (api_token, page, status) => {
  const requestOptions = {
    params: {
      api_token,
      page,
      status,
    },
  };

  return axios
    .get('/api/v1/deals/a10vertiser/get/', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        return data;
      }

      return null;
    })
    .catch(handleError);
};

const advertiserCancelDeal = (api_token, id) => {
  const requestOptions = {
    api_token,
    id,
  };

  return axios
    .post('/api/v1/deals/a10vertiser/cancel', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { deal } = data;

        if (deal) {
          return deal;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

const advertiserEditDealPrice = (api_token, id, price) => {
  const requestOptions = {
    api_token,
    id,
    price,
  };

  return axios
    .post('/api/v1/deals/a10vertiser/edit', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { deal } = data;

        if (deal) {
          return deal;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

const advertiserStartWorking = (api_token, id) => {
  const requestOptions = {
    api_token,
    id,
  };

  return axios
    .post('/api/v1/deals/a10vertiser/start-working', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { deal } = data;

        if (deal) {
          return deal;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

const advertiserCheck = (api_token, id, result) => {
  const requestOptions = {
    api_token,
    id,
    result,
  };

  return axios
    .post('/api/v1/deals/a10vertiser/check', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { deal } = data;

        if (deal) {
          return deal;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};
const advertiserConflict = (api_token, id) => {
  const requestOptions = {
    api_token,
    id,
  };

  return axios
    .post('/api/v1/deals/a10vertiser/conflict', requestOptions)
      .catch(handleError);
};


export const dealsService = {
  isMyDeal,
  bloggerCheck,
  bloggerCreate,
  advertiserCheck,
  bloggerGetDeals,
  advertiserCreate,
  bloggerCancelDeal,
  advertiserGetDeals,
  advertiserConflict,
  advertiserCancelDeal,
  advertiserStartWorking,
  advertiserEditDealPrice,
};
