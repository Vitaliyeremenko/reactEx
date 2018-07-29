import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import { AlertNotify } from '../../../components';
import { userActions, alertActions } from '../../../actions';

const fakeSocials = [
  {
    label: 'Instagram Business',
    value: 'instagram_business',
    icon: 'instagram',
    decription: 'Чтобы добавить площадку Instagram Business, вам необходимо иметь <a href="https://www.facebook.com/business/help/502981923235522">Instagram Business</a> аккаунт и пройти авторизацию через Facebook.',
  },
  {
    label: 'Instagram Personal',
    value: 'instagram_personal',
    icon: 'instagram',
    decription: 'Чтобы добавить площадку Instagram Personal, вам необходимо иметь <a href="https://www.instagram.com">Instagram Personal</a> аккаунт и пройти авторизацию через Facebook.',
  },
  {
    label: 'Facebook',
    value: 'facebook',
    icon: 'facebook',
    decription: 'Чтобы добавить площадку Facebook, вам необходимо иметь <a href="https://www.facebook.com">Facebook</a> аккаунт и пройти авторизацию через Facebook.',
  },
  {
    label: 'YouTube',
    value: 'youtube',
    icon: 'youtube',
    decription: 'Чтобы добавить площадку YouTube, вам необходимо иметь <a href="https://www.youtube.com">YouTube</a> аккаунт и пройти авторизацию через YouTube.',    
  },
];

class AddPlatforms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: fakeSocials[1],
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({
      selectedOption,
    });
  }

  handleSubmit(e) {
    const { user, dispatch } = this.props;
    const { submitted, selectedOption } = this.state;
    const { value } = selectedOption;
    const { api_token } = user;

    this.setState({
      submitted: true,
    });

    dispatch(alertActions.clear());

    value && dispatch(userActions.getPlatformAuthLink(value, api_token));
  }

  render() {
    const { alert, user, location: { pathname }} = this.props;
    const { selectedOption, submitted } = this.state;
    const value = selectedOption && selectedOption.value;
    
    return (  
      <div className="addplatforms">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={6}>
              <h2 className="addplatforms-heading">Добавить площадку</h2>

              <Row className="align-items-sm-center justify-content-between">
                <Col xs={12}>
                  <Select
                    name="form-field-name"
                    value={value}
                    valueComponent={customSelectValue}
                    onChange={this.handleChange}
                    options={fakeSocials}
                    optionComponent={customSelectOption}
                    clearable={false}
                    searchable={false}
                    placeholder={<span>Выберите социальную сеть</span>}
                  />
                </Col>
                <Col xs={12}>
                  <p className="mt-3 mb-2">
                    { selectedOption && renderHTML(selectedOption.decription) }
                  </p>
                  <Button
                    className="mb-2 mt-2"
                    color="success"
                    onClick={this.handleSubmit}
                    outline
                    size="sm"
                  >
                    {'Авторизоваться'}
                  </Button>
                </Col>
              </Row>

              {alert.message && <AlertNotify alert={alert} modal />}
              {user.error && <AlertNotify 
                userError
                alert={{message: user.error, type: 'danger'}} 
                modal
                dispatch={this.props.dispatch}
              />}
              {user.errorInst && <AlertNotify 
                userError
                modal
                alert={{message: user.errorInst, type: 'warning'}} 
                dispatch={this.props.dispatch}
              />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function customSelectValue({ children, placeholder, value }) {
  return (
    <div className="Select-value" title={value.title}>
      <FontAwesome
        name={value.icon}
        className={`Select-icon ${value.icon} mr-2`}
      />
      <span className="Select-value-label-text">{children}</span>
    </div>
  )
}

function customSelectOption(props) {
  function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    props.onSelect(props.option, e);
  }

  function handleMouseEnter(e) {
    props.onFocus(props.option, e);
  }

  function handleMouseMove(e) {
    if (props.isFocused) return;
    props.onFocus(props.option, e);
  }

  return (
    <div className={props.className}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      title={props.option.title}
    >
      <FontAwesome
        name={props.option.icon}
        className={`Select-icon ${props.option.icon} mr-2`}
      />
      {props.children}
    </div>
  );
}

function mapStateToProps(state) {
  const { user, alert } = state;

  return {
    user,
    alert,
  }
}

const connectedAddPlatforms = connect(mapStateToProps)(AddPlatforms);

export {
  connectedAddPlatforms as AddPlatforms
}