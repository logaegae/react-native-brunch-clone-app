import { 
    ALARM_SETICON
} from './ActionTypes'
import axios from 'axios';
import { domain } from '../config';

//action creator
export const setAlarmIcon = (bool) => {
    return {
        type : ALARM_SETICON,
        alarmIcon : bool,
        alarmHandler : null
    }
}

//action consts
//Ararm Icons check
export const alarmIconReapeat = (token) => {
    return (dispatch) => {
        //한번하고
        getAlarmFn(token, dispatch);
        //10초마다 하기
        this.getAlarmRepeat = setInterval(()=>{
            getAlarmFn(token, dispatch);
        }, 10000);
    }
}

//ext
function getAlarmFn(token, dispatch) {
    const header = {
        headers : {
            'x-access-token' : token
        }
    }
    axios.post(domain+'/api/alarm/getOneAlarm', {}, header)
    .then((res) => {
        if(res.data.status === "ALARM_GET_FAILED"){
            // alert("ERROR\n"+res.data.message);
            dispatch(setAlarmIcon(false));
        }else if(res.data.status === "ALARM_GET_SUCCESSED"){
            dispatch(setAlarmIcon(res.data.alarm && !res.data.alarm.confirmed ? true : false));
        }
    }).catch((error) => {
        // alert("ERROR\n"+error.message);
        dispatch(setAlarmIcon(false));
    });
}