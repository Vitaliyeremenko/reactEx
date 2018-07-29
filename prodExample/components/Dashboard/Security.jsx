import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from 'reactstrap';
import { confirmPasswords } from '../../helpers';
import { userActions, alertActions } from '../../actions';
import { AlertNotify } from '../../components';

class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwords: {
        current_password: '',
        new_password: '',
        repeat_password: '',
      },
      submitted: false,
      isValid: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      dispatch,
      user,
    } = this.props;
    const { passwords } = this.state;
    const {
      current_password,
      new_password,
      repeat_password
    } = passwords;

    const isValid = confirmPasswords(new_password, repeat_password);

    if (isValid && current_password && new_password) {
      dispatch(userActions.changePassword({ current_password, new_password }, user))
    }

    this.setState({
      passwords,
      submitted: true,
      isValid
    })
  }

  handleChange(e) {
    const { value, name } = e.target;
    const { passwords } = this.state;

    this.setState({
      passwords: {
        ...passwords,
        [name]: value
      }
    })
  }
  
  render() {
    const { fetching, alert } = this.props;
    const { passwords, submitted, isValid } = this.state;
    const {
      current_password,
      new_password,
      repeat_password
    } = passwords;

    return (
      <div className="security">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={8} lg={6} xl={4}>
              <h2 className="security-heading">Настройки безопасности</h2>
              <Form onSubmit={this.handleSubmit}>
                <h5 className="mb-3">Смена пароля</h5>
                <hr/>
                <FormGroup>
                  <Label for="current_password">Текущий пароль</Label>
                  <Input
                    type="password" 
                    className={submitted && !current_password ? ' is-invalid' : ''}
                    value={current_password || ''}
                    name="current_password"
                    id="current_password"
                    onChange={this.handleChange}
                  />
                  <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="new_password">Новый пароль</Label>
                  <Input
                    type="password" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    className={submitted && !new_password || submitted && !isValid ? ' is-invalid' : ''}
                    value={new_password || ''}
                    name="new_password"
                    id="new_password"
                    onChange={this.handleChange}
                  />
                  {submitted && !new_password ?
                    <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback> : ''
                  }
                </FormGroup>
                <FormGroup>
                  <Label for="repeat_password">Новый пароль еще раз</Label>
                  <Input
                    type="password" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    className={submitted && !repeat_password || submitted && !isValid ? ' is-invalid' : ''}
                    value={repeat_password || ''}
                    name="repeat_password"
                    id="repeat_password"
                    onChange={this.handleChange}
                  />
                  {submitted && !repeat_password ?
                    <FormFeedback>Это поле обязательно должно быть заполнено.</FormFeedback> : <FormFeedback>Пароли не совпадают</FormFeedback>
                  }
                  <FormText>
                    Пароль должен содержать цифры,
                    буквы латинского алфавита и специальные символы
                    Длина пароля от 8 до 40 символов
                  </FormText>
                </FormGroup>
                <hr/>
                <Button
                  className="d-flex align-items-center justify-content-center"
                  color="success"
                  outline
                  size="md"
                >
                  {fetching ? <ClipLoader color={"#fff"} size={24} /> : "Сохранить"}
                </Button>
                {alert.message && <AlertNotify alert={alert} />}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, alert } = state;
  const { fetching } = user;

  return {
    fetching,
    user,
    alert
  }
}

const connectedSecurity = connect(mapStateToProps)(Security);

export {
  connectedSecurity as Security
}