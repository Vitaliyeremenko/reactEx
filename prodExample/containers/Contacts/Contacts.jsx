import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Helmet } from "react-helmet";
import MaskedInput from 'react-text-mask';
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
  ClipLoader
} from 'react-spinners';
import {
  Fade
} from 'react-reveal';
import {
  Navigation,
  Content,
  Footer,
  Copyright,
  AlertNotify
} from '../../components';
import {
  contactsActions,
  alertActions
} from '../../actions';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      company: '',
      comment: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
}

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    const { dispatch } = this.props;

    dispatch(alertActions.clear());

    const {
      name,
      email,
      phone,
      company,
      comment
    } = this.state;
    
    if (name && email && phone) {
      dispatch(contactsActions.send({
        name,
        email,
        phone: `+${phone.replace(/\D/g, '')}`,
        company,
        comment
      }));
    }
  }

  render() {
    const {
      name,
      email,
      phone,
      company,
      comment,
      submitted
    } = this.state;

    const {
      loading,
      alert
    } = this.props;

    return (
      <div className="Contacts">
        <Helmet>
          <title>Контакты | TheMost</title>
        </Helmet>
        <Navigation theme="dark" />
        <Content>
          <Container>

            <Fade>
              <div className="heading">
                <h1>Контакты</h1>
                <div className="underline underline-green"></div>   
              </div>
            </Fade>

            <Fade>
              <Row>
                <Col xs={12} lg={7}>
                  <h4 className="form-title">Отправьте нам сообщение</h4>
                  <Form onSubmit={this.handleSubmit} className="mb-2">
                    <Row>
                      <Col xs={12} sm={6}>
                        <FormGroup>
                          <Label for="name">Ваше имя</Label>
                          <Input
                            id="name"
                            placeholder="Маркс Вилов"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            className={submitted && !name ? ' is-invalid' : ''}
                          />
                          <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Label for="phone">Телефон</Label>
                          <MaskedInput
                            mask={['+', /\d/,'(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            placeholder="+ 7 (922) 555-1234"
                            id="phone"
                            value={phone}
                            name="phone"
                            onChange={this.handleChange}
                            render={(ref, props) => (
                              <Input
                                className={submitted && !phone ? ' is-invalid' : ''}
                                innerRef={ref}
                                {...props}
                              />
                            )}
                          />
                          
                          <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                        </FormGroup>
                      </Col>

                      <Col xs={12} sm={6}>
                        <FormGroup>
                          <Label for="email">E-mail</Label>
                          <Input
                            id="email"
                            placeholder="daxter@mail.ru"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            type="email"
                            className={submitted && !email ? ' is-invalid' : ''}
                          />
                          <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Label for="company">Компания</Label>
                          <Input
                            id="company"
                            placeholder="Корт"
                            name="company"
                            value={company}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col xs={12}>
                        <FormGroup>
                          <Label for="comment">Комментарий</Label>
                          <Input
                            id="comment"
                            placeholder="Чем можем помочь Вам?"
                            name="comment"
                            value={comment}
                            onChange={this.handleChange}
                          />
                        </FormGroup>

                        <Button color="success" className="btn-send d-flex align-items-center justify-content-center">
                          {loading ? <ClipLoader color={"#fff"} size={24} /> : "Отправить"}
                        </Button>
                        {alert.message && <AlertNotify alert={alert} />}                 
                      </Col>
                    </Row>
                  </Form>
                </Col>

                <Col xs={12} lg={{ size: 4, offset: 1 }} className="info">
                  <h3 className="info-title">Наши контакты</h3>
                  <div className="info__contacts">
                    <div className="info__contacts-item">
                      <Row className="align-items-center">
                        <Col xs={2} className="text-center">
                          <FontAwesome
                            name="map-marker"
                            className="info__contacts-item-icon"
                          />
                        </Col>
                        <Col xs={10}>
                          <span className="info__contacts-item-text">г. Москва, <br/> Зубовский бульвар, д. 4</span>
                        </Col>
                      </Row>
                    </div>
                    <div className="info__contacts-item">
                      <Row className="align-items-center">
                        <Col xs={2} className="text-center">
                          <FontAwesome
                            name="phone"
                            className="info__contacts-item-icon"
                          />
                        </Col>
                        <Col xs={10}>
                          <span className="info__contacts-item-text">+7 (495) 637-5019</span>
                        </Col>
                      </Row>
                    </div>
                    <div className="info__contacts-item">
                      <Row className="align-items-center">
                        <Col xs={2} className="text-center">
                          <FontAwesome
                            name="envelope"
                            className="info__contacts-item-icon"
                          />
                        </Col>
                        <Col xs={10}>
                          <span className="info__contacts-item-text">pressclub@rian.ru</span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
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
  const {
    contacts,
    alert
  } = state;
  const {
    loading
  } = contacts;

  return {
    loading,
    alert
  };
}

const connectedContacts = connect(mapStateToProps)(Contacts);
export { connectedContacts as Contacts }; 