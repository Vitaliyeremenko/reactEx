import { bloggersConstants } from '../constants';

let _bloggers = JSON.parse(localStorage.getItem('bloggers'));

const initialState = _bloggers ? _bloggers : {
  fetching: false,
  fetchingMore: false,
  data: [],
  currentPage: 0
};

const bloggers = (state = initialState, action) => {
  switch (action.type) {
    case bloggersConstants.SEARCH_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case bloggersConstants.LOAD_MORE_BLOGGERS:
      return {
        ...state,
        fetchingMore: true
      }
    case bloggersConstants.LOAD_MORE_BLOGGERS_SUCCESS:
      return {
        ...state,
        fetchingMore: false,
        ...action.bloggers,
        data: [...state.data, ...action.bloggers.data]
      }
    case bloggersConstants.LOAD_MORE_BLOGGERS_FAILURE:
      return {
        ...state,
        fetchingMore: false
      }
    case bloggersConstants.SEARCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.bloggers
      }
    case bloggersConstants.SEARCH_FAILURE:
      return {
        ...state,
        fetching: false,
      }
    default:
      return state;
  }
}

export {
  bloggers
}
