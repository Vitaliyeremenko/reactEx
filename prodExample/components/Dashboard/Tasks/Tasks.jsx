import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardHeader,
  CardFooter,
  CardText,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { ClipLoader } from 'react-spinners';
import {
  tasksActions,
  alertActions,
  dealsActions,
} from '../../../actions';
import {
  AlertNotify
} from '../../../components';
import { Task } from './';

class Tasks extends Component {
  constructor(props) {
    super(props);

    const { dispatch, user } = props;

    dispatch(tasksActions.getAll(user.api_token));

    this.state = {};

    this.handleRefresh = this.handleRefresh.bind(this);
    this.createDeal = this.createDeal.bind(this);
    this.handleRefresh();
  }

  handleRefresh() {
    const { dispatch, user } = this.props;

    dispatch(alertActions.clear());
    dispatch(tasksActions.getAll(user.api_token, true));
  }

  createDeal(taskId) {
    const { dispatch, user } = this.props;

    dispatch(alertActions.clear());
    dispatch(dealsActions.bloggerCreate(user.api_token, taskId));
  }
  handleLoadMoreButton() {
    const { dispatch, user } = this.props;
    dispatch(tasksActions.loadMoreAll(user.api_token, this.props.items.current_page + 1));
  }
  render() {
    const { alert, items, fetching, loadMoreFetching } = this.props;
    const { data } = items;
    return (
      <div className="tasks">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={10} xl={6}>
              <div className="tasks__topbar">
                <h3 className="tasks-heading">Доступные задания</h3>
                <FontAwesome name="refresh" className="tasks-btn-refresh" onClick={this.handleRefresh} />
              </div>

              {alert.message && <AlertNotify alert={alert} modal />}

              {fetching && <div className="loader">
                <ClipLoader width={100} />
              </div>}

              {!fetching && data && data.map((task, index) => {
                return (
                  <Task
                    key={index}
                    info={task}
                    hasLink
                    onBloggerCreateDeal={this.createDeal}
                  />
                )
              })}
              {loadMoreFetching && <div className="loader">
                <ClipLoader width={100} />
              </div>}
              {
                !loadMoreFetching && !fetching && items.current_page !== items.last_page && <div className="bloggers-search-loadmore-container">
                  <Button
                    color="success"
                    onClick={() => this.handleLoadMoreButton()}
                    outline
                    size="sm"
                  >
                    Показать больше
                  </Button>
                </div>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.tasks.fetching,
  loadMoreFetching: state.tasks.loadMoreFetching,
  items: state.tasks.items,
  user: state.user,
  alert: state.alert,
  deals: state.deals
});

const connectedTasks = connect(mapStateToProps)(Tasks);

export {
  connectedTasks as Tasks
}