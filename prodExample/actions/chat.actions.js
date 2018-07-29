import { chatConstans } from '../constants/chat.constants'
import { alertActions } from '../actions'
import { chatService } from '../services';


const getChats = (api_token,user_id) => {
    const request = api_token => {
        return {
            type: chatConstans.GET_CHATS,
            params: {
                api_token
            }
        }
    }
    const success = settings => {
        return {
            type: chatConstans.GET_CHATS_SUCCESS,
            settings,
        }
    }
    const failure = error => {
        return {
            type: chatConstans.GET_CHATS_FAILURE,
            error
        }
    }
    return dispatch => {
        dispatch(request(api_token))

        chatService.getChats(api_token,user_id)
            .then(
                settings => {
                    dispatch(success(settings))
                },
                error => {
                    dispatch(failure(error))
                    dispatch(alertActions.error(error))
                }
            )
    }
}

export const chatActions = {
    getChats
}