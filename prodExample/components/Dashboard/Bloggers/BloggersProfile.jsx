import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
  Badge,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import FontAwesome from 'react-fontawesome';
import ReactStars from 'react-stars';
import Modal from 'react-responsive-modal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classNames from 'classnames';
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { declension, history } from '../../../helpers';
import { TooltipInfo, AlertNotify } from '../../../components';
import {
  tasksActions,
  dealsActions,
  alertActions,
} from '../../../actions';
import BloggersPost from "./BloggersPost";

const COLORS = [
  '#fd79a8',
  '#0984e3',
  '#00b894',
  '#e17055',
  '#6c5ce7',
  '#fdcb6e',
  '#55efc4',
  '#ffa502',
  '#a4b0be',
];

class BloggersProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      activeTab: '1',
      postsCount: 8,
    };

    this.onBloggerInvite = this.onBloggerInvite.bind(this);
    this.renderInstagramProfile = this.renderInstagramProfile.bind(this);
    this.handleInviteClick = this.handleInviteClick.bind(this);
    // this.redirectToSocial = this.redirectToSocial.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onTabToggle = this.onTabToggle.bind(this);
  }

  handleInviteClick(e) {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    dispatch(tasksActions.getOwn(api_token, true, 'approved'));
    this.openModal();
  }

  openModal() {
    this.setState({
      openModal: true,
    });
  }

  closeModal() {
    this.setState({
      openModal: false,
    });
  }

  onBloggerInvite(taskId) {
    const { dispatch, user, blogger } = this.props;
    const { api_token } = user;

    this.closeModal();
    dispatch(alertActions.clear());
    dispatch(dealsActions.advertiserCreate(api_token, taskId, blogger.id));
  }

  onTabToggle(tab) {
    const { activeTab } = this.state;

    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  renderInstagramProfile(blogger) {
    const { openModal, activeTab } = this.state;
    const { tasks, alert } = this.props;
    const { ownTasks } = tasks;
    const {
      instagram,
      first_name,
      country_ru,
      city_ru,
      age,
      rating,
    } = blogger;
    const {
      profile_picture,
      count_followed_by,
      reach,
      media,
      engagement,
      deal_price,
      audience_age,
      audience_gender,
      audience_country,
      count_media,
    } = instagram;

    let newEngagement = engagement * 100;
    newEngagement = newEngagement.toFixed(2);

    return (
      <div className="bloggers-profile">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <div className="bloggers-profile__info">
                <Row className="justify-content-center align-items-center">
                  <Col
                    xs={12}
                    lg={6}
                  >
                    <div className="d-flex align-items-center px-4">
                      <div className="bloggers-profile__info-avatar">
                        <img
                          alt="profile picture"
                          className="img-thumbnail"
                          src={String(profile_picture)}
                        />
                      </div>
                      <div>
                        <div className="bloggers-profile__info-name">
                          {first_name || ''}
                        </div>
                        <div className="bloggers-profile__info-location">
                          <span>
                            {country_ru ? `${country_ru}, ` : ''}
                          </span>
                          <span>{city_ru || ''}</span>
                        </div>
                        <div className="bloggers-profile__info-age">
                          {declension(age, ['год', 'года', 'лет'])}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} lg={6}>
                    <div className="bloggers-profile__info-rating mx-4">
                      <span>Общий рейтинг</span>
                      <Row>
                        <Col xs={12}>
                          <ReactStars
                            className="bloggers-profile__info-rating-stars"
                            color1="#ecf0f1"
                            color2="#00b41c"
                            count={5}
                            edit={false}
                            size={32}
                            value={rating}
                            // onChange={ratingChanged}
                          />
                          <Button
                            className="bloggers-profile__info-btn-invite"
                            color="success"
                            onClick={this.handleInviteClick}
                            outline
                            size="sm"
                          >
                            {'Пригласить к сотрудничеству'}
                          </Button>
                          <div className="bloggers-profile__info-tokens">
                            <FontAwesome name="bolt" />
                            <span className="ml-1">{deal_price}</span>
                            <TooltipInfo
                              info="Токены - это внутренняя валюта платформы. Купите токены, чтобы пригласить блогера к сотрудничеству."
                              placement="bottom"
                              uniqueKey="tokens"
                              theme="green"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <Container className="bloggers-profile__analytics">
                      <Row className="bloggers-profile__analytics-instagram-header">
                        <Col xs={12} md={6}>
                          <FontAwesome
                            className="icon-instagram"
                            name="instagram"
                          />
                          <a
                            className="bloggers-profile-link"
                            href="javascript:void(0)"
                            // onClick={e =>
                            //   this.redirectToSocial(e, 'instagram')
                            // }
                          >
                            {'Instagram'}
                            <TooltipInfo
                              info="Мы откроем все контакты и ссылки на аккаунты блогера, когда он примет ваше приглашение к сотрудничеству."
                              placement="bottom"
                              theme="white"
                              uniqueKey="wewillopenlink"
                            />
                          </a>
                        </Col>
                        <Col
                          className="text-left mt-3 mt-md-0 text-md-right"
                          xs={12}
                          md={6}
                        >
                          <div className="bloggers-profile__analytics-instagram-followers">
                            <span>{reach}</span>
                            <TooltipInfo
                              info="Количество доступных подписчиков блогера"
                              placement="bottom"
                              theme="white"
                              uniqueKey="followers"
                            />
                          </div>
                          <div>
                            {'Охват качественной '}
                            <span className="linebreak">
                              {'аудитории'}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col xs={12}>
                    <div className="bloggers-profile__analytics-instagram-content">
                      <Nav tabs className="justify-content-between">
                        <NavItem
                          className={classNames({ active: activeTab === '1' })}
                          onClick={() => { this.onTabToggle('1'); }}
                        >
                          <div className="nav-item__inner">
                            <FontAwesome className="nav-item__inner-icon" name="users" />
                            <div className="nav-item__inner-info">
                              <strong className="nav-item__inner-info-value">{count_followed_by}</strong>
                              <span className="nav-item__inner-info-label">Подписчиков <TooltipInfo
                                info="Общее число подписчиков блогера в Instagram"
                                placement="bottom"
                                uniqueKey="countfollowedby"
                              />
                              </span>
                            </div>
                          </div>
                        </NavItem>
                        <NavItem
                          className={classNames({ active: activeTab === '2' })}
                          onClick={() => { this.onTabToggle('2'); }}
                        >
                          <div className="nav-item__inner">
                            <FontAwesome className="nav-item__inner-icon" name="instagram" />
                            <div className="nav-item__inner-info">
                              <strong className="nav-item__inner-info-value">{count_media}</strong>
                              <span className="nav-item__inner-info-label">Публикаций <TooltipInfo
                                info="Общее количество постов блогера в Instagram"
                                placement="bottom"
                                uniqueKey="countposts"
                              />
                              </span>
                            </div>
                          </div>
                        </NavItem>
                        <NavItem
                          className={classNames({ active: activeTab === '3' })}
                          onClick={() => { this.onTabToggle('3'); }}
                        >
                          <div className="nav-item__inner">
                            <FontAwesome className="nav-item__inner-icon" name="fire" />
                            <div className="nav-item__inner-info">
                              <strong className="nav-item__inner-info-value">{newEngagement}%</strong>
                              <span className="nav-item__inner-info-label">Вовлеченность <TooltipInfo
                                info="Процент лайков и комментариев по отношению к общему числу подписчиков блогера в Instagram"
                                placement="bottom"
                                uniqueKey="hint"
                              />
                              </span>
                            </div>
                          </div>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Container>
                            <Row>
                              <Col xs={12} lg={4}>
                                <div className="graphic">
                                  <h6 className="graphic-title">Возраст: <TooltipInfo
                                    info="Распределение аудитории блогера по возрасту"
                                    placement="bottom"
                                    uniqueKey="audience_age"
                                  /></h6>
                                  <div className="graphic-body">
                                    {audience_age ? <ResponsiveContainer
                                      debounce={200}
                                      width="100%"
                                      height={280}
                                    >
                                      <PieChart>
                                        <Pie
                                          isAnimationActive
                                          data={_.map(audience_age, (item, index) => {
                                            const { name, value } = item;

                                            return {
                                              name,
                                              value: _.round(value * 100),
                                              fill: COLORS[index],
                                            };
                                          })}
                                          dataKey="value"
                                          outerRadius="75%"
                                          innerRadius="50%"
                                          fill="#8884d8"
                                        />
                                        <Tooltip formatter={value => `${value}%`} />
                                        <Legend height={80} wrapperStyle={{ bottom: 0, right: 0, left: 0, width: 'auto' }} />
                                      </PieChart>
                                    </ResponsiveContainer> : <small>График недоступен.</small>}
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12} lg={4}>
                                <div className="graphic">
                                  <h6 className="graphic-title">Пол: <TooltipInfo
                                    info="Распределение аудитории блогера по полу"
                                    placement="bottom"
                                    uniqueKey="audience_gender"
                                  /></h6>
                                  <div className="graphic-body">
                                    {audience_gender ? <ResponsiveContainer
                                      debounce={200}
                                      width="100%"
                                      height={280}
                                    >
                                      <PieChart>
                                        <Pie
                                          isAnimationActive
                                          data={_.map(audience_gender, (item, index) => {
                                            const { name, value } = item;

                                            return {
                                              name,
                                              value: _.round(value * 100),
                                              fill: COLORS[index],
                                            };
                                          })}
                                          dataKey="value"
                                          fill="#8884d8"
                                          outerRadius="75%"
                                          innerRadius="50%"
                                        />
                                        <Tooltip
                                          formatter={value => `${value}%`}
                                        />
                                        <Legend height={80} wrapperStyle={{ bottom: 0, right: 0, left: 0, width: 'auto' }} />
                                      </PieChart>
                                    </ResponsiveContainer> : <small>График недоступен.</small>}
                                  </div>
                                </div>
                              </Col>
                              <Col xs={12} lg={4}>
                                <div className="graphic">
                                  <h6 className="graphic-title">Страны: <TooltipInfo
                                    info="Распределение аудитории блогера по странам"
                                    placement="bottom"
                                    uniqueKey="audience_country"
                                  /></h6>
                                  <div className="graphic-body">
                                    {audience_country ? <ResponsiveContainer
                                      debounce={200}
                                      width="100%"
                                      height={280}
                                    >
                                      <PieChart>
                                        <Pie
                                          isAnimationActive
                                          data={_.map(audience_country, (item, index) => {
                                            const { name, value } = item;

                                            return {
                                              name,
                                              value: _.round(value * 100),
                                              fill: COLORS[index],
                                            };
                                          })}
                                          dataKey="value"
                                          fill="#8884d8"
                                          outerRadius="75%"
                                          innerRadius="50%"
                                        />
                                        <Tooltip
                                          formatter={value => `${value}%`}
                                        />
                                        <Legend height={80} wrapperStyle={{ bottom: 0, right: 0, left: 0, width: 'auto' }} />
                                      </PieChart>
                                    </ResponsiveContainer> : <small>График недоступен.</small>}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            {
                              media.length !== 0 && <Row className="user-net-previews">
                                <Col xs={12}>
                                  <div className="user-net-previews-title">
                                    Последние публикации
                                  </div>
                                </Col>
                                {
                                  media.filter((item, index) => index <= this.state.postsCount).map((item, index) => <Col key={index} xs={12} md={6} lg={4}>
                                    <BloggersPost post={item} />
                                  </Col>)
                                }
                                <Col xs={12}>
                                  { (media.length - 1) > this.state.postsCount &&
                                    <div className="bloggers-search-loadmore-container">
                                      <Button
                                        className=""
                                        color="success"
                                        onClick={() => this.setState({ postsCount: this.state.postsCount + 6 })}
                                        outline
                                        size="sm"
                                      >
                                        Показать больше
                                      </Button>
                                    </div>
                                  }
                                </Col>
                              </Row>
                            }
                          </Container>
                        </TabPane>
                        <TabPane tabId="2">
                          <Container>
                            <Row>
                              <Col xs={12}>
                              {/* <strong>Н/Д</strong> */}
                              {/* <ResponsiveContainer width={'100%'} height={300}>
                                <LineChart data={[
                                  {name: '19-03-2018', uv: 4000, pv: 2400, amt: 2400},
                                  {name: '19-03-2018', uv: 3000, pv: 1398, amt: 2210},
                                  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                                  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                                  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                                  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                                  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
                                ]} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                  <XAxis dataKey="name"/>
                                  <YAxis/>
                                  <CartesianGrid />
                                  <Tooltip/>
                                  <Legend />
                                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                              </ResponsiveContainer> */}
                              </Col>
                            </Row>
                          </Container>
                        </TabPane>
                      </TabContent>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal onClose={this.closeModal} open={openModal} little>
          {tasks.fetching && (
            <div className="loader">
              <ClipLoader width={100} />
            </div>
          )}
          {!tasks.fetching &&
            !_.isEmpty(ownTasks.data) && (
              <div className="modal-inner">
                <h5>Выберите задание </h5>
                <p>
                  Стоимость приглашения блогера{' '}
                  <strong>
                    2 <FontAwesome name="bolt" />
                  </strong>
                </p>
                <PerfectScrollbar>
                  <div
                    style={{ maxHeight: 375, paddingRight: '1em' }}
                  >
                    <ListGroup>
                      {_.map(ownTasks.data, (task, index) => {
                        const { id, title, budget, platform } = task;

                        return (
                          <ListGroupItem
                            key={index}
                            tag="button"
                            className="d-flex justify-content-between"
                            onClick={() => this.onBloggerInvite(id)}
                          >
                            <span>
                              <FontAwesome
                                className={`mr-2 ${platform}`}
                                name={platform}
                              />
                              {title}
                            </span>
                            <Badge pill color="success">
                              {budget}
                            </Badge>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </div>
                </PerfectScrollbar>
              </div>
            )}
        </Modal>

        {alert.message && <AlertNotify alert={alert} modal />}
      </div>
    );
  }

  render() {
    const { blogger, user} = this.props;

    if (_.isPlainObject(blogger) && _.has(blogger, 'instagram')) {
      return this.renderInstagramProfile(blogger);
    }

    return null;
  }
}

const mapStateToProps = (state, props) => {
  const {
    bloggers, platform, user, tasks, alert,
  } = state;
  const { data } = bloggers;

  const blogger = data.filter(blogger => blogger.id === Number(props.match.params.id))[0];

  return {
    alert,
    bloggers,
    platform,
    blogger,
    user,
    tasks,
  };
};

const connectedBloggersProfile = connect(mapStateToProps)(BloggersProfile);

BloggersProfile.propTypes = {
  bloggers: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired,
  blogger: PropTypes.object.isRequired,
};

export { connectedBloggersProfile as BloggersProfile };
