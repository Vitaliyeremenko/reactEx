import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AlertNotify } from '../../../components';
import { ClipLoader } from 'react-spinners';
import { userActions } from '../../../actions';
import renderHTML from 'react-render-html'

const platforms = [
  {
    name: 'instagram'
  }
]

class Platforms extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.parsePlatformStatus = this.parsePlatformStatus.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this.handleRefresh();
  }
  componentWillMount() {
    const { user, dispatch } = this.props;

    if (!_.isEmpty(user)) {
      const { api_token } = user;

      dispatch(userActions.checkToken(api_token));
    }
  }

  handleRefresh() {
    const { dispatch, user } = this.props;

    dispatch(userActions.profileUpdate(user.api_token));
  }

  parsePlatformStatus(status) {
    switch (status) {
      case 'reviewing':
        return {
          class: 'is-moderating',
          message: 'Площадка на модерации'
        };
      case 'approved':
        return {
          class: 'is-active',
          message: 'Площадка активна'
        }
      case 'rejected':
        return {
          class: 'is-blocked',
          message: 'Площадка неактивна'
        }
    }
  }

  render() {
    const { user, alert } = this.props;
    const { instagram } = user;
    
    return (
      <div className="platforms">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={6}>
              <div className="platforms__topbar">
                <h2 className="platforms-heading">Мои площадки:</h2>
                <FontAwesome name="refresh" className="platforms-btn-refresh" onClick={this.handleRefresh} />
              </div>
    
              {alert.message && <AlertNotify alert={alert} />}

              {user.fetching && <div className="loader">
                <ClipLoader width={100} />
              </div>}

                {instagram && !user.fetching && 
                  <div className="platforms__item">

                    <div className="platforms__item-header">
                      <div className="user-box">
                        <div className="user-box__avatar" style={{backgroundImage: `url(${instagram.profile_picture})`}}></div>
                        <div className="user-box__info">
                          <div className="user-box__user">
                            <FontAwesome name={instagram.platform.type} className={`user-box__user-social ${instagram.platform.type}`} />
                            <div className="user-box__user-name">
                              <a href={`//instagram.com/${instagram.username}`}>{instagram.username}</a>
                            </div>
                          </div>
                          <div className="views">
                            <span className="user-box__user-subscribers">Подписчики: <strong>{instagram.count_followed_by}</strong></span>
                          </div>
                          <div className={`user-box__user-status ${this.parsePlatformStatus(instagram.platform.status).class}`}>
                            {this.parsePlatformStatus(instagram.platform.status).message}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="platforms__item-body">
                      <div>
                        {instagram.platform.description && renderHTML(instagram.platform.description)}
                      </div>
                      <div className="formats">
                        <h3 className="formats-title">Доступные форматы рекламы</h3>

                        {instagram.platform && instagram.platform.ad_formats && instagram.platform.ad_formats.length ? <ul className="formats-list">
                          {instagram.platform.ad_formats.map((format, index) => (
                            <li className="formats-list__item" key={index}>
                              <span className="formats-list__item-label">{format.name}</span>
                              <span className={`formats-list__item-price text-green`}>{Number(format.pivot.price)}
                                <FontAwesome className="formats-list__item-icon" name="bolt"/>
                              </span>
                            </li>))
                          }
                          <li className="formats-list__item">
                            <span className="formats-list__item-label"><i>Комиссия за сделку:</i></span>
                            <span className="formats-list__item-price">15.00%</span>
                          </li>
                        </ul> : <ul className="formats-list">
                          <li className="formats-list__item">-</li>
                        </ul>}
                      </div>
                    </div>

                    <div className='platforms__item-bottom'>
                      <Link
                        to='/dashboard/platforms/edit/instagram'
                      >
                        <Button
                          color="success"
                          outline
                          size="sm"
                        >
                          {'Редактировать'}
                        </Button>
                      </Link>
                    </div>
                  </div>}

              {/* {items && items.map((item, index) => (
                <div className="platforms__item" key={index}>
                  <div className="platforms__item-header">

                    <div className="user-box">
                      <div className="user-box__avatar" style={{backgroundImage: `url(${item.avatar})`}}></div>
                      <div className="user-box__info">
                        <div className="user-box__user">
                          <FontAwesome name={item.social} className={`user-box__user-social ${item.social}`} />
                          <div className="user-box__user-name">
                            <a href={item.link}>{item.name}</a>
                          </div>
                        </div>
                        <div className="views">
                          <span className="user-box__user-subscribers">Подписчики: <strong>{item.subscribes}</strong></span>
                        </div>
                        <div className={`user-box__user-status ${item.status === 1 ? 'is-active' : 'is-blocked'}`}>
                          {item.status === 1 ? 'Площадка активна' : 'Площадка неактивна'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="platforms__item-body">
                    {item.body}
                    
                    <div className="formats">
                      <h3 className="formats-title">Доступные форматы рекламы</h3>
                      <ul className="formats-list">
                        {item.formats && item.formats.map((format, index) => (
                          <li className="formats-list__item" key={index}>
                            <span className="formats-list__item-label">{format.label}</span>
                            <span className={`formats-list__item-price text-green`}>{format.price}
                              <FontAwesome className="formats-list__item-icon" name="rub"/>
                            </span>
                          </li>
                        ))}
                        <li className="formats-list__item">
                          <span className="formats-list__item-label"><i>Комиссия за сделку:</i></span>
                          <span className="formats-list__item-price">15.00%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="platforms__item-bottom">
                    <Link
                      to={`/dashboard/platforms/details/${item.id}`}
                      className="btn btn-success"
                    >
                      Редактировать
                    </Link>
                  </div>
                </div>
              ))} */}
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
    alert
  }
}

const connectedPlatforms = connect(mapStateToProps)(Platforms);

export {
  connectedPlatforms as Platforms
}