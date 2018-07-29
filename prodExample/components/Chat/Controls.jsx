import React from 'react';
import {
  Input,
  Button,
  Form,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Controls = ({ message, onSubmit, onChange }) => (
  <Form
    onSubmit={onSubmit}
    className="chat__controls"
  >
    <Input
      onChange={onChange}
      className="chat__controls-input"
      value={message || ''}
      placeholder="Напишите сообщение"
      maxLength="2048"
      type="text"
    />
    <Button
      className="chat__controls-btn-send"
      outline
      size="sm"
      color="primary"
    >
      <FontAwesome
        name="send"
      />
    </Button>
  </Form>
)

Controls.propTypes = {
  message: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export { Controls }