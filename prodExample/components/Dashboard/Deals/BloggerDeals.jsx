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
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import renderHTML from 'react-render-html';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import { AlertNotify } from '../../../components';
import { Task } from '../Tasks';
import { dealsActions, alertActions } from '../../../actions';
import { parseDealStatus } from '../../../helpers';
import Modal from 'react-responsive-modal';

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

class BloggerDeals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      openModal: {
        id: false,
      },
      result: {},
      status: '',
      submitted: false,
    };

    this.getDeals = this.getDeals.bind(this);
    this.cancelDeal = this.cancelDeal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onResultChange = this.onResultChange.bind(this);
    this.onResultSubmit = this.onResultSubmit.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
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

  onResultChange(e) {
    const { value, name } = e.target;
    const { result } = this.state;

    this.setState({
      result: {
        ...result,
        [name]: value,
      },
    });
  }

  onResultSubmit(e, id) {
    e.preventDefault();

    const { dispatch, user } = this.props;
    const { api_token } = user;
    const { result } = this.state;

    if (result[`result-input-${id}`]) {
      dispatch(alertActions.clear());
      dispatch(dealsActions.bloggerCheck(api_token, id, result[`result-input-${id}`]));
    }
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
    dispatch(dealsActions.bloggerGetDeals(user.api_token, page, status));
  }

  cancelDeal(deal) {
    const { user, dispatch } = this.props;

    dispatch(alertActions.clear());
    dispatch(dealsActions.bloggerCancelDeal(user.api_token, deal.id));
    this.onCloseModal();
  }

  handleLoadMoreButton(){
    const { dispatch, user } = this.props;
    dispatch(dealsActions.bloggerGetDeals(user.api_token, this.props.deals.bloggerDeals.current_page + 1));
  }

  render() {
    const { deals, alert } = this.props;
    const { bloggerDeals, fetching } = deals;
    const { openModal, result, submitted } = this.state;

    const hasDeals = _.has(bloggerDeals, 'data') && !_.isEmpty(bloggerDeals.data);

    const noDealsComponent = (
      <div className="deals-card-empty">
        <Card>
          <CardBody>
            <h4 className="deals-card-empty-heading">У вас еще нет сделок</h4>
            <p className="deals-card-empty-text">Для совершения сделок, добавьте свои социальные площадки и ждите предложений от рекламодателей</p>
            <Link to="/dashboard/platforms/add">
              <Button
                size="sm"
                color="success"
                outline
              >
                {'Добавить площадку'}
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );

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

              {!bloggerDeals.data && fetching && <div className="loader"><ClipLoader width={100} /></div>}

              {hasDeals && _.map(bloggerDeals.data, (deal, index) => {
                const {
                  task,
                  id,
                  price,
                  status,
                } = deal;
                const {
                  title,
                  description,
                  ad_format,
                  ad_type,
                  platform,
                } = task;

                const { message } = parseDealStatus(status);

                const isWorkingStatus = status === 'working';
                const isRenderChatButton = status !== 'canceled' && status !== 'complete';
                const isRenderCancelButton = status !== 'canceled' && status !== 'complete';
                const isRenderFooter = isRenderChatButton || isRenderCancelButton;

                return (
                  <div className="deals-card" key={index}>
                    <Card>
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
                          <div className="deals-card-header-budget">
                            <span className="deals-card-header-budget-value">{Number(price)}</span>
                            <FontAwesome className="deals-card-header-budget-icon" name="bolt" />
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
                        {isWorkingStatus && <div className="deals-card-body-result">
                          <Form onSubmit={e => this.onResultSubmit(e, id)}>
                            <FormGroup>
                              <Label for={`result-input-${id}`}>Результат:</Label>
                              <Input
                                id={`result-input-${id}`}
                                value={result[`result-input-${id}`] || ''}
                                onChange={this.onResultChange}
                                name={`result-input-${id}`}
                                placeholder="Вставьте ссылку на результат работы"
                                required
                              />
                              <Button
                                color="success"
                                outline
                                type="submit"
                                size="sm"
                              >
                                Отправить
                              </Button>
                            </FormGroup>
                          </Form>
                        </div>}
                      </CardBody>
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
                            onClick={(e) => this.onOpenModal(e, id)}
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

              {bloggerDeals.data && fetching &&
                <div className="loader">
                  <ClipLoader width={100} />
                </div>
              }
              {
                !fetching && bloggerDeals && bloggerDeals.current_page !== bloggerDeals.last_page && <div className="bloggers-search-loadmore-container">
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


              {!fetching && !hasDeals && !submitted && noDealsComponent}

              {!fetching && !hasDeals && submitted && <div className="text-danger">
                Ничего не найдено.
              </div>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  deals: state.deals,
  alert: state.deals
});

const connectedBloggerDeals = connect(mapStateToProps)(BloggerDeals);

export {
  connectedBloggerDeals as BloggerDeals
};
