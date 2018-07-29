import React, { Component } from "react"
import { Row, Col, Button } from "reactstrap"
import FontAwesome from "react-fontawesome"
import ReactStars from "react-stars"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { declension } from "../../../helpers"

class Blogger extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.handleChangeRating = this.handleChangeRating.bind(this)
  }

  handleChangeRating() {}

  render() {
    const { blogger, hasProfileLink } = this.props

    if (_.has(blogger, 'instagram')) {
      const { first_name, city_ru, country_ru, age, id, instagram, rating } = blogger;
      const { profile_picture, count_followed_by, reach, recommended_price } = instagram;
  
      return (
        <div className="bloggers-search__list-item box-shadow">
          <div className="bloggers-search__list-item-info">
            <div className="bloggers-search__list-item-avatar">
              <img src={_.toString(profile_picture)} alt="blogger's avatar" />
            </div>
            <div className="bloggers-search__list-item-name">
              <span>{first_name || ''}</span>
              <div className="bloggers-search__list-item-name-inner">
                <small className="location">
                  {country_ru || ''}, {city_ru || ''}
                </small>
                <span className="age">
                  {declension(age, ["год", "года", "лет"])}
                </span>
              </div>
              {hasProfileLink && <Link 
                className="d-none d-xl-inline link"
                to={`/dashboard/blogger/profile/${id}`}
              >
                <Button
                  className="mt-2 mb-2"
                  color="success"
                  outline
                  size="sm"
                >
                  {'Профиль'}
                </Button>
              </Link>}
            </div>
            <div className="bloggers-search__list-item-rating ml-auto d-sm-none">
              <ReactStars
                className="d-flex justify-content-center"
                count={5}
                value={rating}
                // onChange={ratingChanged}
                size={14}
                edit={false}
                color1={"#ecf0f1"}
                color2={"#00b41c"}
              />
              <small className="label">Общий рейтинг</small>
            </div>
            <div className="bloggers-search__list-item-rating ml-auto d-none d-sm-block d-xl-none">
              <ReactStars
                className="d-flex justify-content-center"
                count={5}
                value={rating}
                // onChange={ratingChanged}
                size={24}
                edit={false}
                color1={"#ecf0f1"}
                color2={"#00b41c"}
              />
              <small className="label">Общий рейтинг</small>
            </div>
          </div>
  
          <div className="bloggers-search__list-item-panel">
            <Row
              noGutters
              className="align-items-center justify-content-center"
            >
              <Col xs={6} sm={6} xl={4}>
                <div className="bloggers-search__list-item-reach">
                  <div className="value">{reach}</div>
                  <small className="label">
                    Охват качественной{" "}
                    <span className="linebreak">аудитории.</span>
                  </small>
                </div>
              </Col>
              <Col xs={6} sm={6} xl={4}>
                <div className="bloggers-search__list-item-price">
                  <div className="value">
                    {recommended_price} <FontAwesome className="rub" name="bolt" />
                  </div>
                  <small className="label">
                    Рекомендованная{" "}
                    <span className="linebreak">стоимость рекламы.</span>
                  </small>
                </div>
              </Col>
              <Col xs={12} sm={6} xl={4}>
                <div className="bloggers-search__list-item-rating text-center d-none d-xl-block">
                  <ReactStars
                    className="d-flex justify-content-center"
                    count={5}
                    value={rating}
                    // onChange={ratingChanged}
                    size={24}
                    edit={false}
                    color1={"#ecf0f1"}
                    color2={"#00b41c"}
                  />
                  <small className="label">Общий рейтинг</small>
                </div>
              </Col>
              <Col
                className="d-xl-none"
                xs={12}
              >
                {hasProfileLink && <Link to={`/dashboard/blogger/profile/${id}`}>
                  <Button
                    className="bloggers-search__list-item-btn"
                    color="success"
                    outline
                    size="sm"
                  >
                    {'Перейти в профиль'}
                  </Button>
                </Link>}
              </Col>
            </Row>
          </div>
        </div>
      )
    }

    return null
  }
}

Blogger.propTypes = {
  blogger: PropTypes.object.isRequired,
  hasProfileLink: PropTypes.bool,
}

export { Blogger }
