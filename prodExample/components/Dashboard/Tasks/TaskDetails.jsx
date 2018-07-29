import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Task } from './';
import {
  alertActions,
  dealsActions,
} from '../../../actions';
import { AlertNotify } from '../../../components';

class TaskDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.createDeal = this.createDeal.bind(this);
  }

  createDeal(taskId) {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    dispatch(alertActions.clear());
    dispatch(dealsActions.bloggerCreate(api_token, taskId));
  }

  render() {
    const { items, alert } = this.props;
    const isNotEmptyItems = !_.isEmpty(items);

    return (
      <div className="tasks">
        {alert.message && <AlertNotify alert={alert} modal />}

        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={10} xl={6}>
              <h3 className="tasks-heading">Просмотр задания</h3>
              {isNotEmptyItems && _.map(items, (task, index) => (
                <Task
                  key={index}
                  info={task}
                  hasLink={false}
                  onBloggerCreateDeal={this.createDeal}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { tasks, alert, user } = state;
  const { items } = tasks;

  return {
    items: items.filter(task => task.id === Number(props.match.params.id)),
    alert,
    user,
  };
}

const connectedTaskDetails = connect(mapStateToProps)(TaskDetails);

export {
  connectedTaskDetails as TaskDetails
}