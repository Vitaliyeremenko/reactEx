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

class PersonalPlatformInstagram extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { code } = queryString.parse(this.props.location.search);
    const {
      dispatch,
      user: {
        api_token,
      },
      user
    } = this.props;
      const access_token = this.props.location.hash.replace('#access_token=', '');
      dispatch(userActions.authPersonalInstagram(user, api_token, access_token));
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

const connectedPlatformInstagram = connect(mapStateToProps)(PersonalPlatformInstagram);

export {
  connectedPlatformInstagram as PersonalPlatformInstagram,
};
