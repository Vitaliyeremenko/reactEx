import axios from 'axios'

const getChats = (api_token,user_id) => {
    const requestOptions = {
        params: {
            api_token,
            user_id
        }
    }
    console.log('chat.service',api_token);
    return axios.get('/api/v1/user/chats', requestOptions)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return handleFailureMessageResponse(err);
        });




}

export const chatService = {
    getChats
}