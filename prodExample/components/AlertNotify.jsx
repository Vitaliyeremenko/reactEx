import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import FontAwesome from 'react-fontawesome';
import { userActions } from '../actions';

class AlertNotify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { modal, userError, dispatch } = this.props;

    modal && this.openModal()
  }

  closeModal() {
    const { userError, dispatch } = this.props;
    
    userError && dispatch(userActions.clearUserError())
    this.setState({
      isOpenModal: false,
    });
  }

  openModal() {
    this.setState({
      isOpenModal: true,
    });
  }


  render() {
    const { alert, modal } = this.props;
    const { message, type } = alert;
    const { isOpenModal } = this.state;

    if (_.has(message, 'errors')) {
      const { errors } = message;
      const list = [];

      _.map(_.values(errors), error => list.push(...error));

      const ListErrors = (
        <Alert
          color={type}
          className="my-2"
        >
          <ul className="alert-list">
            {!_.isEmpty(list) && _.map(list, (error, index) => (
              <li
                className="alert-list-item"
                key={index}
              >
                {error}
              </li>
            ))}
          </ul>
        </Alert>
      );

      if (modal) {
        return (
          <Modal
            open={isOpenModal}
            onClose={this.closeModal}
            little
          >
            <div className="alert-modal-heading">
              {type === 'danger' ? <FontAwesome
                className={`alert-modal-heading-icon text-${type}`}
                name="exclamation-circle"
              /> : <FontAwesome
                className={`alert-modal-heading-icon text-${type}`}
                name="check-circle"
              />}
            </div>
            {ListErrors}
          </Modal>
        );
      }

      return ListErrors;
    }

    const SingleError = (
      <Alert color={type} className="mt-2">
        <span>{_.has(message, 'message') ? message.message.toString() : message.toString()}</span>
      </Alert>
    );

    if (modal) {
      return (
        <Modal
          open={isOpenModal}
          onClose={this.closeModal}
          little
        >
          <div className="alert-modal-heading">
            {type === 'danger' ? <FontAwesome
              className={`alert-modal-heading-icon text-${type}`}
              name="exclamation-circle"
            /> : <FontAwesome
              className={`alert-modal-heading-icon text-${type}`}
              name="check-circle"
            />}
          </div>
          {SingleError}
        </Modal>
      );
    }

    return SingleError;
  }
}

AlertNotify.propTypes = {
  alert: PropTypes.object,
  modal: PropTypes.bool,
};

export {
  AlertNotify,
};
