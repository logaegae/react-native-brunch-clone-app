import * as types from '../actions/ActionTypes';

const initialState = {
    http: {
        //INIT : 초기
        //GETTING : 요청중
        //FAILED : 요청 실패
        //SUCCESSED : 요청 성공
        result : null,
        status: 'INIT'
    },
    myArticle : []
};

export default function auth(state = initialState, action) {
    switch(action.type) {
        //Http 상태
        case types.ARTICLE_GETTING:
            return {
                ...state,
                http: {
                    status: 'GETTING',
                    result : null
                }
            };
        case types.ARTICLE_GETFAIL:
            return {
                ...state,
                http: {
                    status: 'FAILED',
                    result : null
                }
            };
        case types.ARTICLE_GETSUCCESS:
            return {
                ...state,
                http: {
                    status: 'SUCCESSED',
                    result : action._id
                }
            };
        case types.ARTICLE_GETINIT:
            return {
                ...state,
                http: {
                    status: 'INIT',
                    result : null
                }
            };
        default:
            return state;
    }
}