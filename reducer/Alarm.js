import * as types from '../actions/ActionTypes';

const initialState = {
    alarmIcon : false
};


export default function alarm(state = initialState, action) {
    switch(action.type) {
        //Http 상태
        case types.ALARM_SETICON:
            return {
                ...state,
                alarmIcon : action.alarmIcon
            };
        default:
            return state;
    }
}