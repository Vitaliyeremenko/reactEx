import { dealsConstants } from '../constants';

const initialState = {
  fetching: false,
  access: false,
  advertiserDeals: {
    data: []
  },
  bloggerDeals: {
    data: []
  }
};

const deals = (state = initialState, action) => {
  switch (action.type) {
    case dealsConstants.BLOGGER_CREATE_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.BLOGGER_CREATE_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.BLOGGER_CREATE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.BLOGGER_GET_DEALS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.BLOGGER_GET_DEALS_SUCCESS:
      return {
        ...state,
        fetching: false,
        bloggerDeals: {
          ...action.bloggerDeals,
        },
      };
    case dealsConstants.BLOGGER_GET_LOAD_MORE_DEALS_SUCCESS:
      return {
        ...state,
        fetching: false,
        bloggerDeals: {
          ...action.bloggerDeals,
          data: [
            ...state.bloggerDeals.data,
            ...action.bloggerDeals.data
          ]
        },
      };
    case dealsConstants.ADVERTISER_GET_LOAD_MORE_DEALS_SUCCESS:
      return {
        ...state,
        fetching: false,
        advertiserDeals: {
          ...action.advertiserDeals,
          data: [
            ...state.advertiserDeals.data,
            ...action.advertiserDeals.data
          ]
        },
      };
    case dealsConstants.BLOGGER_GET_DEALS_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.BLOGGER_CANCEL_DEAL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.BLOGGER_CANCEL_DEAL_SUCCESS:
      return {
        ...state,
        fetching: false,
        bloggerDeals: {
          ...state.bloggerDeals,
          data: _.map(state.bloggerDeals.data, (deal) => {
            return _.isEqual(deal.id, action.deal.id)
              ? {
                ...deal,
                ...action.deal,
              }
              : deal;
          }),
        },
      };
    case dealsConstants.BLOGGER_CANCEL_DEAL_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.BLOGGER_CHECK_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.BLOGGER_CHECK_SUCCESS:
      return {
        ...state,
        fetching: false,
        bloggerDeals: {
          ...state.bloggerDeals,
          data: _.map(state.bloggerDeals.data, (deal) => {
            return _.isEqual(deal.id, action.deal.id)
              ? {
                ...deal,
                ...action.deal,
              }
              : deal;
          }),
        },
      };
    case dealsConstants.BLOGGER_CHECK_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.IS_MY_DEAL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.IS_MY_DEAL_SUCCESS:
      return {
        ...state,
        fetching: false,
        access: true,
      };
    case dealsConstants.IS_MY_DEAL_FAILURE:
      return {
        ...state,
        fetching: false,
        access: false,
      };
    case dealsConstants.ADVERTISER_CREATE_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.ADVERTISER_CREATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        // RETURN SMTH
      };
    case dealsConstants.ADVERTISER_CREATE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.ADVERTISER_GET_DEALS_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.ADVERTISER_GET_DEALS_SUCCESS:
      return {
        ...state,
        fetching: false,
        advertiserDeals: {
          ...action.advertiserDeals,
        },
      };
    case dealsConstants.ADVERTISER_GET_DEALS_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.ADVERTISER_CANCEL_DEAL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.ADVERTISER_CANCEL_DEAL_SUCCESS:
      return {
        ...state,
        fetching: false,
        advertiserDeals: {
          ...state.advertiserDeals,
          data: _.map(state.advertiserDeals.data, (deal) => {
            return _.isEqual(deal.id, action.deal.id)
              ? {
                ...deal,
                ...action.deal,
              }
              : deal;
          }),
        },
      };
    case dealsConstants.ADVERTISER_CANCEL_DEAL_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.ADVERTISER_EDIT_DEAL_PRICE_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.ADVERTISER_EDIT_DEAL_PRICE_SUCCESS:
      return {
        ...state,
        fetching: false,
        advertiserDeals: {
          ...state.advertiserDeals,
          data: _.map(state.advertiserDeals.data, (deal) => {
            return _.isEqual(deal.id, action.deal.id)
              ? {
                ...deal,
                ...action.deal,
              }
              : deal;
          }),
        },
      };
    case dealsConstants.ADVERTISER_EDIT_DEAL_PRICE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.ADVERTISER_START_WORKING_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.ADVERTISER_START_WORKING_SUCCESS:
      return {
        ...state,
        fetching: false,
        advertiserDeals: {
          ...state.advertiserDeals,
          data: _.map(state.advertiserDeals.data, (deal) => {
            return _.isEqual(deal.id, action.deal.id)
              ? {
                ...deal,
                ...action.deal,
              }
              : deal;
          }),
        },
      };
    case dealsConstants.ADVERTISER_START_WORKING_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case dealsConstants.ADVERTISER_CHECK_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case dealsConstants.ADVERTISER_CHECK_SUCCESS:
      return {
        ...state,
        fetching: false,
        advertiserDeals: {
          ...state.advertiserDeals,
          data: _.map(state.advertiserDeals.data, (deal) => {
            return _.isEqual(deal.id, action.deal.id)
              ? {
                ...deal,
                ...action.deal,
              }
              : deal;
          }),
        },
      };
    case dealsConstants.ADVERTISER_CHECK_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default: return state;
  }
};

export {
  deals,
};
