import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Label,
  FormGroup,
} from 'reactstrap';
import {
  EditorState,
  convertToRaw,
  ContentState,
  ContentBlock,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';
import InputRange from 'react-input-range';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import {
  ClipLoader
} from 'react-spinners';
import {
  optionWithIcon, 
  valueWithIcon,
  AlertNotify,
} from '../../../components';
import {
  alertActions,
  platformActions,
  tasksActions,
} from '../../../actions';

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: {},
      currentFormats: [],
      dimensions: {
        width: 0,
      },

      // option for selected component
      platformOption: {
        label: 'Instagram',
        value: 'instagram',
        icon: 'instagram'
      },
      adFormatOption: {},
      adTypeOption: {},
      payOption: {},

      // range
      followersRange: {
        value: 10000
      },

      // checkboxes
      isDeadlineChecked: false,

      submitted: false,
      // values for request
      platform: [{
          label: 'Instagram',
          value: 'instagram',
          icon: 'instagram'
      }],
      ad_format_id: undefined,
      ad_type_id: undefined,
      title: "",
      description: "",
      budget: 100,
      followers: 0,
      deadline: "",
        // barter,money,money barter types of payment
        type: "",
        typeFormats : [
            {
                label : 'Бюджет',
                value : 'money'
            },
            {
                label : 'Бартер',
                value : 'barter'
            },
            {
                label : 'Бюджет и бартер',
                value : 'money_and_barter'
            },
        ],
        barterText : "",
        barterImage : ""
    };

    this.handleSelectPlatform  = this.handleSelectPlatform.bind(this);
    this.handleSelectAdType    = this.handleSelectAdType.bind(this);
    this.handleSelectAdFormat  = this.handleSelectAdFormat.bind(this);
    this.handleTitleChange     = this.handleTitleChange.bind(this);
    this.handleFollowersChange = this.handleFollowersChange.bind(this);
    this.handleDeadlineChange  = this.handleDeadlineChange.bind(this);
    this.handleCheckDeadline   = this.handleCheckDeadline.bind(this);
    this.handleChangeBudget    = this.handleChangeBudget.bind(this);
    this.handleResize          = this.handleResize.bind(this);
    this.handleSubmit          = this.handleSubmit.bind(this);

    this.onEditorStateChange = this.onEditorStateChange.bind(this);

    this.getPlatformFormats = this.getPlatformFormats.bind(this);
    this.getPlatformAdTypes = this.getPlatformAdTypes.bind(this);

    this.showFollowersCount = this.showFollowersCount.bind(this);
    this.handleSelectPaymentType = this.handleSelectPaymentType.bind(this);
    this.handleChangeBarterText = this.handleChangeBarterText.bind(this);
    this.handleChangeBarterFile = this.handleChangeBarterFile.bind(this);
  }

  handleSelectPlatform(platform) {
    const { dispatch, user } = this.props;
    const { value } = platform[0];
    dispatch(platformActions.getAllFormats(user.api_token, value));
    
    this.setState({
      platformOption: platform,
      platform: platform,
    })
  }

  handleSelectAdType(adType) {
    const { id } = adType;

    this.setState({
      adTypeOption: adType,
      ad_type_id: id
    })
  }
  handleSelectPaymentType(paymentType) {
     this.setState({
         type: paymentType.value
     });
  }

  handleChangeBarterText(e){
      const { value } = e.target;

      this.setState({
          barterText: value
      })
  }
  handleSelectAdFormat(adFormat) {
    const { id } = adFormat;

    this.setState({
      adFormatOption: adFormat,
      ad_format_id: id
    })
  }

  handleSubmit(e, status = '') {
    const {
      dispatch,
      user
    } = this.props;
    const {
      platform,
      ad_format_id,
      ad_type_id,
      budget,
      followers,
      title,
      description,
      deadline,
      isDeadlineChecked,
        type,
        barterText,
        barterImage
    } = this.state;
    const { api_token } = user;

    dispatch(alertActions.clear());

    this.setState({
      submitted: true,
    });

    let platformString = '';
    platform.forEach(item => {
      platformString += item.value + ',';
    });
    dispatch(tasksActions.create({
      api_token,
      platform : platformString.substr(0,platformString.length-1),
      ad_format_id,
      ad_type_id,
      budget,
      followers,
      title,
      description,
      deadline: isDeadlineChecked ? deadline : undefined,
      status,
        type,
        barterText,
        barterImage
    }));
  }

  handleTitleChange(e) {
    const { value } = e.target;

    this.setState({
      title: value
    })
  }

  handleChangeBarterFile(e){
      this.setState({
          barterImage: e.target.files[0]
      })
  }
  handleFollowersChange(value) {
    this.setState({
      followers: value
    })
  }

  handleDeadlineChange(date) {
    this.setState({
      deadline: date.format('YYYY-MM-DD')
    })
  }

  handleCheckDeadline(e) {
    const { isDeadlineChecked } = this.state;

    this.setState({
      isDeadlineChecked: !isDeadlineChecked,
      deadline: !isDeadlineChecked ? moment().add(1, 'days').format('YYYY-MM-DD') : "",
    })
  }

  handleChangeBudget(e) {
    const { value } = e.target;

    this.setState({
      budget: value
    })
  }

  handleResize(e) {
    const { dimensions } = this.state;
    const ww = window.innerWidth;

    this.setState({
      dimensions: {
        ...dimensions,
        width: ww
      }
    })
  }

  onEditorStateChange(editorState) {
    const contentState = editorState.getCurrentContent();

    if (contentState.hasText()) {
      const raw = convertToRaw(contentState);
      const description = draftToHtml(raw);

      this.setState({
        description,
        editorState
      })

      return;
    }

    this.setState({ description: "" });
  };

  getPlatformFormats(formats) {
    const currentFormats = [];

    _.map(formats, format => {
      currentFormats.push({
        id: format.id,
        label: format.name,
        value: format.name,
      })
    })

    return currentFormats;
  }

  getPlatformAdTypes(adTypes) {
    if (!_.isEmpty(adTypes)) {
      this.setState({
        adTypeOption: adTypes[0]
      })
    }
  }

  showFollowersCount() {
    const { followers } = this.state;

    if (_.isNumber(followers)) {
      return followers !== 0 ? `не менее ${followers}` : `любое`
    }
  }

  componentWillMount() {
    const { dispatch, user } = this.props;

    dispatch(platformActions.getAllFormats(user.api_token, 'instagram'));
    dispatch(platformActions.getAllAdTypes(user.api_token));
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { platform } = nextProps;
  
      if (!platform.fetching) {
        const { formats, adTypes } = platform;
        
        const currentFormats = this.getPlatformFormats(formats);

        if (!_.isEmpty(currentFormats) && !_.isEmpty(adTypes)) {
          this.setState({
            currentFormats,
            adFormatOption: currentFormats[0],
            adTypeOption: adTypes[0],
            ad_format_id: currentFormats[0].id,
            ad_type_id: adTypes[0].id,
          })
        }
      }
    }
  }

  render() {
    const { tasks, platform, alert } = this.props;
    const { socials, adTypes } = platform;
    const {
      editorState,
      currentFormats,
      platformOption,
      adFormatOption,
      adTypeOption,
      title,
      followers,
      dimensions,
      deadline,
      isDeadlineChecked,
      budget,
      submitted,
      description,
        type,
        typeFormats,
        barterText,
        barterImage
    } = this.state;
    const { width } = dimensions;

    const isSmallDevice = width < 768;

    return (
      <div className="tasks">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} lg={10} xl={8}>
              <h2 className="tasks-heading">Добавить задание</h2>
              {!platform.fetching && <Card className="tasks-create">
                <CardBody>
                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">1) Выберите соцсеть:</h5>
                    <Row>
                      <Col xs={12} sm={6}>
                        <Select
                          value={platformOption}
                          options={socials}
                          placeholder={<span>Выберите соцсеть</span>}
                          searchable={false}
                          clearable={false}
                          valueComponent={valueWithIcon}
                          optionComponent={optionWithIcon}
                          onChange={this.handleSelectPlatform}
                          autosize={false}
                          multi={true}
                          removeSelected={false}
                        />
                      </Col>
                      <Col xs={12} sm={6} className="tasks-create__platform-info">
                        {_.has(platformOption, 'value') && _.isEqual(platformOption.value, 'instagram') && <p>
                            Позволяет познакомить новую аудиторию с брендом.
                            Подходит для продвижения и получения мобильного трафика с корпоративных инста-аккаунтов
                          </p>}
                        {_.has(platformOption, 'value') && _.isEqual(platformOption.value, 'facebook') && <p>
                            Позволяет работать более точечно и продвигать услуги и продукты через экспертов 
                            и специалистов различных интернет-отраслей и бизнеса
                          </p>}
                        {_.has(platformOption, 'value') && _.isEqual(platformOption.value, 'youtube') && <p>
                            Идеально подходит для продвижения массовых товаров и интернет-услуг.
                            За счет видео-формата такая реклама характеризуется более 
                            глубоким проникновением в аудиторию
                          </p>}
                        {_.has(platformOption, 'value') && _.isEqual(platformOption.value, 'telegram') && <p>
                            Позволяет работать более точечно и продвигать услуги и продукты через экспертов
                            и специалистов различных интернет-отраслей и бизнеса
                          </p>}
                      </Col>
                    </Row>
                  </div>
                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">2) Тип рекламы:</h5>
                    <Row>
                      <Col xs={12} sm={6}>
                        <Select
                          value={adTypeOption}
                          options={adTypes}
                          placeholder={<span>Выберите тип рекламы:</span>}
                          searchable={false}
                          clearable={false}
                          onChange={this.handleSelectAdType}
                          autosize={false}
                        />
                      </Col>
                      <Col xs={12} sm={6} className="tasks-create__platform-info">
                        {_.has(adTypeOption, 'label') && _.isEqual(adTypeOption.label, 'Реклама бренда или услуги') && <p>
                          Реклама и продвижение товаров, услуг, онлайн-сервисов, бренда или иная реклама коммерческого характера
                        </p>}
                        {_.has(adTypeOption, 'label') && _.isEqual(adTypeOption.label, 'Пиар моей площадки') && <p>
                          Реклама и продвижение вашего канала, блога, в общем, любого социального аккаунта
                        </p>}
                      </Col>
                    </Row>
                  </div>
                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">3) Формат рекламы: </h5>
                    <Row>
                      <Col xs={12} sm={6}>
                        <Select
                          value={adFormatOption}
                          options={currentFormats}
                          placeholder={<span>Выберите формат рекламы:</span>}
                          searchable={false}
                          clearable={false}
                          onChange={this.handleSelectAdFormat}
                          autosize={false}
                        />
                      </Col>
                      <Col xs={12} sm={6} className="tasks-create__platform-info">
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Рекламный пост') && <p>
                          Весь пост будет посвящен только рекламе вашего продукта или услуги
                        </p>}
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Специальный проект') && <p>
                          Конкурс, акция, участие в мероприятиях и различных рекламных проектах
                        </p>}
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Нативная интеграция') && <p>
                          В посте блогера будет размещена небольшая вставка нативной рекламы
                        </p>}
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Комментарий') && <p>
                          Блогер оставит комментарий в заданном вами посте
                        </p>}
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Полноценный рекламный обзор') && <p>
                          Весь ролик будет посвящен только рекламе вашего продукта или услуги
                        </p>}
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Рекламное упоминание') && <p>
                          Упоминание о продукте в начале/середине/конце ролика. Возможна вставка готового прерола
                        </p>}
                        {_.has(adFormatOption, 'label') && _.isEqual(adFormatOption.label, 'Интеграция') && <p>
                        В какую-либо часть ролика блогера будет размещена небольшая вставка нативной рекламы
                        </p>}
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>}
              {!platform.fetching && <Card className="mt-3 mb-3">
                <CardBody>
                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">Краткое описание:</h5>
                    <Input
                      type="text"
                      placeholder="Что нужно сделать блогеру"
                      onChange={this.handleTitleChange}
                      value={title || ""}
                      className={classNames({'is-invalid': submitted && !title })}
                    />
                    {submitted && !title && <div className="invalid-text">Это обязательное поле.</div>}
                  </div>
                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">Подробное описание:</h5>
                    <Editor
                      toolbarClassName="tasks-create__box-editor-toolbar"
                      wrapperClassName={classNames('tasks-create__box-editor-wrap', {'is-invalid': submitted && !description })}
                      editorClassName="tasks-create__box-editor"
                      toolbar={{options: ['inline', 'link', 'emoji', 'colorPicker']}}
                      onEditorStateChange={this.onEditorStateChange}
                      localization={{locale: 'ru'}}
                      placeholder="Распишите как можно более подробно"
                    />
                    {submitted && !description && <div className="invalid-text">Это обязательное поле.</div>}
                  </div>
                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">
                      Кол-во подписчиков блогера: <span className="tasks-create__box-subtitle">{this.showFollowersCount()}</span>
                    </h5>
                    <div className="tasks-create__box-input-range">
                      <InputRange
                        minValue={0}
                        maxValue={500000}
                        step={1000}
                        value={followers}
                        onChange={this.handleFollowersChange}
                      />
                    </div>
                    <p className="text-muted">Вы можете ограничить блогеров, которые смогут откликнуться на ваше задание в публичной ленте заданий. Выберите от какого кол-ва подписчиков блогера вы хотите принимать заявки на рекламу</p>
                  </div>
                  <div className="tasks-create__box">
                    <div className="tasks-create__box-datepicker-wrap">
                      <FormGroup check className="tasks-create__box-datepicker-checkbox">
                        <Label check htmlFor="male">
                          <Input id="male" type="checkbox" checked={isDeadlineChecked} onChange={this.handleCheckDeadline} />
                          <span className="label-text tasks-create__box-title">Установить дедлайн</span>
                        </Label>
                      </FormGroup>
                      <div className="tasks-create__box-datepicker">
                        <FontAwesome
                          name="calendar"
                          className="tasks-create__box-datepicker-icon disabled"
                          onClick={() => this.refs.datepicker.deferFocusInput()}
                        />
                        <DatePicker
                          selected={isDeadlineChecked ? moment(deadline) : null}
                          onChange={this.handleDeadlineChange}
                          minDate={moment()}
                          dateFormat="YYYY-MM-DD"
                          withPortal={isSmallDevice}
                          disabledKeyboardNavigation={isSmallDevice}
                          className="tasks-create__box-datepicker-input"
                          disabled={!isDeadlineChecked}
                          ref="datepicker"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>


                  <div className="tasks-create__box">
                    <h5 className="tasks-create__box-title">
                      Тип оплаты рекламной компании:
                    </h5>


                      <Row>
                          <Col xs={12} sm={6}>
                              <Select
                                  value={type}
                                  options={typeFormats}
                                  placeholder={<span>Выберите формат рекламы:</span>}
                                  searchable={false}
                                  clearable={false}
                                  onChange={this.handleSelectPaymentType}
                                  autosize={false}
                              />
                          </Col>
                          <Col xs={12} sm={6} className="tasks-create__platform-info">
                              {
                                  type === 'money' ? (<p>
                                      Текст если выбран бюджет. Вот такая вот заглушка
                                  </p>) : ('')
                              }
                              {
                                  type === 'barter' ? (<p>
                                      С вас будет снято 30% от рекомендуемой стоимости блогера
                                  </p>) : ('')
                              }
                              {
                                  type === 'money_and_barter' ? (<p>
                                      С вас будет снято 15% от рекомендуемой стоимости блогера
                                  </p>) : ('')
                              }
                          </Col>
                      </Row>
                      { type === 'money' || type === 'money_and_barter'  ? (<Row>
                          <Col>

                              <Input
                                  type="number"
                                  value={budget}
                                  onChange={this.handleChangeBudget}
                                  className="tasks-create__box-input-budget"
                              />
                          </Col>
                      </Row>) : ('') }
                      { type === 'barter' || type === 'money_and_barter'  ? (<Row>
                          <Col>
                              <Label for="textarea">Условия бартера</Label>
                              <Input
                                value={barterText}
                                type="textarea"
                                id="textarea"
                                maxLength="1000"
                                rows = "8"
                                onChange={this.handleChangeBarterText}
                              />
                              <Label for="barterFile" style={{ display : 'none'}}>Приложение</Label>
                            <Input
                                type="file"
                                id="barterFile"
                                onChange={this.handleChangeBarterFile}
                                style={{ display : 'none'}}
                            />
                          </Col>
                      </Row>) : ('') }

                  </div>



                </CardBody>
                <CardFooter>
                  <div className="tasks-create__footer">
                    <Button
                      color="success"
                      className="tasks-create__footer-btn d-flex align-items-center justify-content-center"
                      onClick={this.handleSubmit}
                      outline
                      size="sm"
                    >
                      {tasks.fetching ? <ClipLoader color={"#fff"} size={24} /> : "Сохранить"}
                    </Button>
                    <Button
                      color="success"
                      className="tasks-create__footer-btn d-flex align-items-center justify-content-center"
                      onClick={(e) => this.handleSubmit(e, 'reviewing')}
                      outline
                      size="sm"
                    >
                      {tasks.fetching ? <ClipLoader color={"#fff"} size={24} /> : "Отправить на модерацию"}
                    </Button>
                  </div>
                  {alert.message && <AlertNotify alert={alert} modal />}
                </CardFooter>
              </Card>}
            </Col>
          </Row>
          {platform.fetching && <div className="loader">
            <ClipLoader width={100} />
          </div>}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    user,
    platform,
    tasks,
    alert,
  } = state;

  return {
    user,
    platform,
    tasks,
    alert,
  }
}

const connectedCreateTask = connect(mapStateToProps)(CreateTask);
export {
  connectedCreateTask as CreateTask
}