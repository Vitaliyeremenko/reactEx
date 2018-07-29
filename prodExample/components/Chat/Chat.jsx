import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import {
  ClipLoader
} from 'react-spinners';
import {
  Feed,
  Controls,
} from './';
import {
  dealsActions,
} from '../../actions';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      access: false,
      isConnected: false,
      typing: false,
      typingMessage: {},
      messages: [],
      message: '',
      offset: 0,
      limit: 2000,
      shouldScrollToBottom: true,
    };

    this.room = props.match.params.id;
    this.feed = undefined;

    this.initSocket = this.initSocket.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiveNewMessages = this.receiveNewMessages.bind(this);
    this.receiveNewMessage = this.receiveNewMessage.bind(this);
    this.startTyping = this.startTyping.bind(this);
    this.stopTyping = this.stopTyping.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.checkAccess = this.checkAccess.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    this.checkAccess();
  }

  componentDidMount() {
    this.initSocket();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { deals } = nextProps;
      const { access } = deals;

      if (access) {
        this.setState({
          access,
        });
      }
    }
  }

  componentWillUnmount() {
    this.socket.emit('leave room', this.room);
  }

  checkAccess() {
    const { user, dispatch } = this.props;
    const { api_token } = user;

    dispatch(dealsActions.isMyDeal(api_token, this.room));
  }

  initSocket() {
    const { user } = this.props;
    const { offset, limit, isConnected } = this.state;
    const { first_name } = user;

    const opts = {
      transports: ['websocket'],
      jsonp: false,
      secure: window.location.protocol === 'https:',
      query: {
        first_name,
      },
    };

    this.socket = io('//:8080', opts);

    this.socket.on('connect', () => {
      this.setState({
        isConnected: true,
      });

      this.socket.emit('join room', this.room); // create room
      if (!isConnected) {
        this.getMessages(offset, limit);
      }
    });

    this.socket.on('new messages', (messages) => {
      this.receiveNewMessages(messages);

      if (this.feed) {
        this.feed.scrollToBottom();
      }
    });

    this.socket.on('new message', (message) => {
      this.receiveNewMessage(message);

      if (this.feed) {
        this.feed.scrollToBottom();
      }
    });

    this.socket.on('typing', (message) => {
      this.startTyping(message);
    });

    this.socket.on('stoped typing', (message) => {
      this.stopTyping(message);
    });
  }

  receiveNewMessages(messages) {
    if (this.state.messages && this.state.messages > 0) {
      this.setState({
        messages: [
          ...this.state.messages,
          messages,
        ],
      });
    } else {
      this.setState({
        messages,
      });
    }
  }

  receiveNewMessage(message) {
    const { messages } = this.state;

    this.setState({
      messages: [
        ...messages,
        message,
      ],
    });
  }

  clearMessage() {
    this.setState({
      message: '',
    });
  }

  getMessages(offset, limit) {
    this.socket.emit('get messages', offset, limit);
  }

  startTyping(message) {
    const { user } = this.props;

    if (user.id !== message.user_id) {
      this.setState({
        typing: true,
        typingMessage: message,
      });
    }
  }

  stopTyping(message) {
    const { user } = this.props;

    if (user.id !== message.user_id) {
      this.setState({
        typing: false,
      });
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { user } = this.props;
    const { first_name, id } = user;

    const typingMessage = {
      user_id: id,
      first_name,
    };

    if (value) {
      this.socket.emit('start typing', typingMessage);
      this.setState({
        message: value,
      });
    } else {
      this.socket.emit('stop typing', typingMessage);
      this.setState({
        message: '',
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { message } = this.state;
    const { user } = this.props;
    const { id, first_name } = user;

    if (message) {
      const newMessage = {
        user_id: Number(id),
        deal_id: Number(this.room),
        first_name,
        message,
      };

      this.socket.emit('send message', newMessage);
      this.socket.emit('stop typing', newMessage);
      this.clearMessage();
    }
  }

  handleBack(){
    if(this.props._interface.type === "blogger"){
        location.href = '/dashboard/blogger/deals';
    }else if(this.props._interface.type === "advertiser"){
        location.href =  "/dashboard/a10vertiser/deals";
    }
  }
  render() {
    const { user } = this.props;
    const {
      isConnected,
      messages,
      message,
      typing,
      typingMessage,
      shouldScrollToBottom,
      access,
    } = this.state;

    const isRenderChat = isConnected && access;

    if (isRenderChat) {
      return (
        <div className="chat">
          <Feed
            messages={messages}
            user={user}
            typing={typing}
            typingMessage={typingMessage}
            onGetMessages={this.getMessages}
            onRef={ref => this.feed = ref}
          />
          <Controls
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            message={message}
          />
            <button
                type = "button"
                className="btn btn-success"
                onClick={this.handleBack}
            >Вернуться в сделку</button>
        </div>
      );
    }

    return (
      <div className="loader">
        <ClipLoader width={100} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, deals,_interface } = state;

  return {
    user,
    deals,
    _interface
  };
};

const connectedChat = connect(mapStateToProps)(Chat);

export {
  connectedChat as Chat
};
