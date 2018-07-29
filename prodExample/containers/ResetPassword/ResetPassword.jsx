import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import {
  Helmet
} from 'react-helmet';
import {
  Fade
} from 'react-reveal';
import {
  ClipLoader
} from 'react-spinners';
import {
  Navigation,
  Content,
  Footer,
  Copyright,
  AlertNotify
} from '../../components';

import { userActions, alertActions } from '../../actions';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        token: '',
        password: '',
      },
      isTokenValid: false,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { dispatch, isTokenValid } = this.props;
    const { user } = this.state;
    const { token } = queryString.parse(this.props.location.search);

    if (token) {
      // validate token
      dispatch(userActions.resetPasswordValidate(token))

      this.setState({
        user: {
          ...user,
          token
        },
        isTokenValid
      })
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });

    const { user, isTokenValid } = this.state;
    const { dispatch } = this.props;

    dispatch(alertActions.clear());

    if (user.email && !user.token) {
      dispatch(userActions.resetPasswordLink(user.email));
    }

    if (user.token && user.password) {
      // change password if token valid
      dispatch(userActions.resetPassword(user.password, user.token));
    }
  }
  
  render() {
    const { fetching, alert } = this.props;
    const { user, submitted } = this.state;

    return (
      <div className="ResetPassword">
        <Helmet>
          <title>Восстановление пароля | TheMost</title>
        </Helmet>
        <Navigation theme="dark"/>
        <Content>
          <Container>
            <Fade>
              <div className="heading">
                <h1>Восстановление пароля</h1>
                <div className="underline underline-green"></div>
              </div>

              <Form onSubmit={this.handleSubmit} className="form">
                <Row className="justify-content-center">
                  <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    {!user.token ? <FormGroup>
                      <Label for="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={this.handleChange}
                        className={submitted && !user.email ? ' is-invalid' : ''}
                      />
                      <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                    </FormGroup> : <FormGroup>
                      <Label for="password">Пароль</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={this.handleChange}
                        className={submitted && !user.password ? ' is-invalid' : ''}
                      />
                      <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                    </FormGroup>}
                    <Button color="success" className="w-100 d-flex align-items-center justify-content-center">
                      {fetching ? <ClipLoader color={"#fff"} size={24} /> : "Отправить"}
                    </Button>
                    {alert.message && <AlertNotify alert={alert} />}
                  </Col>
                </Row>
              </Form>
              <div className="text-center">
                <Link to="/login" className="btn btn-link">Назад</Link>
              </div>
            </Fade>
          </Container>
        </Content>
        <Footer />
        <Copyright />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert, user } = state;
  const { fetching } = user;

  return {
    alert,
    fetching
  }
}

const connectedResetPassword = connect(mapStateToProps)(ResetPassword);
export { connectedResetPassword as ResetPassword };