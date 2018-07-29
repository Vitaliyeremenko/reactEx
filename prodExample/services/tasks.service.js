import { handleError } from '../helpers';

function getAll(api_token, isUseStorage) {
  const requestOptions = {
    params: {
      api_token,
    }
  }

  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (!tasks || isUseStorage) {
    return axios.get('/api/v1/tasks/', requestOptions).then(res => {
      const { data } = res;
  
      if (data) {
        localStorage.setItem('tasks', JSON.stringify(data));
  
        return data;
      }
  
      return data;
  
    }).catch(handleFailureMessageResponse);
  }

  return Promise.resolve(tasks);
}

const loadMoreAll = (api_token, page) => {
  const requestOptions = {
    params: {
      api_token,
      page
    }
  }

  return axios.get('/api/v1/tasks/', requestOptions).then(res => {
    const { data } = res;

    return data;

  }).catch(handleFailureMessageResponse);

  return Promise.resolve(tasks);
}


const create = (params = {}) => {
  const requestOptions = {
    ...params,
  };

  return axios.post('/api/v1/tasks/create', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { task } = data;

        if (task) {
          return task;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
};

const edit = (params = {}) => {
  const requestOptions = {
    ...params
  }

  return axios.post('/api/v1/tasks/edit', requestOptions)
    .then(handleSuccessMessageResponse)
    .catch(handleFailureMessageResponse)
}

const getOwn = (api_token, fromServer = false, status) => {
  const requestOptions = {
    params: {
      api_token,
      status
    },
  };

  const ownTasks = JSON.parse(localStorage.getItem('ownTasks'))

  if (!ownTasks || fromServer) {
    return axios.get('/api/v1/tasks/own', requestOptions)
      .then(res => {
        const { data } = res;

        if (data && data.tasks) {
          const { tasks } = data;

          if (!status) {
            localStorage.setItem('ownTasks', JSON.stringify(tasks))
          }

          return tasks;
        }
      })
      .catch(handleFailureMessageResponse)
  }

  return Promise.resolve(ownTasks)
}

const loadMoreOwn = (api_token, page) => {
  const requestOptions = {
    params: {
      api_token,
      page,
    },
  };

  return axios.get('/api/v1/tasks/own', requestOptions)
    .then(res => {
      const { data } = res;

      if (data && data.tasks) {
        const { tasks } = data;

        return tasks;
      }
    })
    .catch(handleFailureMessageResponse)

  return Promise.resolve(ownTasks)
}

const changeStatus = (api_token, id, status) => {
  const requestOptions = {
    api_token,
    id,
    status,
  };

  return axios.post('/api/v1/tasks/change-status', requestOptions)
    .then((res) => {
      const { data } = res;

      if (data) {
        const { task } = data;

        if (task) {
          return task;
        }

        return data;
      }

      return null;
    })
    .catch(handleError);
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
    return Promise.reject(data);
  }
  
  return Promise.reject(response.statusText);
}

export const tasksService = {
  getAll,
  loadMoreAll,
  getOwn,
  loadMoreOwn,
  create,
  edit,
  changeStatus,
}