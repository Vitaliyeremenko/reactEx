import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
import { history } from '../../helpers'


import { userActions } from '../../actions';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        role: 'blogger',
      },
      acceptedTerms: false,
      submitted: false
    };
  }

  componentWillMount(){
    if (this.props.authentication) {
      history.push('/dashboard')
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
    const { user, acceptedTerms } = this.state;
    const { dispatch } = this.props;
    if (user.email && user.role && acceptedTerms) {
      dispatch(userActions.register(user.email, user.role)); // TODO: replace on user
    }
  }

  handleClick(event) {
    event.preventDefault();

    const { name, value } = event.target;
    const { acceptedTerms } = this.state;

    this.setState({
      acceptedTerms: !acceptedTerms
    })
  }

  render() {
    const { registering, alert } = this.props;
    const { user, submitted, acceptedTerms } = this.state;

    return (
      <div className="Register">
        <Helmet>
          <title>Регистрация | TheMost</title>
        </Helmet>
        <Navigation theme="dark"/>
        <Content>
          <Container>
            <Fade>
              <div className="heading">
                <h1>Регистрация</h1>
                <div className="underline underline-green"></div>
              </div>

              <Form onSubmit={e => this.handleSubmit(e)} className="form">
                <Row className="justify-content-center">
                  <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    {alert.message && <AlertNotify alert={alert} />}
                    <FormGroup>
                      <Label for="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={e => this.handleChange(e)}
                        className={submitted && !user.email ? ' is-invalid' : ''}
                      />
                      <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                    </FormGroup>
                    <hr/>

                    <div className="d-flex mb-2">
                      <FormGroup check>
                        <Label check htmlFor="blogger">
                          <Input id="blogger" type="radio" name="role" value="blogger" defaultChecked onChange={e => this.handleChange(e)} />
                          <span className="label-text">Я блогер</span>
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check htmlFor="advertiser">
                          <Input id="advertiser" type="radio" name="role" value="advertiser" onChange={e => this.handleChange(e)} />
                          <span className="label-text">Я рекламодатель</span>
                        </Label>
                      </FormGroup>
                    </div>

                    <FormGroup check className="pl-0">
                      <Label check htmlFor="terms" onClick={e => this.handleClick(e)}>
                        <Input id="terms" type="checkbox" checked={acceptedTerms} />
                        <span className="label-text">Согласен(а) с <Link to="/terms">пользовательским соглашением.</Link></span>
                      </Label>
                      {submitted && !acceptedTerms && <div className="invalid-text form-errors">Примите условия пользовательского соглашения</div>}
                    </FormGroup>
                    <hr/>

                    <Button color="success" className="w-100 d-flex align-items-center justify-content-center">
                      {registering ? <ClipLoader color={"#fff"} size={24} /> : "Зарегистрироваться"}
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div className="text-center">
                <Link to="/login" className="btn btn-link">Войти</Link>
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

const mapStateToProps = state => ({
  registering: state.registration.registering,
  alert: state.alert,
  authentication: state.authentication.loggedIn

})


const connectedRegister = connect(mapStateToProps)(Register);
export { connectedRegister as Register };