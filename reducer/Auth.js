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
        case types.AUTH_GETTING:
            return {
                ...state,
                login: {
                    status: 'GETTING'
                }
            };
        case types.AUTH_REJECT:
            return {
                ...state,
                login: {
                    status: 'REJECT'
                }
            };
        case types.AUTH_GETSUCCESS:
            return {
                status: {
                    isLoggedIn: false,
                    currentUser: action.users,
                },
                login: {
                    status: 'SUCCESS'
                }
            };
        case types.AUTH_GETFAIL:
            return {
                ...state,
                login: {
                    status: 'FAIL'
                }
            };
        case types.AUTH_LOGIN:
            return {
                ...state,
                login: {
                    status: 'LOGIN'
                }
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                login: {
                    status: 'LOGOUT'
                }
            };
        default:
            return state;
    }
}