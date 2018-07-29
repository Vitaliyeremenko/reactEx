import { chatConstans } from '../constants';

const initialState = {}

export const chats = (state = initialState, action) => {
    switch (action.type) {
        case chatConstans.GET_CHATS_SUCCESS:
            return {
                chat: action.settings
            };
        case chatConstans.GET_CHATS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}