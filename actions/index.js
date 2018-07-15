import { 
    AUTH_GETTING,
    AUTH_GETSUCCESS,
    AUTH_GETFAIL,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_SIGNUP
} from './ActionTypes'
import axios from 'axios';

//action creator
export function loginRequest () {
    return {
        type : AUTH_LOGIN
    }
}
export function logoutRequest () {
    return {
        type : AUTH_LOGOUT
    }
}
export function getting () {
    return {
        type : AUTH_GETTING
    }
}
export function getFailure () {
    return {
        type : AUTH_GETFAIL
    }
}
export function loginSuccess (users) {
    return {
        type : AUTH_LOGIN_SUCCESS,
        users
    }
}
export function loginRejected () {
    return {
        type : AUTH_LOGIN_REJECT
    }
}
export function loginFailed () {
    return {
        type : AUTH_LOGIN_FAIL
    }
}

//action functions
//로그인
export function userLogin (userInfo) {
    return (dispatch) => {
        dispatch(getting());

        // API REQUEST
        return axios.post('http://localhost:9000/api/auth/signIn', userInfo)
        .then((res) => {
            const status = result.data.status;
            // SUCCEED
            if(status === "LOGIN_REJECT") {
                dispatch(loginRejected(result.data.status));
                return false;
            }
            if(status === "LOGIN_FAILED") {
                dispatch(loginFailed(result.data.status));
                return false;
            }
            if(suatus === "LOGIN_SUCCESS") {
                dispatch(loginSuccess(result.data.status));
                return false;
            }
        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });
    }
}

//회원가입
export function userSignUp (userInfo) {
    return (dispatch) => {
        dispatch(getting());

        // API REQUEST
        return axios.post('http://localhost:9000/api/auth/signUp', userInfo)
        .then((res) => {
            // SUCCEED
            const result = JSON.stringify(res.data,0,2);
            alert(result);
            // dispatch(getSuccess(result));
        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });

    }
}