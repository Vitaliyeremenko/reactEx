import { bloggersConstants } from '../constants';
import { bloggersService } from '../services';
import { alertActions } from '../actions';

const search = (params, skipLocalStorage) => {
  const request = (params, skipLocalStorage) => {
    return {
      type: bloggersConstants.SEARCH_REQUEST,
      params
    }
  };

  const success = bloggers => {
    return {
      type: bloggersConstants.SEARCH_SUCCESS,
      bloggers
    }
  };

  const failure = error => {
    return {
      type: bloggersConstants.SEARCH_FAILURE,
      error
    }
  };

  return dispatch => {
    dispatch(request(params, skipLocalStorage));

    bloggersService.search(params, skipLocalStorage)
      .then(
        bloggers => {
          dispatch(success(bloggers))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}

const loadMore = (params, skipLocalStorage) => {
  const request = (params, skipLocalStorage) => {
    return {
      type: bloggersConstants.LOAD_MORE_BLOGGERS,
      params
    }
  };

  const success = bloggers => {
    return {
      type: bloggersConstants.LOAD_MORE_BLOGGERS_SUCCESS,
      bloggers
    }
  };

  const failure = error => {
    return {
      type: bloggersConstants.LOAD_MORE_BLOGGERS_FAILURE,
      error
    }
  };

  return dispatch => {
    dispatch(request(params, skipLocalStorage));

    bloggersService.loadMore(params, skipLocalStorage)
      .then(
        bloggers => {
          dispatch(success(bloggers))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
}

export const bloggersActions = {
  search,
  loadMore
}
