import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    chatActions
} from '../../actions';
class ChatList extends Component {
    constructor(props){
        super(props);

        this.state = {
            chats: []
        }

    }
    componentWillMount(){
        const { user, dispatch } = this.props;
        const { api_token,id } = user;
        dispatch(chatActions.getChats(api_token, id));
    }



    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            const { chats } = nextProps;
           if(chats.chat !== undefined){
            let result = Object.keys(chats.chat).map((key)=>(chats.chat[key]));
               this.setState({
                    chats: result
               });
           }

        }
    }
    render(){
        return(

            <ul>
                {

                    this.state.chats.map((item)=>{
                        return (
                            <li key={item.deal_id}>
                                <a href={"/dashboard/chat/" + item.deal_id}>Chat for deal:{item.deal_id}</a>
                            </li>);
                    })
                }
            </ul>

        );
    }
}

const mapStateToProps = (state) => {
    const { user, deals,chats } = state;

    return {
        user,
        deals,
        chats
    };
};

const connectedChatList = connect(mapStateToProps)(ChatList);
export {
    connectedChatList as ChatList
};