import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { sidebarActions, userActions } from '../actions';

class Topbar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { name } = event.target;
    const { dispatch, isCollapsed } = this.props;

    if (!isCollapsed) {
      dispatch(sidebarActions.show());
    } else {
      dispatch(sidebarActions.hide());
    }
  }

  render() {
    const { dispatch, user } = this.props;
    const { balance_available } = user;

    return (
      <div className="topbar">
        <div
          className="topbar-toggler"
          onClick={this.handleClick}
        >
          <FontAwesome name="bars" />
        </div>

        <div className="topbar-block-info">
          <div className="balance">
            <span className="balance-label">Баланс: </span>
            <span className="balance-value">{balance_available}</span>
            <FontAwesome
              className="balance-icon"
              name="bolt"
            />
          </div>

          <div className="logout">
            <FontAwesome name="sign-out" onClick={() => dispatch(userActions.logout())} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    user,
    sidebar,
  } = state;
  const { isCollapsed } = sidebar;

  return {
    user,
    isCollapsed,
  };
}

const connectedTopbar = connect(mapStateToProps)(Topbar);
export { connectedTopbar as Topbar };
