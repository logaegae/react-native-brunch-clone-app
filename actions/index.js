import { 
    AUTH_GETTING,
    AUTH_GETFAIL,
    AUTH_SIGNUP_SUCCESSED,
    AUTH_SIGNUP_FAILED,
    AUTH_INIT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_REJECT,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT

} from './ActionTypes'
import axios from 'axios';
import { AsyncStorage } from "react-native";

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
export function loginSuccess (id, name) {
    return {
        type : AUTH_LOGIN_SUCCESS,
        id,
        name
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
export function logOut () {
    return {
        type : AUTH_LOGOUT
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
export function authInit () {
    return {
        type : AUTH_INIT
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
            const id = res.data.id;
            
            switch(status){
                case "LOGIN_REJECT" : 
                    alert("Server Error");
                    dispatch(loginRejected());
                    break;
                case "LOGIN_FAILED" : 
                    alert("아이디와 비밀번호를 확인해주세요.");
                    dispatch(loginFailed());
                    break;
                case "LOGIN_SUCCESS" : 
                    try {
                        AsyncStorage.setItem('@BrunchApp:Auth', JSON.stringify({
                            id,
                            name
                        }));
                    } catch (error) {
                        alert("Storage Error : " + error);
                    } finally {
                        dispatch(loginSuccess(id, name));
                        break;
                    }
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

                if(res.data.status === "SIGNUP_ID_DUPLICATED") {
                    alert("아이디가 이미 존재합니다.\n다른 아이디를 입력해주세요.");
                }
                if(res.data.status === "SIGNUP_NAME_DUPLICATED") {
                    alert("이미 존재하는 닉네임입니다.\n다른 닉네임을 입력해주세요.");
                }
                dispatch(signUpFailed());
            }

        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });

    }
}
//logout
export function logout () {
    return async (dispatch) => {
        try {
            await AsyncStorage.removeItem('@BrunchApp:Auth');
            dispatch(logOut());
        } catch (error) {
            alert("Error retrieving data : " + error);
        }
    }
}

//storage 조회
export function getStorage () {
    return async (dispatch) => {
        try {
            const _storedData = await AsyncStorage.getItem('@BrunchApp:Auth');
            if(_storedData) {
                    _storedData = JSON.parse(_storedData);
                    dispatch(loginSuccess(_storedData.id, _storedData.name));
            }
        } catch (error) {
            alert("Error retrieving data : " + error);
        }
    }
}