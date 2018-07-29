import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
import FontAwesome from 'react-fontawesome';
import {
  Navigation,
  Content,
  Footer,
  Copyright,
  AlertNotify
} from '../../components';
import {
  history
} from '../../helpers';
import {
  userActions,
  alertActions,
  interfaceActions,
} from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      submitted: false,
      isVisiblePassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  componentWillMount() {
    const {
      dispatch,
      loggedIn,
      _interface,
      user,
    } = this.props;

    if (!_.isEmpty(user)) {
      const { api_token } = user;

      dispatch(userActions.checkToken(api_token));
    }

    if (loggedIn) {
      dispatch(interfaceActions.setInterface(_interface.type));
      dispatch(userActions.checkUserSettings(user, dispatch));
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
    
    dispatch(alertActions.clear());
  }

  togglePassword(e) {
    this.setState({
      isVisiblePassword: !this.state.isVisiblePassword
    })
  }

  render() {
    const { loggingIn, alert } = this.props;
    const { email, password, submitted, isVisiblePassword } = this.state;
    return (
      <div className="Login">
        <Helmet>
          <title>Вход | TheMost</title>
        </Helmet>
        <Navigation theme="dark"/>
        <Content>
          <Container>
            <Fade>
              <div className="heading">
                <h1>Вход</h1>
                <div className="underline underline-green"></div>
              </div>
              <Form onSubmit={this.handleSubmit} className="form">
                <Row className="justify-content-center">
                  <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    {alert.message && <AlertNotify alert={alert} />}
                    <FormGroup>
                      <Label for="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                        className={submitted && !email ? ' is-invalid' : ''}
                      />
                      <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password" className="d-flex align-items-center justify-content-between">
                        Пароль
                        <Link to="/password/reset" className="form-control-label-link">Забыли?</Link>
                      </Label>
                      <div className="input-pass">
                        <Input
                          id="password"
                          name="password"
                          type={isVisiblePassword ? 'text' : 'password'}
                          value={password}
                          onChange={this.handleChange}
                          className={submitted && !password ? ' is-invalid' : ''}
                        />
                        <FontAwesome
                          name={isVisiblePassword ? 'eye-slash' : 'eye'}
                          className="input-pass-eye"
                          onClick={this.togglePassword}
                        />
                      </div>
                      <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                    </FormGroup>
                    <Button color="success" className="w-100 d-flex align-items-center justify-content-center">
                      {loggingIn ? <ClipLoader color={"#fff"} size={24} /> : "Вход"}
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div className="text-center">
                <Link to="/register" className="btn btn-link">Зарегистрироваться</Link>
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
  const { authentication, alert, user, _interface } = state;
  const { loggingIn, loggedIn } = authentication;
  
  return {
    user,
    loggedIn,
    loggingIn,
    alert,
    _interface
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 