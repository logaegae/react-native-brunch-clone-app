import * as types from '../actions/ActionTypes';

const initialState = {
    http: {
        //INIT : 초기
        //GETTING : 요청중
        //FAILED : 요청 실패
        //SUCCESSED : 요청 성공
        status: 'INIT'
    }
};


export default function auth(state = initialState, action) {
    switch(action.type) {
        //Http 상태
        case types.ARTICLE_GETTING:
            return {
                ...state,
                http: {
                    status: 'GETTING'
                }
            };
        case types.ARTICLE_GETFAIL:
            return {
                ...state,
                http: {
                    status: 'FAILED'
                }
            };
        case types.ARTICLE_GETSUCCESS:
            return {
                ...state,
                http: {
                    status: 'SUCCESSED'
                }
            };
        case types.ARTICLE_GETINIT:
            return {
                ...state,
                http: {
                    status: 'INIT'
                }
            };
        default:
            return state;
    }
}