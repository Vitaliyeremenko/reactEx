import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  Form,
  Label,
  FormGroup,
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import renderHTML from 'react-render-html';
import FontAwesome from 'react-fontawesome';
import Modal from 'react-responsive-modal';
import classNames from 'classnames';
import { AlertNotify } from '../../../components';
import { dealsActions, alertActions } from '../../../actions';
import { parseDealStatus } from '../../../helpers';

const dealsStatuses = [
  {
    label: 'Все сделки',
    value: '',
  },
  {
    label: 'Запрошенные сделки',
    value: 'request',
  },
  {
    label: 'В работе',
    value: 'working',
  },
  {
    label: 'На проверке',
    value: 'checking',
  },
  {
    label: 'Завершенные',
    value: 'complete',
  },
  {
    label: 'Отмененные',
    value: 'canceled',
  },
];

class AdvertiserDeals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      openModal: {
        id: false,
      },
      openChangePrice: {
        id: false,
      },
      dealPrice: undefined,
      status: '',
      submitted: false,
    };

    this.getDeals = this.getDeals.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.openEditPrice = this.openEditPrice.bind(this);
    this.closeEditPrice = this.closeEditPrice.bind(this);
    this.submitPrice = this.submitPrice.bind(this);
    this.startWork = this.startWork.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onAcceptResult = this.onAcceptResult.bind(this);
    this.onRejectResult = this.onRejectResult.bind(this);
  }

  componentWillMount() {
    this.getDeals();
  }

  onOpenModal(e, id) {
    this.setState({
      openModal: {
        [id]: true,
      },
    });
  }

  onCloseModal(id) {
    this.setState({
      openModal: {
        [id]: false,
      },
    });
  }

  onAcceptResult(id) {
    const { dispatch, user} = this.props;
    const { api_token } = user;

    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserCheck(api_token, id, 1));
  }

  onRejectResult(id) {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserCheck(api_token, id, 0));
  }

  onStatusChange(status) {
    this.getDeals(status);

    this.setState({
      status,
    });
  }

  getDeals(status) {
    const { page } = this.state;
    const { user, dispatch } = this.props;

    this.setState({
      submitted: true,
    });

    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserGetDeals(user.api_token, page, status));
  }

  cancelDeal(deal) {
    const { user, dispatch } = this.props;

    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserCancelDeal(user.api_token, deal.id));
    this.onCloseModal();
  }

  openEditPrice(e, id) {
    this.setState({
      openChangePrice: {
        [id]: true,
      },
    });
  }

  closeEditPrice(e, id) {
    this.setState({
      openChangePrice: {
        [id]: false,
      },
    });
  }

  changePrice(e) {
    const { value } = e.target;

    this.setState({
      dealPrice: value,
    });
  }

  submitPrice(e, id) {
    e.preventDefault();
    const { user, dispatch } = this.props;
    const { dealPrice } = this.state;
    const { api_token } = user;

    this.closeEditPrice(id);
    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserEditDealPrice(api_token, id, dealPrice));
  }

  startWork(id) {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserStartWorking(api_token, id));
  }
  handleConflict(id) {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    dispatch(dealsActions.advertiserSetDealConflict(api_token, id));
  }
  handleLoadMoreButton(){
    const { dispatch, user } = this.props;

    dispatch(dealsActions.bloggerGetDeals(user.api_token, this.props.deals.advertiserDeals.current_page + 1));
  }

  handlePrice(fee, price) {
    let rez = price * (1 + fee / 100);
    return rez.toFixed(2);
  }

  render() {
    const { alert, deals, isAdvertiser, deal_fee } = this.props;
    let { advertiserDeals, bloggerDeals, fetching } = deals;
    const { openModal, openChangePrice, dealPrice, status, submitted } = this.state;
    const message = parseDealStatus(status);
    const hasDeals = _.has(advertiserDeals, 'data') && !_.isEmpty(advertiserDeals.data);

    return (
      <div className="deals">
        <div className="deals-filter">
          <h3>Статус сделки:</h3>
          <ul>
            {_.map(dealsStatuses, (status, index) => {
              const { label, value } = status;

              return (
                <li
                  key={index}
                  onClick={() => this.onStatusChange(value)}
                  className={classNames({ 'active': _.isEqual(this.state.status, value)})}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              sm={10}
              lg={8}
            >
              <h2 className="deals-heading">Мои сделки:</h2>

              {alert.message && <AlertNotify alert={alert} modal />}

              {!advertiserDeals.data && fetching &&
                <div className="loader">
                  <ClipLoader width={100} />
                </div>
              }
              { !fetching &&
                hasDeals &&
                  _.map(advertiserDeals.data, (deal, index) => {
                const {
                  task,
                  id,
                  price,
                  price_with_fee,
                  status,
                  blogger,
                  result,
                } = deal;
                const {
                  title,
                  description,
                  ad_format,
                  ad_type,
                  platform,
                } = task;

                const { message } = parseDealStatus(status);
                const isRequestStatus = status === 'request';
                const isCheckingStatus = status === 'checking';
                const isRenderChatButton = status !== 'canceled' && status !== 'complete';
                const isRenderCancelButton = status !== 'canceled' && status !== 'complete';
                const isRenderFooter = isRenderChatButton || isRenderCancelButton;

                return (
                  <div className="deals-card" key={index}>
                    <Card>
                      {_.has(blogger, platform) && platform === 'instagram' && <CardHeader>
                        <div className="deals-card-header">
                          <div className="deals-card-blogger-info">
                            <img
                              className="avatar"
                              src={blogger[platform].profile_picture}
                              alt="blogger avatar"
                            />
                            <div className="user">
                              <span className="name">{blogger[platform].username} {blogger.first_name ? `(${blogger.first_name})` : ''}</span>
                              <span className="followers">
                                <strong>Подписчики: </strong>
                                <span>{blogger[platform].count_followed_by}</span>
                              </span>
                              <Link to={`/dashboard/blogger/profile/${blogger.id}`}>
                                Посмотреть профиль
                              </Link>
                            </div>
                          </div>
                          <div className="deals-card-header-budget">
                            <span className="deals-card-header-budget-value">{Number(price)}</span>
                            <FontAwesome className="deals-card-header-budget-icon" name="bolt" />
                          </div>
                        </div>
                        <div className="deals-card-header-budget-value-with-fee">
                          <span>
                            C учётом комиссии {deal_fee}% цена составит {price_with_fee}
                            <FontAwesome className="deals-card-header-budget-icon" name="bolt" />
                          </span>
                        </div>
                      </CardHeader>}
                      <CardHeader>
                        <div className="deals-card-header">
                          <div className="deals-card-header-title">
                            <FontAwesome
                              className={`deals-card-header-title-icon ${platform}`}
                              name={`${platform}`}
                            />
                            <h5 className="deals-card-header-title-label">
                              {title}
                            </h5>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <div className="deals-card-body-description">
                          {renderHTML(description)}
                        </div>
                        <hr />
                        <div className="deals-card-body__ad-format">
                          <span className="deals-card-body__ad-format-label">Формат рекламы:</span>
                          <span className="deals-card-body__ad-format-value">{ad_format.name}</span>
                        </div>
                        <div className="deals-card-body__ad-type">
                          <span className="deals-card-body__ad-type-label">
                            Тип рекламы:
                          </span>
                          <span className="deals-card-body__ad-type-value">
                            {ad_type.name}
                          </span>
                        </div>
                        <hr />
                        <div className={`deals-card-body-status ${status}`}>
                          <strong>Статус сделки: </strong>
                          <span>{message || ''}</span>
                        </div>
                        {isRequestStatus && <div className="deals-card-body-edit-price">
                          <Form onSubmit={e => this.submitPrice(e, id)}>
                            <FormGroup>
                              {!openChangePrice[id] && <Label
                                for="price"
                                onClick={e => this.openEditPrice(e, id)}
                              >
                                <Button
                                  type="button"
                                  color="success"
                                  outline
                                  size="sm"
                                >
                                  Изменить стоимость
                                </Button>
                              </Label>}
                              {openChangePrice[id] && <label><Input
                                id="price"
                                type="number"
                                value={Number(dealPrice) || ''}
                                onChange={this.changePrice}
                                placeholder="Введите стоимость"
                              />
                              <span className="deals-card-body-edit-price-with-fee">
                              C учётом комиссии {deal_fee}% цена составит {dealPrice ? this.handlePrice(deal_fee, dealPrice) : 0}
                              <FontAwesome className="deals-card-header-budget-icon" name="bolt" /></span>
                              </label>
                              }                           
                            </FormGroup>
                            {openChangePrice[id] && <Button
                                className="mt-2 mb-2"
                                type="submit"
                                color="success"
                                outline
                                size="sm"
                              >Изменить</Button>}
                          </Form>
                        </div>}
                        {isRequestStatus && <div className="deals-card-body-startwork">
                          <Button
                            className="deals-card-body-startwork-btn"
                            color="success"
                            size="sm"
                            onClick={() => this.startWork(id)}
                            outline
                          >
                            Начать работу
                          </Button>
                        </div>}
                        {
                          isAdvertiser && (message === 'В работе' || message === 'На проверке')
                            && <Button
                              className="deals-card-body-startwork deals-card-body-conflict-btn"
                              color="danger"
                              size="sm"
                              onClick={() => this.handleConflict(id)}
                              outline
                            >
                              { message === 'В работе' ? 'Конфликт' : 'Пожаловаться'}
                            </Button>
                        }
                      </CardBody>
                      {isCheckingStatus && <CardFooter>
                        <div className="deals-card-footer-result">
                          <h6>Результат работы:</h6>
                          {result && <div className="mb-3">
                            <a href={`${String(result)}`}>Ссылка</a>
                          </div>}
                          <div className="deals-card-footer-result-btns">
                            <Button
                              className="mr-2 mt-2"
                              color="success"
                              outline
                              onClick={() => this.onAcceptResult(id)}
                              type="submit"
                              size="sm"
                            >
                              Завершить сделку
                            </Button>
                            <Button
                              className="mt-2"
                              color="danger"
                              outline
                              onClick={() => this.onRejectResult(id)}
                              type="submit"
                              size="sm"
                            >
                              Отклонить результат
                            </Button>
                          </div>
                        </div>
                      </CardFooter>}
                      {isRenderFooter && <CardFooter>
                        <div className="deals-card-footer">
                          {isRenderChatButton && <Link
                            to={`/dashboard/chat/${id}`}
                          >
                            <Button
                              className="deals-card-footer-chat"
                              color="info"
                              outline
                              size="sm"
                            >
                              {'Перейти в чат'}
                            </Button>
                          </Link>}
                          
                          {isRenderCancelButton && <Button
                            className="deals-card-footer-cancel"
                            color="danger"
                            outline
                            size="sm"
                            onClick={e => this.onOpenModal(e, id)}
                          >
                            Отказаться
                          </Button>}
                        </div>
                      </CardFooter>}
                    </Card>
                    <Modal
                      open={openModal[id] || false}
                      onClose={() => this.onCloseModal(id)}
                      little
                    >
                      <div className="modal-inner">
                        <h5 className="modal-inner-heading">Вы уверены, что хотите отменить сделку?</h5>
                        <Button
                          className="modal-inner-btn"
                          color="success"
                          onClick={() => this.cancelDeal(deal)}
                        >
                          Да
                        </Button>
                      </div>
                    </Modal>
                  </div>
                );
              })}
               {advertiserDeals.data && fetching &&
                <div className="loader">
                  <ClipLoader width={100} />
                </div>
              }
              {
                !fetching && advertiserDeals && advertiserDeals.current_page !== advertiserDeals.last_page && <div className="bloggers-search-loadmore-container">
                  <Button
                    color="success"
                    onClick={() => this.handleLoadMoreButton()}
                    outline
                    size="sm"
                  >
                    Показать больше
                  </Button>
                </div>
              }

              {!fetching && !hasDeals && submitted && <div className="text-danger">
                Ничего не найдено.
              </div>}

              {!fetching && !hasDeals && !submitted &&
                <div className="deals-card-empty">
                  <Card>
                    <CardBody>
                      <h4 className="deals-card-empty-heading">У вас еще нет сделок</h4>
                      <p className="deals-card-empty-text">Чтобы совершить сделку добавьте задание и предложите его исполнителю.</p>
                      <Link to="/dashboard/tasks/create">
                        <Button
                          size="sm"
                          color="success"
                          outline
                        >
                          {'Добавить задание'}
                        </Button>
                      </Link>
                    </CardBody>
                  </Card>
                </div>}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  deal_fee: Number(state.settings.deal_fee) * 100,
  deals: state.deals,
  alert: state.alert,
  isAdvertiser: state._interface.type === 'advertiser',
});

const connectedAdvertiserDeals = connect(mapStateToProps)(AdvertiserDeals);

export {
  connectedAdvertiserDeals as AdvertiserDeals
};
