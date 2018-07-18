import { 
    AUTH_GETTING,
    AUTH_GETFAIL,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_SIGNUP_SUCCESSED,
    AUTH_SIGNUP_FAILED,
    AUTH_SIGNUP_INIT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_REJECT,
    AUTH_LOGIN_FAIL

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
export function loginSuccess (name) {
    return {
        type : AUTH_LOGIN_SUCCESS,
        name : name
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
export function signUpSeccess () {
    return {
        type : AUTH_SIGNUP_SUCCESSED
    }
}
export function signUpFailed () {
    return {
        type : AUTH_SIGNUP_FAILED
    }
}
export function signUpInit () {
    return {
        type : AUTH_SIGNUP_INIT
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
            
            const status = res.data.status;
            const name = res.data.name;
            
            switch(status){
                case "LOGIN_REJECT" : dispatch(loginRejected());
                    break;
                case "LOGIN_FAILED" : dispatch(loginFailed());
                    break;
                case "LOGIN_SUCCESS" : dispatch(loginSuccess(name));
                    break;
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
            if(res.data.status === "SIGNUP_SUCCESSED"){
                dispatch(signUpSeccess());
            }else{
                dispatch(signUpFailed());
            }

        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });

    }
}