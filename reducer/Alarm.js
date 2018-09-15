import * as types from '../actions/ActionTypes';

const initialState = {
    notifyIcon : false,
    likeIcon : false
};


export default function alarm(state = initialState, action) {
    switch(action.type) {
        //Http 상태
        case types.NOTIFY_SETICON:
            return {
                ...state,
                notifyIcon : action.notifyIcon
            };
        case types.LIKE_SETICON:
            return {
                ...state,
                likeIcon : action.likeIcon
            };
        default:
            return state;
    }
}