import { tasksConstants } from '../constants';

let tasks = JSON.parse(localStorage.getItem('tasks'));
let ownTasks = JSON.parse(localStorage.getItem('ownTasks'));

const initialState = {
    items: {
      data: []
    },
    ownTasks: {
      data: []
    },
    fetching: false,
    loadMoreFetching: false
  };

export function tasks(state = initialState || {}, action) {
  switch(action.type) {
    case tasksConstants.GET_ALL_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case tasksConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        items: {
          ...action.tasks
        }
      }
    case tasksConstants.LOAD_MORE_ALL_TASK:
      return {
        ...state,
        loadMoreFetching: true,
      }
    case tasksConstants.LOAD_MORE_ALL_TASK_SUCCESS:
      return {
        ...state,
        loadMoreFetching: false,
        items: {
          ...action.tasks,
          data: [
            ...state.items.data,
            ...action.tasks.data
          ]
        }
      }
    case tasksConstants.LOAD_MORE_ALL_TASK_FAILURE:
      return {
        ...state,
        loadMoreFetching: false
      }
    case tasksConstants.LOAD_MORE_OWN_TASK:
      return {
        ...state,
        loadMoreFetching: true
      }
    case tasksConstants.LOAD_MORE_OWN_TASK_FAILURE:
      return {
        ...state,
        loadMoreFetching: false,
      }
    case tasksConstants.LOAD_MORE_OWN_TASK_SUCCESS:
      return {
        ...state,
        loadMoreFetching: false,
        ownTasks:{
          ...action.ownTasks,
          data: [
            ...state.ownTasks.data,
            ...action.ownTasks.data
          ]
        }
      }
    case tasksConstants.GET_ALL_FAILURE:
      return {
        ...state,
        fetching: false
      }
    case tasksConstants.GET_OWN_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case tasksConstants.GET_OWN_SUCCESS:
      return {
        ...state,
        fetching: false,
        ownTasks: action.ownTasks
      }
    case tasksConstants.GET_OWN_FAILURE:
      return {
        ...state,
        fetching: false,
      }
    case tasksConstants.CREATE_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case tasksConstants.CREATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        ownTasks: [
          ...state.ownTasks,
          action.task,
        ]
      }
    case tasksConstants.CREATE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case tasksConstants.EDIT_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case tasksConstants.EDIT_SUCCESS:
      return {
        ...state,
        fetching: false,
        message: action.message
      }
    case tasksConstants.EDIT_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case tasksConstants.CHANGE_STATUS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case tasksConstants.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        fetching: false,
        ownTasks: _.map(state.ownTasks, (task, index) => {
          return _.isEqual(task.id, action.task.id) ? action.task : task;
        }),
      };
    case tasksConstants.CHANGE_STATUS_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
}