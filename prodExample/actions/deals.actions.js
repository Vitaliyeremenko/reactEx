import { dealsConstants, tasksConstants } from '../constants';
import { dealsService } from '../services';
import { alertActions } from '../actions';

/**
 * @argument {id} is deal id
 */

const bloggerCreate = (api_token, task_id) => {
  const request = (params = { api_token, task_id }) => ({
    type: dealsConstants.BLOGGER_CREATE_REQUEST,
    params,
  });

  const success = () => ({
    type: dealsConstants.BLOGGER_CREATE_SUCCESS,
  });

  const failure = err => ({
    type: dealsConstants.BLOGGER_CREATE_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request({ api_token, task_id }));

    dealsService.bloggerCreate(api_token, task_id)
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(alertActions.success('Предложения успешно отправлены!'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const bloggerGetDeals = (api_token, page, status) => {
    const request = (params = { api_token, page, status }) => ({
    type: dealsConstants.BLOGGER_GET_DEALS_REQUEST,
    params,
  });

  const success = bloggerDeals => ({
    type: page >= 2 ? dealsConstants.BLOGGER_GET_LOAD_MORE_DEALS_SUCCESS : dealsConstants.BLOGGER_GET_DEALS_SUCCESS,
    bloggerDeals,
  });

  const failure = error => ({
    type: dealsConstants.BLOGGER_GET_DEALS_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request({ api_token, page, status }));

    dealsService.bloggerGetDeals(api_token, page, status)
      .then(
        bloggerDeals => dispatch(success(bloggerDeals)),
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const bloggerCancelDeal = (api_token, id) => {
  const request = (params = { api_token, id }) => ({
    type: dealsConstants.BLOGGER_CANCEL_DEAL_REQUEST,
    params,
  });

  const success = deal => ({
    type: dealsConstants.BLOGGER_CANCEL_DEAL_SUCCESS,
    deal,
  });

  const failure = error => ({
    type: dealsConstants.BLOGGER_CANCEL_DEAL_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request({ api_token, id }));

    dealsService.bloggerCancelDeal(api_token, id)
      .then(
        (deal) => {
          dispatch(success(deal));
          dispatch(alertActions.success('Сделка успешно отменена.'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const bloggerCheck = (api_token, id, result) => {
  const request = (params = { api_token, id, result }) => ({
    type: dealsConstants.BLOGGER_CHECK_REQUEST,
    params,
  });

  const success = deal => ({
    type: dealsConstants.BLOGGER_CHECK_SUCCESS,
    deal,
  });

  const failure = err => ({
    type: dealsConstants.BLOGGER_CHECK_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request(api_token, id, result));

    dealsService.bloggerCheck(api_token, id, result)
      .then(
        (deal) => {
          dispatch(success(deal));
          dispatch(alertActions.success('Результат работы успешно отправлен на проверку'));
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};

const isMyDeal = (api_token, id) => {
  const request = (params = { api_token, id }) => ({
    type: dealsConstants.IS_MY_DEAL_REQUEST,
    params,
  });

  const success = () => ({
    type: dealsConstants.IS_MY_DEAL_SUCCESS,
  });

  const failure = () => ({
    type: dealsConstants.IS_MY_DEAL_FAILURE,
  });

  return (dispatch) => {
    dispatch(request({ api_token, id }));

    dealsService.isMyDeal(api_token, id)
      .then(
        message => dispatch(success(message)),
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const advertiserCreate = (api_token, task_id, blogger_id) => {
  const request = (params = { api_token, task_id, blogger_id }) => ({
    type: dealsConstants.ADVERTISER_CREATE_REQUEST,
    params,
  });

  const success = () => ({
    type: dealsConstants.ADVERTISER_CREATE_SUCCESS,
  });

  const failure = err => ({
    type: dealsConstants.ADVERTISER_CREATE_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request({ api_token, task_id, blogger_id }));

    dealsService.advertiserCreate(api_token, task_id, blogger_id)
      .then(
        (res) => {
          dispatch(success(res));
          dispatch(alertActions.success('Предложения успешно отправлены'));
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};

const advertiserGetDeals = (api_token, page, status) => {
  const request = (params = { api_token, page, status }) => ({
    type: dealsConstants.ADVERTISER_GET_DEALS_REQUEST,
    params,
  });

  const success = advertiserDeals => ({
    type: page >= 2 ? dealsConstants.ADVERTISER_GET_LOAD_MORE_DEALS_SUCCESS : dealsConstants.ADVERTISER_GET_DEALS_SUCCESS,
    advertiserDeals,
  });

  const failure = error => ({
    type: dealsConstants.ADVERTISER_GET_DEALS_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request({ api_token, page, status }));

    dealsService.advertiserGetDeals(api_token, page, status)
      .then(
        advertiserDeals => dispatch(success(advertiserDeals)),
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const advertiserCancelDeal = (api_token, id) => {
  const request = (params = { api_token, id }) => ({
    type: dealsConstants.ADVERTISER_CANCEL_DEAL_REQUEST,
    params,
  });

  const success = deal => ({
    type: dealsConstants.ADVERTISER_CANCEL_DEAL_SUCCESS,
    deal,
  });

  const failure = error => ({
    type: dealsConstants.ADVERTISER_CANCEL_DEAL_FAILURE,
    error,
  });

  return (dispatch) => {
    dispatch(request({ api_token, id }));

    dealsService.advertiserCancelDeal(api_token, id)
      .then(
        (deal) => {
          dispatch(success(deal));
          dispatch(alertActions.success('Сделка успешно отменена.'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
};

const advertiserEditDealPrice = (api_token, id, price) => {
  const request = (params = { api_token, id, price }) => ({
    type: dealsConstants.ADVERTISER_EDIT_DEAL_PRICE_REQUEST,
    params,
  });

  const success = deal => ({
    type: dealsConstants.ADVERTISER_EDIT_DEAL_PRICE_SUCCESS,
    deal,
  });

  const failure = err => ({
    type: dealsConstants.ADVERTISER_EDIT_DEAL_PRICE_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request({ api_token, id, price }));

    dealsService.advertiserEditDealPrice(api_token, id, price)
      .then(
        (deal) => {
          dispatch(success(deal));
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};

const advertiserStartWorking = (api_token, id) => {
  const request = (params = { api_token, id }) => ({
    type: dealsConstants.ADVERTISER_START_WORKING_REQUEST,
    params,
  });

  const success = deal => ({
    type: dealsConstants.ADVERTISER_START_WORKING_SUCCESS,
    deal,
  });

  const failure = err => ({
    type: dealsConstants.ADVERTISER_START_WORKING_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request(api_token, id));

    dealsService.advertiserStartWorking(api_token, id)
      .then(
        (deal) => {
          dispatch(success(deal));
          // dispatch(alertActions.success(''));
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};

const advertiserCheck = (api_token, id, result) => {
  const request = (params = { api_token, id, result }) => ({
    type: dealsConstants.ADVERTISER_CHECK_REQUEST,
    params,
  });

  const success = deal => ({
    type: dealsConstants.ADVERTISER_CHECK_SUCCESS,
    deal,
  });

  const failure = err => ({
    type: dealsConstants.ADVERTISER_CHECK_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request(api_token, id, result));

    dealsService.advertiserCheck(api_token, id, result)
      .then(
        (deal) => {
          dispatch(success(deal));

          if (result) {
            dispatch(alertActions.success('Сделка успешно завершена!'));
          } else {
            dispatch(alertActions.success('Сделка возвращена в работу!'));
          }
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};

const advertiserSetDealConflict = (api_token, id) => {
  const request = (params = { api_token, id }) => ({
    type: dealsConstants.ADVERTISER_SET_DEAL_CONFLICT,
    params,
  });

  const success = deal => ({
    type: dealsConstants.ADVERTISER_SET_DEAL_CONFLICT_SUCCESS,
    deal,
  });

  const failure = err => ({
    type: dealsConstants.ADVERTISER_SET_DEAL_CONFLICT_FAILURE,
    err,
  });

  return (dispatch) => {
    dispatch(request(api_token, id));

    dealsService.advertiserConflict(api_token, id)
      .then(
        (deal) => {
          dispatch(success(deal));
          dispatch(alertActions.success('Статус сделки упешно переведен в конфликт'));
        },
        (err) => {
          dispatch(failure(err));
          dispatch(alertActions.error(err));
        },
      );
  };
};


export const dealsActions = {
  isMyDeal,
  bloggerCheck,
  bloggerCreate,
  advertiserCheck,
  bloggerGetDeals,
  advertiserCreate,
  bloggerCancelDeal,
  advertiserGetDeals,
  advertiserCancelDeal,
  advertiserStartWorking,
  advertiserEditDealPrice,
  advertiserSetDealConflict,
};
