import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
} from 'reactstrap';
import {
  ClipLoader
} from 'react-spinners';
import {
  userActions,
  alertActions,
} from '../../../../actions';
import { AlertNotify } from '../../../../components';

class PlatformInstagram extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { code } = queryString.parse(this.props.location.search);
    const {
      dispatch,
      user: {
        api_token,
      },
      user,
      alert,
    } = this.props;

    code && dispatch(userActions.authInstagramSelect(user, code));
  }

  handleClick(id) {
    const { dispatch, user } = this.props;

    dispatch(alertActions.clear());
    dispatch(userActions.authInstagram(user, id));
  }

  render() {
    const { alert, user } = this.props;
    const { fetching, pages } = user;

    const isNotEmptyPages = !_.isEmpty(pages);

    return (
      <div className="auth-instagram">
        <Container>
          <Row className="justify-content-center">
            <Col
              xs={12}
              md={10}
              xl={8}
            >
              {alert.message && <AlertNotify alert={alert} modal />}

              {fetching && <div className="text-center mt-4">
                <p>Подождите, идёт авторизация...</p>
                <div className="loader">
                  <ClipLoader width={100} />
                </div>
              </div>}

              {!fetching && <div className="auth-instagram-pages">
                {isNotEmptyPages && <div>
                  <h3 className="auth-instagram-heading">Добавить площадку</h3>
                  <p className="auth-instagram-text">
                    Выберите площадку, которую вы хотите добавить.
                  </p>
                </div>}
                {isNotEmptyPages && _.map(pages, (page, index) => {
                  const hasBusinessAccount = _.has(page, 'instagram_business_account');

                  if (hasBusinessAccount) {
                    const {
                      name,
                      picture,
                      instagram_business_account,
                    } = page;
                    const { id } = instagram_business_account;

                    return (
                      <div
                        key={index}
                        className="auth-instagram-page"
                      >
                        <div className="auth-instagram-page-info">
                          <img
                            className="avatar"
                            src={`${picture}`}
                            alt="page pic"
                          />
                          <span className="name">{name}</span>
                        </div>
                        <Button
                          color="success"
                          size="sm"
                          outline
                          onClick={() => this.handleClick(id)}
                        >
                          Добавить
                        </Button>
                      </div>
                    );
                  }

                  return null;
                })}

                {!isNotEmptyPages && _.isEmpty(alert) && <div className="my-4">
                  <p className="mt-3 mb-3">
                    Чтобы добавить площадку Instagram, вам необходимо иметь <a href="https://www.facebook.com/business/help/502981923235522">Instagram Business</a> аккаунт и пройти авторизацию через Facebook.
                  </p>
                  <span className="text-danger">К Вашему аккаунту не привязана страница Instagram</span>
                  <div className="w-100 my-2">
                    <Link to="/dashboard/platforms/add">
                      <Button
                        outline
                        color="success"
                        size="sm"
                      >
                        Назад
                      </Button>
                    </Link>
                  </div>
                </div>}
              </div>}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, alert } = state;

  return {
    user,
    alert,
  };
}

const connectedPlatformInstagram = connect(mapStateToProps)(PlatformInstagram);

export {
  connectedPlatformInstagram as PlatformInstagram,
};
