import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  Button,
} from 'reactstrap';
import {
  Link,
} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import renderHTML from 'react-render-html';
import classNames from 'classnames';
import {
  parseTaskStatus
} from '../../../helpers';

const Task = ({ info, hasLink, hasStatus, hasEditButton, showCompleted, onBloggerCreateDeal, onReview }) => {
  const {
    id,
    platform,
    type,
    deadline,
    description,
    title,
    created_at,
    ad_format,
    ad_type,
    budget,
    status,
      deals
  } = info;
    console.log(deals);
  const isBefore = moment(deadline).isBefore(moment());
  const isVisible = showCompleted || !isBefore;
  if (info && isVisible) {
    return (
      <Card className="task">
        <CardHeader>
          <div className="d-sm-flex justify-content-sm-between">
            <div>
              <FontAwesome name={platform} className={`task-platform ${platform}`} />
              <span className="task-number">Задание №{id}</span>
              <div className="task-date">Добавлено: {moment.utc(created_at).fromNow()}</div>
              <div className="task-budget">Бюджет: {budget} <FontAwesome name="bolt" /></div>
            </div>
            <div className="text-sm-right">
              <div className="task-type">{_.has(ad_type, 'name') && ad_type.name}</div>
              <div className="task-format">{_.has(ad_format, 'name') && ad_format.name}</div>
              <div className="task-deadline">{deadline && `Дедлайн: ${moment.utc(deadline).fromNow()}`}</div>
            </div>
          </div>
        </CardHeader>

        <CardBody className="task-body">
          <CardTitle className="task-title">
            {hasLink && !isBefore && status === 'approved' ? <Link to={`/dashboard/tasks/task/${id}`}>
              {title}
            </Link> : <span>{title}</span>}
          </CardTitle>
          <div className="task-text">
            {renderHTML(description)}
          </div>
        </CardBody>

        <CardFooter>
          {hasStatus && !isBefore 
            ? <span className={`task-status ${status}`}>
              <strong className="text-muted">Статус:</strong>
              <span className="task-status-message"> {parseTaskStatus(status).message || ''}</span>
            </span> 
            : hasStatus && <span className="task-status rejected">
              <strong className="text-muted">Статус:</strong>
              <span className="task-status-message"> задание неактивно (истекло время выполнения)</span>
            </span>
          }
          <div className="task-buttons">
            {!hasStatus && <Button
              size="sm"
              color="success"
              outline
              className="task-buttons-offer-button"
              onClick={() => onBloggerCreateDeal(id)}
            >Предложить свою площадку
            </Button>}
            {hasEditButton && status === 'saved' && <Link to={`/dashboard/tasks/edit/${id}`}>
              <Button size="sm" color="success" outline className="task-buttons-edit-button">
                Редактировать
              </Button>
            </Link>}
            {status === 'saved' && <div>
              <Button
                size='sm'
                color="success"
                outline
                className="task-buttons-edit-button"
                onClick={(e) => onReview(id)}
              >
                Отправить на модерацию
              </Button>
            </div>}
          </div>
        </CardFooter>
        <CardFooter>
          <div style={{
            maxHeight: '100px',
              overflow: 'auto'
          }}>
            {
              deals.map((user,index) => (
                  <div key={index} className="deals-card-blogger-info">
                      <img
                          src={user.blogger.instagram.profile_picture}
                          className="avatar"
                          alt="blogger avatar"/>
                      <div className="user">
                          <span className="name">{user.blogger.instagram.username} {user.blogger.first_name ? `(${user.blogger.first_name})` : ''}</span>
                          <span className="followers">
                                <strong>Подписчики: </strong>
                                <span>{user.blogger.instagram.count_followed_by}</span>
                              </span>
                          <Link to={`/dashboard/blogger/profile/${user.blogger.id}`}>
                              Посмотреть профиль
                          </Link>
                      </div>
                  </div>
              ))
            }
          </div>
        </CardFooter>
      </Card>
    );
  }

  return null;
}

export {
  Task
}