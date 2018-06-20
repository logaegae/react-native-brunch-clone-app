import * as types from '../actions/ActionTypes';

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false,
        currentUser: '',
    }
};


export default function auth(state = initialState, action) {
    switch(action.type) {
        case types.AUTH_LOGIN:
            return {
                ...initialState,
                login: {
                    status: 'LOGIN'
                }
            };
        case types.AUTH_LOGOUT:
            return {
                ...initialState,
                login: {
                    status: 'LOGOUT'
                }
            };
        case types.AUTH_LOGIN_SUCCESS:
            return {
                login: {
                    status: 'SUCCESS' 
                },
                status: {
                    isLoggedIn: true ,
                    currentUser: action.username
                }
            };
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...initialState,
                login: {
                    status: { $set: 'FAILURE' }
                }
            };
        default:
            return state;
    }
}