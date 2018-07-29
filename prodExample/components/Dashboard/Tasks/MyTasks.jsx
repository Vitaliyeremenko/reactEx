import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { ClipLoader } from 'react-spinners';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import {
  tasksActions,
  alertActions
} from '../../../actions'
import { AlertNotify } from '../../../components';
import { Task } from './';

class MyTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getOwnTasks = this.getOwnTasks.bind(this);
    this.onReview = this.onReview.bind(this);

    this.getOwnTasks(true);
  }



  onReview(taskId) {
    const { dispatch, user } = this.props;
    const { api_token } = user;

    dispatch(tasksActions.changeStatus(api_token, taskId, 'reviewing'));
  }

  getOwnTasks(fromServer = false) {
    const { dispatch, user } = this.props;
  dispatch(tasksActions.getOwn(user.api_token, fromServer));
  }

  handleLoadMoreButton() {
    const { dispatch, user } = this.props;
    dispatch(tasksActions.loadMoreOwn(user.api_token, this.props.tasks.ownTasks.current_page + 1));
  }

  render() {
    const { tasks, alert } = this.props;
    const { ownTasks, fetching, loadMoreFetching } = tasks;
    const { data } = ownTasks
    
    return (
      <div className="tasks">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={10} xl={6}>
              <div className="tasks__topbar">
                <h3 className="tasks-heading">Мои задания</h3>
                <FontAwesome name="refresh" className="tasks-btn-refresh" onClick={() => this.getOwnTasks(true)} />
              </div>

              {alert.message && <AlertNotify alert={alert} modal />}

              {fetching && <div className="loader">
                <ClipLoader width={100} />
              </div>}

              {!fetching && data && data.map((task, index) => (
                <Task
                  key={index}
                  info={task}
                  hasLink={false}
                  hasStatus
                  showCompleted
                  hasEditButton
                  onReview={this.onReview}
                />
              ))}
              {loadMoreFetching && <div className="loader">
                <ClipLoader width={100} />
              </div>}
              {
                !loadMoreFetching && !fetching && ownTasks.current_page !== ownTasks.last_page && <div className="bloggers-search-loadmore-container">
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
  user: state.user,
  tasks: state.tasks,
  alert: state.alert,
})

const connectedMyTasks = connect(mapStateToProps)(MyTasks);

export {
  connectedMyTasks as MyTasks
};
