import { 
    AUTH_GETTING,
    AUTH_GETSUCCESS,
    AUTH_GETFAIL,
    AUTH_LOGIN, 
    AUTH_LOGOUT
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
export function getSuccess (users) {
    return {
        type : AUTH_GETSUCCESS,
        users
    }
}
export function getFailure () {
    return {
        type : AUTH_GETFAIL
    }
}

//action functions
export function getUsersRequest () {
    return (dispatch) => {
        dispatch(getting());

        // API REQUEST
        return axios.get('http://localhost:9000/api/auth')
        .then((res) => {
            // SUCCEED
            const result = JSON.stringify(res.data,0,2);
            dispatch(getSuccess(result));
        }).catch((error) => {
            // FAILED
            dispatch(getFailure());
        });
    }
}