import { START_TIMER, RESTART_TIMER, ADD_SECOND, AUTH_LOGIN, AUTH_LOGOUT } from './ActionTypes'

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
