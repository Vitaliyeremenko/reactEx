import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Switch from 'react-toggle-switch'
import classNames from 'classnames';
// import { Scrollbars } from 'react-custom-scrollbars';
import PerfectScrollbar from 'react-perfect-scrollbar';
import HasRole, { IsBlogger, IsAdvertiser } from './HasRole';
import { sidebarActions, interfaceActions, settingsActions } from '../actions';
import { history } from '../helpers';


const advertiserNav = [
  {
    label: 'Поиск блогеров',
    icon: 'search',
    link: '/dashboard/search',
  },
  {
    label: 'Добавить задание',
    icon: 'plus',
    link: '/dashboard/tasks/create',
  },
  {
    label: 'Мои задания',
    icon: 'check-circle',
    link: '/dashboard/tasks/mytasks',
  },
  {
    label: 'Мои сделки',
    icon: 'bolt',
    link: '/dashboard/a10vertiser/deals',
  },
  {
      label: 'Мои чаты',
      icon: 'comments',
      link: '/dashboard/chatlist',
  },
  {
    label: 'Настройки профиля',
    icon: 'cog',
    link: '/dashboard/settings',
  },
  {
    label: 'Безопасность',
    icon: 'lock',
    link: '/dashboard/security',
  },

];

const bloggerNav = [
  {
    label: 'Лента заданий',
    icon: 'check-square-o',
    link: '/dashboard',
  },
  {
    label: 'Добавить площадку',
    icon: 'plus',
    link: '/dashboard/platforms/add',
  },
  {
    label: 'Мои площадки',
    icon: 'wifi',
    link: '/dashboard/platforms',
  },
  {
    label: 'Мои сделки',
    icon: 'bolt',
    link: '/dashboard/blogger/deals',
  },
  {
      label: 'Мои чаты',
      icon: 'comments',
      link: '/dashboard/chatlist',
  },
  {
    label: 'Настройки профиля',
    icon: 'cog',
    link: '/dashboard/settings',
  },
  {
    label: 'Безопасность',
    icon: 'lock',
    link: '/dashboard/security',
  },

];

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0
    }

    this.toggle = this.toggle.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(settingsActions.getSettings(user.api_token));
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    const { innerWidth } = window;

    if (innerWidth) {
      this.setState({
        windowWidth: innerWidth
      });
  
      this.toggle(innerWidth);
    }
  }
  
  toggle(width) {
    const { windowWidth, isCollapsed } = this.state;
    const { dispatch } = this.props;

    if (!isCollapsed && width > 768) {
      dispatch(sidebarActions.show());
    } else {
      dispatch(sidebarActions.hide());
    }
  }

  toggleSwitch() {
    const {
      dispatch,
      _interface
    } = this.props;
    const {
      windowWidth
    } = this.state;

    this.toggle(windowWidth);

    dispatch(interfaceActions.switchInterface(_interface.type));
  }

  render() {
    const {
      isCollapsed,
      position,
      user,
      _interface,
    } = this.props;

    return (
      <div className={classNames('sidebar', `${position}`, {'isCollapsed': isCollapsed, 'isExpanded': !isCollapsed})}>
        <PerfectScrollbar>
          <div className="sidebar-brand">
            <Link to='/'>
              <img
                src={require('../../img/logo-white.png')}
                className="img-fluid"
                alt="sidebar-logo"
              />
            </Link>
          </div>
          <div className="sidebar-user__info">
            <span className="sidebar-user__info-email">
              {user.email}
            </span>
          </div>
          <div className="sidebar-user__menu">
            <Nav vertical>
              <IsAdvertiser>
                {advertiserNav.map((item, index) => (
                  <NavItem className="sidebar-user__menu-item" key={index}>
                    <NavLink exact={true} to={item.link} className="nav-link sidebar-user__menu-link" onClick={() => this.toggle(this.state.windowWidth)}>
                      <FontAwesome className="sidebar-user__menu-icon" name={item.icon} />
                      <span>{item.label}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </IsAdvertiser>
              <IsBlogger>
                {bloggerNav.map((item, index) => (
                  <NavItem className="sidebar-user__menu-item" key={index}>
                    <NavLink exact={true} to={item.link} className="nav-link sidebar-user__menu-link" onClick={() => this.toggle(this.state.windowWidth)}>
                      <FontAwesome className="sidebar-user__menu-icon" name={item.icon} />
                      <span>{item.label}</span>
                    </NavLink>
                  </NavItem>))}
              </IsBlogger>
            </Nav>
          </div>
          <div className="sidebar-copy">
            <span className="sidebar-copy__info">
              &copy; 2018
              <Link to="/" className="sidebar-copy__info-link">TheMost</Link>
              <Link to="/contacts" className="sidebar-copy__info-link ml-auto">Контакты</Link>
            </span>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

Sidebar.propTypes = {
  position: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const {
    sidebar,
    user,
    _interface,
  } = state;
  const { isCollapsed } = sidebar;

  return {
    isCollapsed,
    user,
    _interface
  }
}

const connectedSidebar = withRouter(connect(mapStateToProps)(Sidebar));
export { connectedSidebar as Sidebar };