import { 
    AUTH_GETTING,
    AUTH_GETFAIL,
    AUTH_SIGNUP_SUCCESSED,
    AUTH_SIGNUP_FAILED,
    AUTH_INIT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_REJECT,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT,
    CHANGE_NAME_SUCCESSED
} from './ActionTypes'
import axios from 'axios';
import { AsyncStorage } from "react-native";
import { domain } from '../config';

//action creator
export const getting = () => {
    return {
        type : AUTH_GETTING
    }
}
export const getFailure = () => {
    return {
        type : AUTH_GETFAIL
    }
}
export const loginSuccess = (id, _id, name, token) => {
    return {
        type : AUTH_LOGIN_SUCCESS,
        id,
        _id,
        name,
        token
    }
}
export const loginRejected = () => {
    return {
        type : AUTH_LOGIN_REJECT
    }
}
export const loginFailed = () => {
    return {
        type : AUTH_LOGIN_FAIL
    }
}
export const logOut = () => {
    return {
        type : AUTH_LOGOUT
    }
}
export const signUpSeccess = () => {
    return {
        type : AUTH_SIGNUP_SUCCESSED
    }
}
export const signUpFailed = () => {
    return {
        type : AUTH_SIGNUP_FAILED
    }
}
export const changeName = (name) => {
    return {
        type : CHANGE_NAME_SUCCESSED,
        name
    }
}
export const authInit = () => {
    return {
        type : AUTH_INIT
    }
}

//action consts
//로그인
export const userLogin = (userInfo) => {
    return (dispatch) => {
        dispatch(getting());

        // API REQUEST
        return axios.post(domain+'/api/auth/signIn', userInfo)
        .then((res) => {

            const status = res.data.status;
            const name = res.data.name;
            const id = res.data.id;
            const _id = res.data._id;
            const token = res.data.token;

            switch(status){
                case "LOGIN_FAILED" : 
                    alert("Server Error");
                    dispatch(loginRejected());
                    break;
                case "LOGIN_REJECT" : 
                    alert("아이디와 비밀번호를 확인해주세요.");
                    dispatch(loginFailed());
                    break;
                case "LOGIN_SUCCESS" : 
                    try {
                        AsyncStorage.setItem('@BrunchApp:Auth', JSON.stringify({
                            id,
                            _id,
                            name,
                            token
                        }));
                    } catch (error) {
                        alert("Storage Error : " + error);
                    } finally {
                        dispatch(loginSuccess(id, _id, name, token));
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
export const userSignUp = (userInfo) => {
    return (dispatch) => {
        dispatch(getting());

        // API REQUEST
        return axios.post(domain+'/api/auth/signUp', userInfo)
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
export const logoutRequest = () => {
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
export const getStorage = () => {
    return async (dispatch) => {
        try {
            const _storedData = await AsyncStorage.getItem('@BrunchApp:Auth');
            if(_storedData) {
                _storedData = JSON.parse(_storedData);
                dispatch(loginSuccess(_storedData.id, _storedData._id, _storedData.name, _storedData.token));
            }
        } catch (error) {
            alert("Error retrieving data : " + error);
        }
    }
}

//비밀번호 변경
export const requestChangePw = (userInfo, token) => {
    return (dispatch) => {
        if(!token) {
            alert("ERROR\nNo Token Info");
            return false;
        }
        dispatch(getting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        // API REQUEST
        return axios.post(domain+'/api/auth/changePw', userInfo, header)
        .then((res) => {
            // SUCCEED
            if(res.data.status === "PWCHANGE_SUCCESSED"){
                alert("비밀번호가 변경되었습니다.");
                //??
            }else if(res.data.status === "PWCHANGE_REJECT"){
                alert("기존 비밀번호를 다시 확인해주세요.");
                dispatch(authInit());
            }else{
                alert("ERORR");
                dispatch(authInit());
            }

        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });
    }
}

//Name 변경
export const changeNameRequest = (userInfo, token) => {
    return (dispatch) => {
        if(!token) {
            alert("ERROR\nNo Token Info");
            return false;
        }
        dispatch(getting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        // API REQUEST
        return axios.post(domain+'/api/auth/changeName', userInfo, header)
        .then((res) => {
            if(res.data.status === "CHANGE_NAME_ERROR"){
                alert("ERORR");
            }else if(res.data.status === "CHANGE_NAME_DUPLICATED"){
                alert("이미 존재하는 닉네임입니다.");
            }else if(res.data.status === "CHANGE_NAME_SUCCESSED"){
                try {
                    AsyncStorage.setItem('@BrunchApp:Auth', JSON.stringify({
                        id : userInfo.id,
                        _id : userInfo._id,
                        name : userInfo.name,
                        token
                    }));
                } catch (error) {
                    alert("Storage Error : " + error);
                } finally {
                    alert("변경되었습니다.");
                    dispatch(changeName(userInfo.name));
                }
            }else{
                alert("ERORR");
            }
            dispatch(authInit());
        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });
    }
}