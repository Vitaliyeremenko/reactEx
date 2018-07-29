import React from 'react';
import classNames from 'classnames';
import Linkify from 'react-linkify';
import PropTypes from 'prop-types';

const Message = ({ message, isOwnMessage, groupByName }) => {
  const {
    user_id,
    first_name,
    created_at,
  } = message;

  const time = moment.utc(created_at).local().format('HH:mm');
  const chatMessageClass = classNames('chat__message', {
    'own': isOwnMessage
  });

  return (
    <div className={chatMessageClass}>
      <div className="chat__message-user">
        {!isOwnMessage && <span className="chat__message-user-name">
          {first_name || ''}
        </span>}
        {time && <small className='chat__message-time'>
          {time}
        </small>}
      </div>
      {_.has(message, 'message') && <div className="chat__message-text">
        <Linkify>
          {message.message || ''}
        </Linkify>
      </div>}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  isOwnMessage: PropTypes.bool.isRequired,
  groupByName: PropTypes.bool,
}

export {
  Message
}