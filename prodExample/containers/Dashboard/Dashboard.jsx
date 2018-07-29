import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotFound } from '../../containers';
import { Content, Sidebar, Topbar, RequiredRoute, Chat, ScrollToTop, ChatList } from '../../components';
import { userActions } from '../../actions';
import { Settings, Security, BloggersSearch, BloggersProfile } from '../../components/Dashboard';
import { AddPlatforms, Platforms, EditPlatform, PlatformInstagram, PersonalPlatformInstagram } from '../../components/Dashboard/Platforms';
import { Tasks, TaskDetails, CreateTask, MyTasks, EditTask } from '../../components/Dashboard/Tasks';
import { BloggerDeals, AdvertiserDeals } from '../../components/Dashboard/Deals';
import { Route, Switch } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.content = undefined;
  }
  componentWillMount(){
    const {
      dispatch,
      user,
    } = this.props;

    if (!_.isEmpty(user)) {
      const { api_token } = user;
      dispatch(userActions.checkToken(api_token,user));
    }
      dispatch(userActions.sendEntryTime(user));
  }

  render() {
    const { isCollapsed } = this.props;

    return (
      <div className="Dashboard">
        <Helmet>
          <title>Панель управления | TheMost</title>
        </Helmet>
        <Sidebar position="left" />
        <div className={classNames('Dashboard-main', { isCollapsed, isExpanded: 'isExpanded' })}>
          <Topbar />
          <div className="Dashboard-content" ref={el => this.content = el}>
            <ScrollToTop scrollableElement={this.content}>
              <Switch>
                <RequiredRoute component={Tasks} allowedRoles={['blogger']} exact path="/dashboard" />
                <Route component={TaskDetails} exact path="/dashboard/tasks/task/:id" />
                <RequiredRoute component={Platforms} allowedRoles={['blogger']} exact path="/dashboard/platforms" />
                <RequiredRoute component={AddPlatforms} allowedRoles={['blogger']} exact path="/dashboard/platforms/add" />
                <RequiredRoute component={EditPlatform} allowedRoles={['blogger']} exact path="/dashboard/platforms/edit/:platform" />
                <RequiredRoute component={PlatformInstagram} allowedRoles={['blogger']} exact path="/dashboard/platforms/add/instagram" />
                <RequiredRoute component={PersonalPlatformInstagram} allowedRoles={['blogger']} exact path="/dashboard/platforms/add/instagram-personal"/>                
                <Route
                  component={Chat}
                  exact
                  path="/dashboard/chat/:id"
                />
                <Route
                    component={ChatList}
                    exact
                    path="/dashboard/chatlist"
                />
                <RequiredRoute
                  component={BloggerDeals}
                  allowedRoles={['blogger']}
                  exact
                  path="/dashboard/blogger/deals"
                />
                <RequiredRoute
                  component={AdvertiserDeals}
                  allowedRoles={['advertiser']}
                  exact
                  path="/dashboard/a10vertiser/deals"
                />
                <RequiredRoute component={BloggersSearch} allowedRoles={['advertiser']} exact path="/dashboard/search" />
                <RequiredRoute component={CreateTask} allowedRoles={['advertiser']} exact path="/dashboard/tasks/create" />
                <RequiredRoute component={MyTasks} allowedRoles={['advertiser']} exact path="/dashboard/tasks/mytasks" />
                <RequiredRoute component={EditTask} allowedRoles={['advertiser']} exact path="/dashboard/tasks/edit/:id" />
                <RequiredRoute
                  allowedRoles={['advertiser']}
                  component={BloggersProfile}
                  exact
                  path="/dashboard/blogger/profile/:id"
                />
                <Route component={Settings} path="/dashboard/settings" />
                <Route component={Security} path="/dashboard/security" />
                <Route component={NotFound} />
              </Switch>
            </ScrollToTop>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { sidebar, user } = state;
  const { isCollapsed } = sidebar;

  return {
    isCollapsed,
    user,
  };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };
