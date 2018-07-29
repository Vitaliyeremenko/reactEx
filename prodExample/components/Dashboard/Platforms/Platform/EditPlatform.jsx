import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';
import {
  alertActions,
  platformActions,
  userActions
} from '../../../../actions';
import {
  EditorState,
  convertToRaw,
  ContentState
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { AlertNotify } from '../../../../components';
import { ClipLoader } from 'react-spinners';

class EditPlatform extends Component {
  constructor(props) {
    super(props);

    // handlers
    this.getPlatformCategories = this.getPlatformCategories.bind(this);
    this.getPlatformDescription = this.getPlatformDescription.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getAllFormats = this.getAllFormats.bind(this);

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // state
    this.state = {
      maxPrice: 100000000,
      submitted: false,
      description: "",
      platformCategories: [],
      platformCategoriesCount: 3,
      platformFormats: [],
    };
  }

  getAllCategories(api_token) {
    const { dispatch } = this.props;

    dispatch(platformActions.getAllCategories(api_token));
  }

  getAllFormats(api_token) {
    const { dispatch } = this.props;

    dispatch(platformActions.getAllFormats(api_token, this.props.match.params.platform));
  }

  getPlatformCategories(user = {}, allCategories = []) {
    if (_.has(user[this.props.match.params.platform], 'platform')) {
      const { platform } = user[this.props.match.params.platform];

      if (_.has(platform, 'categories')) {
        const { categories } = platform;

        if (!_.isEmpty(categories) && !_.isEmpty(allCategories)) {
          const platformCategories = _.map(categories, (platformCategory) => {
            return _.filter(allCategories, (category) => {
              return platformCategory.id === category.id;
            })[0]
          });

          this.setState({
            platformCategories
          })
        }
      }
    }
  }

  getPlatformDescription(user) {
    if (_.has(user[this.props.match.params.platform], 'platform')) {
      const { platform } = user[this.props.match.params.platform];

      if (_.has(platform, 'description')) {
        const { description } = platform;
  
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
    }
  }

  getPlatformFormats(user = {}, allFormats = []) {
    if (_.has(user[this.props.match.params.platform], 'platform')) {
      const { platform } = user[this.props.match.params.platform];

      if (_.has(platform, 'ad_formats')) {
        const { ad_formats } = platform;

        const platformFormats = _.map(ad_formats, (format, index) => {
          const { name, id } = format;
          
          if (_.has(format, 'pivot')) {
            const {
              pivot
            } = format;
            const {
              price
            } = pivot;

            return {
              id,
              name,
              price: _.toNumber(price),
              checked: true
            };
          }

          return {
            ...format,
            checked: false,
          }
        })

        this.setState({
          platformFormats: _.unionBy(platformFormats, allFormats, 'id'),
        })
      }
    }
  }

  componentWillMount() {
    const { user } = this.props;
    
    // get all data before component initialized
    this.getAllCategories(user.api_token);
    this.getAllFormats(user.api_token);
    this.getPlatformDescription(user);
  }

  componentWillReceiveProps(nextProps) {
    const { user, platform } = nextProps;

    if (!user.fetching) {
      this.getPlatformCategories(user, platform.categories);
      this.getPlatformFormats(user, platform.formats)
    }
  }

  componentDidMount() {}

  onEditorStateChange(editorState) {
    const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    this.setState({
      description,
      editorState
    })
  };

  onCategorySelect(category, index) {
    const { platformCategories } = this.state;

    platformCategories[index] = category;

    this.setState({
      platformCategories
    })
  };

  onFormatChange(e, format, index) {
    const {
      value,
      type
    } = e.target;
    const { platformFormats } = this.state;
    
    if (type === 'checkbox') {
      platformFormats[index].checked = !format.checked;
    } else {
      platformFormats[index].price = _.toNumber(value);
    }

    this.setState({
      platformFormats
    })
  }

  onSubmit(e) {
    const { target } = e;
    const {
      user,
      dispatch
    } = this.props;
    const {
      maxPrice,
      platformCategories,
      platformFormats,
      description,
    } = this.state;
    
    const selectedFormats = _.filter(platformFormats, format => {
      const {
        price,
        checked
      } = format;

      if (price && checked) {
        if (price < maxPrice && price > 0) {
          return format;
        }
      }
    })

    const selectedCategories = _.filter(platformCategories, category => !_.isNull(category) && !_.isUndefined(category));

    this.setState({
      submitted: true
    })

    if (!_.isEmpty(selectedFormats) && !_.isEmpty(selectedCategories)) {
      dispatch(alertActions.clear());
      dispatch(userActions.editInstagram(user, {
        description,
        categories: selectedCategories,
        ad_formats: selectedFormats,
      }))
    }
  }

  render() {
    // props
    const {
      user,
      alert,
      platform,
    } = this.props;

    // state
    const {
      maxPrice,
      editorState,
      platformCategories,
      platformCategoriesCount,
      platformFormats,
      submitted,
    } = this.state;

    // platforms
    const { instagram } = user;

    return (
      <div className="platforms">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={6}>
              <h2 className="platforms-heading">
                Редактировать площадку
              </h2>

              {this.props.match.params.platform === "instagram" && <div>
                <div className="platforms__item">
                  <div className="platforms__item-header">
                    <div className="user-box">
                      <div className="user-box__avatar" style={{ backgroundImage: `url(${instagram.profile_picture})` }} />
                      <div className="user-box__info">
                        <div className="user-box__user">
                          <FontAwesome name={instagram.platform.type} className={`user-box__user-social ${instagram.platform.type}`} />
                          <div className="user-box__user-name">
                            <a href={`//instagram.com/${instagram.username}`}>
                              {instagram.username}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="platforms__item-body">
                    <h5 className="mt-3">Информация о площадке:</h5>

                    <Editor
                      wrapperClassName="platforms__item-editor-wrap"
                      editorClassName="platforms__item-editor"
                      toolbar={{options: ['inline', 'link', 'emoji']}}
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      localization={{locale: 'ru'}}
                    />

                    {platform && platform.fetching && <div className="text-center">
                      <ClipLoader color={"#333"} size={24} />
                    </div>}

                    {platform && <div className="categories">
                      <h5 className="categories-title">Категории площадки:</h5>

                      <Row>
                      {[...Array(platformCategoriesCount)].map((item, index) => (
                        <Col xs={12} lg={4} key={index}>
                          <Select
                            className="categories-select"
                            name="platform-categories"
                            value={platformCategories[index] || ''}
                            onChange={(e) => this.onCategorySelect(e, index)}
                            options={platform.categories}
                            clearable={false}
                            placeholder={<span>Выберите категорию</span>}
                          />
                        </Col>
                      ))}
                    </Row>
                    {submitted && _.isEmpty(_.filter(platformCategories, (category) => _.isObject(category))) && <div className="text-danger mb-2">Выберите хотя бы 1 категорию для площадки.</div>}
                    </div>}

                    {platform &&
                    <div className="a10formats">
                    <h5 className="a10formats-title">Доступные форматы рекламы:</h5>
                    <div>
                      {platformFormats.map((format, index) => {
                        const {
                          name,
                          price,
                          checked,
                        } = format;

                        return (<FormGroup key={index}>
                          <div>
                            <Label check htmlFor={name} className="a10formats-label">
                              <Input
                                id={name}
                                type="checkbox"
                                name={name}
                                // value={price || ""}
                                defaultChecked={checked}
                                onChange={(e) => this.onFormatChange(e, format, index)}
                              />
                              <span className="label-text">{name}</span>
                            </Label>
                            <div className="a10formats-input">
                              <Input
                                className="a10formats-input-price"
                                type="number"
                                min="0"
                                name={name}
                                onChange={(e) => this.onFormatChange(e, format, index)}
                                value={price || ""}
                              />
                              <FontAwesome
                                name="bolt"
                                className="a10formats-input-icon"
                              />
                            </div>
                          </div>
                          {submitted && _.isNumber(price) && price > 0 && !checked && <div className="text-danger">Вы не подтвердили введенную сумму.</div>}
                          {_.isNumber(price) && price > maxPrice && <div className="text-danger">Введенная сумма должна быть меньше {maxPrice}</div>}
                        </FormGroup>)
                      })}
                      {submitted && _.isEmpty(_.filter(platformFormats, format => format.price > 0)) && <div className="text-danger mb-2">Выберите хотя бы 1 формат для рекламы.</div>}
                    </div>
                  </div>}
                  </div>
                  <div className="platforms__item-bottom">
                    <Button color="success" outline size="sm" className="d-flex align-items-center justify-content-center" onClick={this.onSubmit}>
                      {user && user.fetching ? <ClipLoader color={"#fff"} size={24} /> : "Сохранить"}
                    </Button>
                  </div>
                  {alert.message && <AlertNotify alert={alert} />}
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
  const {
    user,
    alert,
    platform,
  } = state;

  return {
    user,
    alert,
    platform,
  }
}

const connectedEditPlatform = connect(mapStateToProps)(EditPlatform);

export {
  connectedEditPlatform as EditPlatform
}