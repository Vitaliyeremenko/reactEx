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

class EditTask extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentFormats: [],
      dimensions: {
        width: 0,
      },

      // option for selected component
      platformOption: {},
      adFormatOption: {},
      adTypeOption: {},
      payOption: {},

      // checkboxes
      isDeadlineChecked: false,

      submitted: false,
      // values for request
      platform: "",
      ad_format_id: undefined,
      ad_type_id: undefined,
      title: "",
      description: "",
      budget: undefined,
      followers: 0,
      deadline: "",
    };

    this.getPlatform = this.getPlatform.bind(this);
    this.getAdType = this.getAdType.bind(this);
    this.getAdFormat = this.getAdFormat.bind(this);
    this.getFollowers = this.getFollowers.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getDeadline = this.getDeadline.bind(this);
    this.getBudget = this.getBudget.bind(this);

    this.handleSelectPlatform = this.handleSelectPlatform.bind(this);
    this.handleSelectAdType = this.handleSelectAdType.bind(this);
    this.handleSelectAdFormat = this.handleSelectAdFormat.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleFollowersChange = this.handleFollowersChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.handleCheckDeadline = this.handleCheckDeadline.bind(this);
    this.handleChangeBudget = this.handleChangeBudget.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.showFollowersCount = this.showFollowersCount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getAdType(nextProps);
      this.getAdFormat(nextProps);
    }
  }

  componentWillMount() {
    const { dispatch, user, task } = this.props;
    const { platform } = task;

    dispatch(platformActions.getAllFormats(user.api_token, platform));
    dispatch(platformActions.getAllAdTypes(user.api_token));
  }

  componentDidMount() {
    this.getPlatform();
    this.getTitle();
    this.getDescription();
    this.getFollowers();
    this.getDeadline();
    this.getBudget();
    this.handleResize();

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  getPlatform() {
    const { task, platform } = this.props;

    this.setState({
      platform: task.platform,
      platformOption: {
        label: platform.socials.filter(platform => platform.value === task.platform)[0].label,
        value: task.platform,
        icon: task.platform
      }
    })
  }

  getAdType(props) {
    const { task, platform } = props;

    if (_.has(platform, 'adTypes')) {
      this.setState({
        adTypeOption: platform.adTypes.filter(adType => adType.id === task.ad_type.id)[0],
        ad_type_id: task.ad_type.id
      })
    }
  }

  getAdFormat(props) {
    const { task, platform } = props;

    if (_.has(platform, 'formats')) {
      const currentFormats = [];

      _.map(platform.formats, format => {
        currentFormats.push({
          id: format.id,
          label: format.name,
          value: format.name,
        })
      })

      this.setState({
        adFormatOption: currentFormats.filter(format => format.id === task.ad_format.id)[0],
        ad_format_id: task.ad_format.id,
        currentFormats
      })
    }
  }

  getTitle() {
    const { task } = this.props;
    const { title } = task;

    this.setState({
      title
    })
  }

  getFollowers() {
    const { task } = this.props;
    const { followers } = task;

    this.setState({
      followers
    })
  }

  getDescription() {
    const { task } = this.props;
    const { description } = task;

    if (description) {
      const contentBlock = htmlToDraft(description);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);

      this.setState({
        editorState,
        description
      })
    }
  }

  getDeadline() {
    const { task } = this.props;
    const { deadline } = task;

    if (deadline) {
      this.setState({
        deadline,
        isDeadlineChecked: true
      })
    }
  }

  getBudget() {
    const { task } = this.props;
    const { budget } = task;

    if (budget) {
      this.setState({
        budget: _.toNumber(budget)
      })
    }
  }

  handleSelectPlatform(platform) {
    const { dispatch, user } = this.props;
    const { value } = platform;

    dispatch(platformActions.getAllFormats(user.api_token, value))
    
    this.setState({
      platformOption: platform,
      platform: value,
    })
  }

  handleSelectAdType(adType) {
    const { id } = adType;

    this.setState({
      adTypeOption: adType,
      ad_type_id: id
    })
  }

  handleSelectAdFormat(adFormat) {
    const { id } = adFormat;

    this.setState({
      adFormatOption: adFormat,
      ad_format_id: id
    })
  }

  handleTitleChange(e) {
    const { value } = e.target;

    this.setState({
      title: value
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

    this.setState({ description: "", editorState });
  };

  handleFollowersChange(value) {
    this.setState({
      followers: value
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

  handleSubmit(e) {
    const {
      dispatch,
      user,
      task,
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
    } = this.state;
    const { id } = task;
    const { api_token } = user;

    dispatch(alertActions.clear())

    this.setState({
      submitted: true
    })

    dispatch(tasksActions.edit({
      api_token,
      platform,
      ad_format_id,
      ad_type_id,
      budget,
      followers,
      title,
      description,
      deadline: isDeadlineChecked ? deadline : undefined,
      id,
    }))
  }

  showFollowersCount() {
    const { followers } = this.state;

    if (_.isNumber(followers)) {
      return followers !== 0 ? `не менее ${followers}` : `любое`
    }
  }

  render() {
    const {
      tasks,
      task,
      user,
      platform,
      alert
    } = this.props;
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
    } = this.state;
    const { width } = dimensions;

    const isSmallDevice = width < 768;

    if (task && _.isEqual(task.advertiser_id, user.id)) {
      return (
        <div className="tasks">
          <Container fluid>
            <Row className="justify-content-center">
              <Col xs={12} lg={10} xl={8}>
                <h2 className="tasks-heading">Редактировать задание</h2>
                  {!platform.fetching && <Card className="tasks-create">
                  <CardBody>
                    <div className="tasks-create__box">
                      <h5 className="tasks-create__box-title">1) Выберите соцсеть:</h5>
                      <Row>
                        <Col xs={12} sm={6}>
                          <Select
                            value={platformOption}
                            options={platform.socials}
                            placeholder={<span>Выберите соцсеть</span>}
                            searchable={false}
                            clearable={false}
                            valueComponent={valueWithIcon}
                            optionComponent={optionWithIcon}
                            onChange={this.handleSelectPlatform}
                            autosize={false}
                            disabled
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
                        </Col>
                      </Row>
                    </div>
                    <div className="tasks-create__box">
                      <h5 className="tasks-create__box-title">2) Тип рекламы:</h5>
                      <Row>
                        <Col xs={12} sm={6}>
                          <Select
                            value={adTypeOption}
                            options={platform.adTypes}
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
                        editorState={editorState}
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
                        Бюджет на рекламную компанию:
                      </h5>
                      <Input
                        type="number"
                        value={budget}
                        onChange={this.handleChangeBudget}
                        className="tasks-create__box-input-budget"
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="tasks-create__footer">
                      <Button
                        color="success"
                        outline
                        size="sm"
                        className="tasks-create__footer-btn d-flex align-items-center justify-content-center ml-auto"
                        onClick={this.handleSubmit}
                      >
                        {tasks.fetching ? <ClipLoader color={"#fff"} size={24} /> : "Сохранить"}
                      </Button>
                      {alert.message && <AlertNotify alert={alert}/>}
                    </div>
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

    return null;
  }
}

function mapStateToProps(state, props) {
  const { tasks, user, platform, alert } = state;
  const { ownTasks } = tasks;

  return {
    tasks,
    task: ownTasks.filter(task => task.id === Number(props.match.params.id))[0],
    user,
    platform,
    alert
  }
}

const connectedEditTask = connect(mapStateToProps)(EditTask);

export {
  connectedEditTask as EditTask
}