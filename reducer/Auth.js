import * as types from '../actions/ActionTypes';

const initialState = {
    http: {
        //INIT : 초기
        //GETTING : 요청중
        //FAILED : 요청 실패
        //SUCCESSED : 요청 성공
        status: 'INIT',
        result : 'INIT'
    },
    login : {
        logged : false,
        name : '',
        id : ''
    }
};


export default function auth(state = initialState, action) {
    switch(action.type) {
        case types.AUTH_GETTING:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'GETTING'
                }
            };
        case types.AUTH_GETFAIL:
            return {
                ...state,
                http: {
                    ...state.http,
                    status: 'FAILED'
                }
            };
        //회원가입
        case types.AUTH_SIGNUP_SUCCESSED:
            return {
                ...state,
                http: {
                    ...state.http,
                    status : 'SUCCESSED',
                    result : 'SUCCESSED'
                }
            };
        case types.AUTH_SIGNUP_FAILED:
            return {
                ...state,
                http: {
                    ...state.http,
                    status : 'SUCCESSED',
                    result : 'FAILED'
                }
            };
        case types.AUTH_INIT :
            return {
                ...state,
                http : {
                    ...state.http,
                    status : 'INIT',
                    result : 'INIT'
                }
            };
        //로그인
        case types.AUTH_LOGIN_REJECT : 
            return {
                ...state,
                http : {
                    ...state.http,
                    status : 'SUCCESSED',
                    result : 'FAILED'
                }
            };
        case types.AUTH_LOGIN_FAIL : 
            return {
                ...state,
                http : {
                    ...state.http,
                    status : 'FAILED'
                }
            };
        case types.AUTH_LOGIN_SUCCESS :
            return {
                ...state,
                http : {
                    ...state.http,
                    status : 'SUCCESSED',
                    result : 'SUCCESSED'
                },
                login : {
                    logged : true,
                    name : action.name,
                    id : action.id
                }
            };
        case types.AUTH_LOGOUT : 
            return {
                ...state,
                login : {
                    logged : false,
                    name : '',
                    id : ''
                }
            };
        default:
            return state;
    }
}