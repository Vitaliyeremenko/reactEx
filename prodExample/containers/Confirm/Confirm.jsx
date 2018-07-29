import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { AlertNotify } from '../../components';
import { userActions } from '../../actions';

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        token: ''
      }
    };
  }

  componentWillMount() {
    this.setState({
      user: queryString.parse(this.props.location.search)
    })
  }

  componentDidMount() {
    const { user } = this.state;
    const { dispatch } = this.props;

    if (user && user.email && user.token) {
      dispatch(userActions.activation(user.email, user.token));
    }
  }

  render() {
    const { alert } = this.props;

    return (
      <div className="Confirm">
        <Helmet>
          <title>Подтверждение | TheMost</title>
        </Helmet>
        {alert.message && <AlertNotify alert={alert} />}
        <p>Вы будете перенаправлены на страницу входа через 3 секунды...</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { activation, alert } = state;

  return {
    alert,
    activation
  }
} 

const connectedConfirm = connect(mapStateToProps)(Confirm);

export {
  connectedConfirm as Confirm
}

