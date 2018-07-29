import React, { Component } from 'react';
import {
  Message
} from './';
import PerfectScrollbar from 'react-perfect-scrollbar';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  scrollToBottom() {
    const scrollHeight = this.messagesContainer.scrollHeight;
    const height = this.messagesContainer.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messagesContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const {
      typing,
      typingMessage,
      messages,
      user,
    } = this.props;

    return (
      <div className="chat__feed">
        <PerfectScrollbar
          swipeEasing={false}
          wheelSpeed={2}
          containerRef={(ref) => this.messagesContainer = ref}
        >
          <div className="chat__feed-messages">
            {!_.isEmpty(messages) && _.map(messages, (message, index) => {
              const isOwnMessage = _.isEqual(message.user_id, user.id);

              return (
                <Message
                  key={index}
                  message={message}
                  isOwnMessage={isOwnMessage}
                />
              );
            })}
          </div>
        </PerfectScrollbar>
        {typing && <small className="typing">
          {`${typingMessage.first_name} набирает сообщение...`}
        </small>}
      </div>
    )
  }
}

export {
  Feed
}