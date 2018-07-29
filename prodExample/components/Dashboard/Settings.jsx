import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { AlertNotify } from '../../components';
import { userActions, alertActions } from '../../actions';
import { Async } from 'react-select';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        phone: '',
        age: undefined,
        gender_id: "",
        city_id: undefined,
        city_ru: "",
        company: "",
        avatar: "",
        blogger_cost: undefined
      },
      selectedCity: {},
      submitted: false,
        image : false
    };



    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    this.getCities = this.getCities.bind(this);
    this.selectCity = this.selectCity.bind(this);


  }

  componentDidMount() {
      const {dispatch} = this.props;
      dispatch(userActions.profileUpdate(this.props.user.api_token));

    const { user } = this.props;
    const { city_ru } = user;

    this.setState({
      user,
      selectedCity: {
        label: city_ru,
        value: city_ru
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { fetching } = user;



    if (!fetching) {
      this.setState({
        user
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { user } = this.state;

    this.setState({
      submitted: true,
    });

    dispatch(alertActions.clear());
    dispatch(userActions.changeSettings(user));
  }

  handleChange(e) {
    const { value, name} = e.target;
    const { user } = this.state;

    this.setState({
      user: {
        ...user,
        [name]:  value
      }
    });
  }

    handleImageChange(e) {
        const { files, name } = e.target;
        const { user } = this.state;
        console.log('handle');
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let image = false;
        reader.onloadend =  () => {
            image = reader.result;
            this.setState({
                user: {
                    ...user,
                    [name]: files[0]
                },
                image: image
            });
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        };


    }

  getCities(input) {
    const { user, dispatch } = this.props;
    const { api_token } = user;
    
    const options = [];

    if (!input) {
      return Promise.resolve({ options })
    }

    return axios.get('/api/v1/user/city/search', {
      params: {
        api_token,
        title_ru: input
      }
    })
		.then((json) => {
      const { data: { data } } = json;

      data.map((item, index) => {
        const {
          city_id,
          title_ru
        } = item;

        options.push({
          city_id,
          value: title_ru,
          label: title_ru,
        })
      })

      return {
        options,
      };
    });
  }

  selectCity(city) {
    const { user } = this.state;
    const {
      city_id,
      label,
      value
    } = city;

    this.setState({
      user: {
        ...user,
        city_id
      },
      selectedCity: {
        city_id,
        label,
        value,
      }
    })
  }
  
  render() {
    const { alert, fetching,_interface } = this.props;
    const { user, selectedCity,image} = this.state;

    const { 
      first_name,
      last_name,
      phone,
      age,
      gender_id,
      company,
      avatar,
      blogger_cost
    } = user;



    const default_avatar = location.origin + '/images/avatars/default-profile-image.jpg';

      return (
        <div className="settings mb-3">
          <Container fluid>
            <Row className="justify-content-center">
              <Col xs={12} sm={8} lg={6} xl={4}>
                <h2 className="settings-heading">Настройки профиля</h2>
                <Form onSubmit={this.handleSubmit} className="form">
                  <FormGroup>
                    <Label for="first_name">Имя</Label>
                    <Input type="text" value={first_name || ''} name="first_name" id="first_name" onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="last_name">Фамилия</Label>
                    <Input type="text" value={last_name || ''} name="last_name" id="last_name" onChange={this.handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="age">Возраст</Label>
                    <Input type="number" pattern="^\+?[0-9]{7,12}$" min="0" max="200" value={age || ''} name="age" id="age" onChange={this.handleChange}/>
                  </FormGroup>
                    {_interface.type === "blogger" &&
                      <FormGroup>
                          <Label for="age">Запрашиваемая цена</Label>
                          {
                              blogger_cost == -1 && <p><b>Ваш запрос находиться на модерации</b></p>
                          }
                          {
                              blogger_cost != -1 && <Input type="number" pattern="^\+?[0-9]{7,12}$" min="0" max="200" value={blogger_cost || ''} name="blogger_cost" id="blogger_cost" onChange={this.handleChange}/>
                          }
                          {
                              blogger_cost != -1 &&  <small className="form-text text-muted">*цена будет утверждена или корректирована после модерации</small>
                          }

                      </FormGroup>
                    }

                    {_interface.type === "advertiser" &&
                      <FormGroup>
                          <Label for="age">Компания</Label>
                          <Input type="text" value={company || ''} name="company" id="company" onChange={this.handleChange}/>
                      </FormGroup>
                    }
                    <FormGroup>
                        <Label for="avatar"> Аватар </Label>
                        {
                            image && <p><img src={image} alt="" width="50px" height="50px"/></p>
                        }
                        {
                            !image && <p><img src={avatar || default_avatar} alt="" width="50px" height="50px"/></p>
                        }

                        <Input type="file" name="avatar" id="avatar" onChange={this.handleImageChange}/>
                    </FormGroup>
                  <FormGroup>
                    <Label for="city">Город</Label>
                    <Async
                      name="city"
                      value={selectedCity}
                      loadOptions={this.getCities}
                      onChange={this.selectCity}
                      placeholder="Поиск"
                      searchPromptText="Введите город для поиска"
                      loadingPlaceholder="Загрузка..."
                      clearable={false}
                    />
                  </FormGroup>
                  <FormGroup className="mb-1">
                    <Label className="mb-1">Пол:</Label>
                  </FormGroup>
                  <div className="d-flex mb-3">
                    <FormGroup check>
                      <Label check htmlFor="male">
                        <Input id="male" type="radio" name="gender_id" value="1" checked={gender_id == "1"} onChange={this.handleChange} />
                        <span className="label-text">Мужской</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check htmlFor="female">
                        <Input id="female" type="radio" name="gender_id" value="2" checked={gender_id == "2"} onChange={this.handleChange} />
                        <span className="label-text">Женский</span>
                      </Label>
                    </FormGroup>
                  </div>
                  <FormGroup>
                    <Label for="phone">Телефон</Label>
                    <Input type="tel" pattern="^\+?[0-9]{7,12}$" value={phone || ''} name="phone" id="phone" onChange={this.handleChange}/>
                    <FormText>+ код страны, номер телефона от 7 до 12 цифр (+7 999 999 99 99)</FormText>
                  </FormGroup>
                  <hr/>
                  <div>
                    <h5 className="mb-3">Получать email уведомления</h5>
                    <FormGroup>
                      <Label check htmlFor="blogger">
                        <Input id="blogger" type="checkbox" name="type" value="blogger" defaultChecked onChange={this.handleChange} />
                        <span className="label-text">О новых сделках и предложениях</span>
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label check htmlFor="advertiser">
                        <Input id="advertiser" type="checkbox" name="type" value="advertiser" defaultChecked onChange={this.handleChange} />
                        <span className="label-text">Об отмененных сделках</span>
                      </Label>
                    </FormGroup>
                  </div>
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
  const { user, alert,_interface } = state;
  const { fetching } = user;

  return {
    fetching,
    user,
    alert,
    _interface
  }
}

const connectedSettings = connect(mapStateToProps)(Settings);
export {
  connectedSettings as Settings
}