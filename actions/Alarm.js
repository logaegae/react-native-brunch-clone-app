import { 
    NOTIFY_SETICON,
    LIKE_SETICON
} from './ActionTypes'
import { domain } from '../config';
import axios from 'axios';

const getNotifyRepeat = null;
const getLikeRepeat = null;

//action creator
export const setNotifyIcon = (bool) => {
    return {
        type : NOTIFY_SETICON,
        notifyIcon : bool
    }
}
export const setLikeIcon = (bool) => {
    return {
        type : LIKE_SETICON,
        likeIcon : bool
    }
}

//action consts
//Ararm Icons check
export const notifyIconReapeat = (token) => {
    return (dispatch) => {
        //한번하고
        getAlarmFn(token, dispatch, 'notify');
        //10초마다 하기
        getNotifyRepeat = setInterval(()=>{
            getAlarmFn(token, dispatch, 'notify');
        }, 10000);
    }
}

export const clearNotifyIconReapeat = (token) => {
    return (dispatch) => {
        clearInterval(getNotifyRepeat);
    }
}

export const likeIconReapeat = (token) => {
    return (dispatch) => {
        //한번하고
        getAlarmFn(token, dispatch, 'like');
        //10초마다 하기
        getLikeRepeat = setInterval(()=>{
            getAlarmFn(token, dispatch, 'like');
        }, 10000);
    }
}

export const clearLikeIconReapeat = (token) => {
    return (dispatch) => {
        clearInterval(getLikeRepeat);
    }
}

//ext
function getAlarmFn(token, dispatch, type) {
    const header = {
        headers : {
            'x-access-token' : token
        }
    }
    axios.post(domain+'/api/alarm/getOneAlarm', {type}, header)
    .then((res)=>{
        if(res.data.status === "ALARM_GET_FAILED"){
            // alert("ERROR\n"+res.data.message);
            if(res.data.type === 'notify') dispatch(setNotifyIcon(false));
            if(res.data.type === 'like') dispatch(setLikeIcon(false));
        }else if(res.data.status === "ALARM_GET_SUCCESSED"){
            if(res.data.type === 'notify') dispatch(setNotifyIcon(res.data.alarm && !res.data.alarm.confirmed ? true : false));
            if(res.data.type === 'like') dispatch(setLikeIcon(res.data.alarm && !res.data.alarm.confirmed ? true : false));
        }
    }).catch((error) => {
        // alert("ERROR\n"+error.message);
        dispatch(setNotifyIcon(false));
        dispatch(setLikeIcon(false));
    });
}