import { tasksConstants } from '../constants';
import { tasksService } from '../services';
import { alertActions } from '../actions';
import { history } from '../helpers';

function getAll(api_token, isUseStorage) {
  return dispatch => {
    dispatch(request(api_token, isUseStorage))

    tasksService.getAll(api_token, isUseStorage)
      .then(
        tasks => {
          dispatch(success(tasks))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(api_token, isUseStorage) {
    return {
      type: tasksConstants.GET_ALL_REQUEST,
      params: {
        api_token,
        isUseStorage
      }
    }
  }
  function success(tasks) {
    return {
      type: tasksConstants.GET_ALL_SUCCESS,
      tasks,
    }
  }
  function failure(error) {
    return {
      type: tasksConstants.GET_ALL_FAILURE,
      error
    }
  }
}

const loadMoreAll = (api_token, page) => {
  const request = (api_token, page)=> {
    return {
      type: tasksConstants.LOAD_MORE_ALL_TASK,
      params: {
        api_token,
        page
      }
    }
  }
  const success = tasks => {
    return {
      type: tasksConstants.LOAD_MORE_ALL_TASK_SUCCESS,
      tasks,
    }
  }
  const failure = error => {
    return {
      type: tasksConstants.LOAD_MORE_ALL_TASK_FAILURE,
      error
    }
  }
  return dispatch => {
    dispatch(request(api_token, page))

    tasksService.loadMoreAll(api_token, page)
      .then(
        tasks => {
          dispatch(success(tasks))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}

const changeStatus = (api_token, id, status) => {
  const request = (params = { api_token, id, status }) => ({
    type: tasksConstants.CHANGE_STATUS_REQUEST,
    params,
  });

  const success = task => ({
    type: tasksConstants.CHANGE_STATUS_SUCCESS,
    task,
  });

  const failure = err => ({
    type: tasksConstants.CHANGE_STATUS_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request({ api_token, id, status }));

    tasksService.changeStatus(api_token, id, status)
      .then(
        (task) => {
          dispatch(success(task));
          dispatch(alertActions.success('Ваше задание отправлено на модерацию.'));
          setTimeout(() => {
            localStorage.removeItem('ownTasks');
            history.push('/dashboard/tasks/mytasks');
          }, 2000);
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};

const create = (params = {}) => {
  const request = params => ({
    type: tasksConstants.CREATE_REQUEST,
    params,
  });

  const success = task => ({
    type: tasksConstants.CREATE_SUCCESS,
    task,
  });

  const failure = error => ({
    type: tasksConstants.CREATE_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request(params));

    tasksService.create(params)
      .then(
        (task) => {
          const { api_token, status } = params;
          const { id } = task;

          dispatch(success(task));

          if (status) {
            dispatch(changeStatus(api_token, id, status));
          } else {
            dispatch(alertActions.success('Задание успешно сохранено.'));
            localStorage.removeItem('ownTasks');
            setTimeout(() => history.push('/dashboard/tasks/mytasks'), 2000);
          }
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const edit = (params = {}) => {
  const request = params => ({
    type: tasksConstants.EDIT_REQUEST,
    params
  });

  const success = message => ({
    type: tasksConstants.EDIT_SUCCESS,
    message,
  });

  const failure = error => ({
    type: tasksConstants.EDIT_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request(params));

    tasksService.edit(params)
      .then(
        (message) => {
          dispatch(success(message));
          // dispatch(alertActions.success(message));
          // localStorage.removeItem('ownTasks');
          history.push('/dashboard/tasks/mytasks');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const getOwn = (api_token, fromServer, status) => {
  const request = (params = { api_token, fromServer, status }) => ({
    type: tasksConstants.GET_OWN_REQUEST,
    params,
  });

  const success = ownTasks => ({
    type: tasksConstants.GET_OWN_SUCCESS,
    ownTasks
  })

  const failure = error => ({
    type: tasksConstants.GET_OWN_FAILURE,
    error
  })

  return (dispatch) => {
    dispatch(request({ api_token, fromServer, status }));

    tasksService.getOwn(api_token, fromServer, status)
      .then(
        ownTasks => {
          dispatch(success(ownTasks))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}
const loadMoreOwn = (api_token, page) => {
  const request = (params = { api_token, page }) => ({
    type: tasksConstants.LOAD_MORE_OWN_TASK,
    params,
  });

  const success = ownTasks => ({
    type: tasksConstants.LOAD_MORE_OWN_TASK_SUCCESS,
    ownTasks
  })

  const failure = error => ({
    type: tasksConstants.LOAD_MORE_OWN_TASK_FAILURE,
    error
  })

  return (dispatch) => {
    dispatch(request({ api_token, page }));

    tasksService.loadMoreOwn(api_token, page)
      .then(
        ownTasks => {
          dispatch(success(ownTasks))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}
export const tasksActions = {
  getAll,
  loadMoreAll,
  create,
  getOwn,
  loadMoreOwn,
  edit,
  changeStatus,
};
