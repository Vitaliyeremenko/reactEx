import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import Select, { Async } from 'react-select';
import FontAwesome from 'react-fontawesome';
import {
  optionWithIcon, 
  valueWithIcon,
} from '../../../components';
import {
  platformActions,
  bloggersActions,
  alertActions,
} from '../../../actions';

class BloggersSearchFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCategories: [],
      currentPlatforms: [],
      genders: [
        {
          label: 'Все',
          value: undefined
        },
        {
          label: 'Мужской',
          value: 1,
          icon: 'male'
        },
        {
          label: 'Женский',
          value: 2,
          icon: 'female'
        }
      ],
      ages: [
        {
          label: 'Все',
          value: {
            age_min: undefined,
            age_max: undefined,
          }
        },
        {
          label: '13-17',
          value: {
            age_min: 13,
            age_max: 17,
          }
        },
        {
          label: '18-25',
          value: {
            age_min: 18,
            age_max: 25,
          }
        },
        {
          label: '26-34',
          value: {
            age_min: 26,
            age_max: 34,
          }
        },
        {
          label: 'от 35',
          value: {
            age_min: 35,
            age_max: 99999,
          }
        }
      ],
      prices: [
        {
          label: 'Все',
          value: {
            price_min: undefined,
            price_max: undefined,
          },
        },
        {
          label: 'до 5000',
          value: {
            price_min: 0,
            price_max: 5000,
          },
        },
        {
          label: '5000 - 20000',
          value: {
            price_min: 5000,
            price_max: 20000,
          }
        },
        {
          label: '20000 - 50000',
          value: {
            price_min: 20000,
            price_max: 50000,
          }
        },
        {
          label: '50000 - 10000',
          value: {
            price_min: 50000,
            price_max: 100000,
          }
        },
        {
          label: 'от 100000',
          value: {
            price_min: 100000,
            price_max: 999999999,
          }
        }
      ],
      searchParams: {
        page: 1,
        platform: 'all',
        age: undefined,
        per_page: 1,
        category_id: undefined,
        gender_id: undefined,
        city_id: undefined,
      },
      selectedFilters: {
        platform: {
          label: 'Все',
          value: 'all',
        },
        category: {
          label: 'Все',
          value: '',
          id: undefined,
        },
        gender: {
          label: 'Все',
          value: undefined
        },
        city: {
          label: 'Все',
          value: undefined
        },
        age: {
          label: 'Все',
          value: {
            age_min: undefined,
            age_max: undefined
          }
        },
        price: {
          label: 'Все',
          value: {
            price_min: undefined,
            price_max: undefined,
          },
        }
      }
    };

    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCities = this.getCities.bind(this);

    this.updateCategories = this.updateCategories.bind(this);
    this.updatePlatforms = this.updatePlatforms.bind(this);

    this.handleSelectPlatform = this.handleSelectPlatform.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleSelectGender = this.handleSelectGender.bind(this);
    this.handleSelectCity = this.handleSelectCity.bind(this);
    this.handleSelectAge = this.handleSelectAge.bind(this);
    this.handleSelectPrice = this.handleSelectPrice.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);

    this.handleRefresh();
  }

  getAllCategories(api_token) {
    const { dispatch } = this.props;

    dispatch(platformActions.getAllCategories(api_token));
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

  updateCategories(categories) {
    if (!_.isEmpty(categories)) {
      this.setState({
        currentCategories: [
          {
            id: undefined,
            label: 'Все',
            value: 'all'
          },
          ...categories
        ]
      })
    }
  }

  updatePlatforms(platforms) {
    if (!_.isEmpty(platforms)) {
      this.setState({
        currentPlatforms: [
          {
            label: 'Все',
            value: 'all',
            icon: ''
          },
          ...platforms
        ]
      })
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { platform } = nextProps;
    const { 
      categories,
      socials
    } = platform;

    this.updateCategories(categories);
    this.updatePlatforms(socials);
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    this.getAllCategories(api_token);

    let searchParams = JSON.parse(localStorage.getItem('bloggersSearchParams'));
    if (_.isNull(searchParams)) {
      const { searchParams } = this.state;
  
      dispatch(bloggersActions.search({
        ...searchParams,
        api_token
      }));
    } else {
      dispatch(bloggersActions.search({
        ...searchParams,
        api_token
      }));
    }
  }

  componentDidMount() {
    let selectedFilters = JSON.parse(localStorage.getItem('selectedBloggersSearchFilters'));
    let searchParams = JSON.parse(localStorage.getItem('bloggersSearchParams'));

    if (!_.isNull(selectedFilters)) {
      this.setState({
        selectedFilters
      })
    }

    if (!_.isNull(searchParams)) {
      this.setState({
        searchParams
      })
    }
  }
  componentDidUpdate() {
    const { selectedFilters } = this.state;

    localStorage.setItem('selectedBloggersSearchFilters', JSON.stringify(selectedFilters));
  }

  handleSelectPlatform(platform) {
    const { dispatch, user } = this.props; 
    const { searchParams, selectedFilters } = this.state;
    const { value } = platform;
    const { api_token } = user;

    dispatch(alertActions.clear());

    if (value) {
      this.setState({
        searchParams: {
          ...searchParams,
          platform: value
        },
        selectedFilters: {
          ...selectedFilters,
          platform
        }
      })

      dispatch(bloggersActions.search({
        ...searchParams,
        api_token,
        platform: value,
      }, true));
    }
  }

  handleSelectCategory(category) {
    const { dispatch, user } = this.props;
    const { searchParams, selectedFilters } = this.state;
    const { id } = category;
    const { api_token } = user;

    dispatch(alertActions.clear());

    this.setState({
      searchParams: {
        ...searchParams,
        category_id: id
      },
      selectedFilters: {
        ...selectedFilters,
        category
      }
    })

    dispatch(bloggersActions.search({
      ...searchParams,
      api_token,
      category_id: id,
    }, true));
  }

  handleSelectGender(gender) {
    const { dispatch, user } = this.props;
    const { searchParams, selectedFilters } = this.state;
    const { value } = gender;
    const { api_token } = user;

    dispatch(alertActions.clear());

    this.setState({
      searchParams: {
        ...searchParams,
        gender_id: value
      },
      selectedFilters: {
        ...selectedFilters,
        gender
      }
    })

    dispatch(bloggersActions.search({
      ...searchParams,
      api_token,
      gender_id: value,
    }, true));
  }

  handleSelectCity(city) {
    const { dispatch, user } = this.props;
    const { searchParams, selectedFilters } = this.state;
    const { api_token } = user;

    dispatch(alertActions.clear());

    if (_.has(city, 'city_id')) {
      const { city_id } = city;
      this.setState({
        searchParams: {
          ...searchParams,
          city_id
        },
        selectedFilters: {
          ...selectedFilters,
          city
        }
      })
  
      dispatch(bloggersActions.search({
        ...searchParams,
        api_token,
        city_id,
      }, true));
    } else {
      this.setState({
        searchParams: {
          ...searchParams,
          city_id: undefined
        },
        selectedFilters: {
          ...selectedFilters,
          city: {
            label: 'Все',
            value: ''
          }
        }
      })
  
      dispatch(bloggersActions.search({
        ...searchParams,
        api_token,
        city_id: undefined
      }, true));
    }
  }

  handleSelectAge(age) {
    const { dispatch, user } = this.props;
    const { searchParams, selectedFilters } = this.state;
    const { api_token } = user;
    const { value } = age;

    dispatch(alertActions.clear());

    this.setState({
      searchParams: {
        ...searchParams,
        ...value
      },
      selectedFilters: {
        ...selectedFilters,
        age
      }
    })

    dispatch(bloggersActions.search({
      ...searchParams,
      api_token,
      ...value
    }, true));
  }

  handleSelectPrice(price) {
    const { dispatch, user } = this.props;
    const { searchParams, selectedFilters } = this.state;
    const { api_token } = user;
    const { value } = price;

    dispatch(alertActions.clear());

    this.setState({
      searchParams: {
        ...searchParams,
        ...value
      },
      selectedFilters: {
        ...selectedFilters,
        price
      }
    })

    dispatch(bloggersActions.search({
      ...searchParams,
      api_token,
      ...value
    }, true));
  }

  handleRefresh() {
    const { dispatch, user } = this.props;
    const { searchParams } = this.state;
    const { api_token } = user;

    dispatch(bloggersActions.search({
      ...searchParams,
      api_token
    }, true))
  }

  render() {
    const {
      platform,
      bloggers,
      alert,
    } = this.props;
    const {
      data
    } = bloggers;
    const {
      selectedFilters,
      currentCategories,
      currentPlatforms,
      genders,
      ages,
      prices,
    } = this.state;

    return (
      <div className="bloggers-search__filters">
        <Container fluid>
          <Row className="align-items-end">
            <Col xs={12} sm={6} lg={4} xl={2}>
              <div className="bloggers-search__filters-item">
                <div className="bloggers-search__filters-item-label">Категории площадки:</div>
                <Select
                  className="bloggers-search__filters-item-select"
                  value={selectedFilters.category}
                  options={currentCategories}
                  placeholder={<span>Выберите категорию</span>}
                  searchable={true}
                  clearable={false}
                  onChange={this.handleSelectCategory}
                  autosize={false}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} lg={4} xl={2}>
              <div className="bloggers-search__filters-item">
                <div className="bloggers-search__filters-item-label">Социальная сеть:</div>
                <Select
                  className="bloggers-search__filters-item-select"
                  value={selectedFilters.platform}
                  options={currentPlatforms}
                  placeholder={<span>Выберите соцсеть</span>}
                  searchable={false}
                  clearable={false}
                  valueComponent={valueWithIcon}
                  optionComponent={optionWithIcon}
                  onChange={this.handleSelectPlatform}
                  autosize={false}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} lg={4} xl={2}>
              <div className="bloggers-search__filters-item">
                <div className="bloggers-search__filters-item-label">Город:</div>
                <Async
                  name="city"
                  value={selectedFilters.city}
                  className="bloggers-search__filters-item-select"
                  loadOptions={this.getCities}
                  onChange={this.handleSelectCity}
                  placeholder="Поиск"
                  searchPromptText="Введите город для поиска"
                  loadingPlaceholder="Загрузка..."
                  clearable={false}
                  autosize={false}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} lg={4} xl={2}>
              <div className="bloggers-search__filters-item">
                <div className="bloggers-search__filters-item-label">Пол:</div>
                <Select
                  className="bloggers-search__filters-item-select"
                  value={selectedFilters.gender}
                  options={genders}
                  placeholder={<span>Выберите пол</span>}
                  searchable={false}
                  clearable={false}
                  onChange={this.handleSelectGender}
                  valueComponent={valueWithIcon}
                  optionComponent={optionWithIcon}
                  autosize={false}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} lg={4} xl={2}>
              <div className="bloggers-search__filters-item">
                <div className="bloggers-search__filters-item-label">Возраст:</div>
                <Select
                  className="bloggers-search__filters-item-select"
                  value={selectedFilters.age}
                  options={ages}
                  placeholder={<span>Выберите возраст</span>}
                  searchable={false}
                  clearable={false}
                  onChange={this.handleSelectAge}
                  autosize={false}
                />
              </div>
            </Col>
            <Col xs={12} sm={6} lg={4} xl={2}>
              <div className="bloggers-search__filters-item">
                <div className="bloggers-search__filters-item-label">Стоимость:</div>
                <Select
                  className="bloggers-search__filters-item-select"
                  value={selectedFilters.price}
                  options={prices}
                  placeholder={<span>Выберите стоимость</span>}
                  searchable={false}
                  clearable={false}
                  onChange={this.handleSelectPrice}
                  autosize={false}
                />
              </div>
            </Col>
            <Col xs={12} className="d-flex">
              <FontAwesome name="refresh" className="bloggers-search-btn-refresh" onClick={this.handleRefresh} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    user,
    bloggers,
    platform,
    alert,
  } = state;

  return {
    user,
    bloggers,
    platform,
    alert,
  }
}

const connectedBloggersSearchFilters = connect(mapStateToProps)(BloggersSearchFilters);

export {
  connectedBloggersSearchFilters as BloggersSearchFilters
}