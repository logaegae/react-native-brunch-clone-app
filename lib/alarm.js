import { domain } from '../config';
import axios from 'axios';

export default (obj, token) => {
    const header = {
        headers : {
            'x-access-token' : token
        }
    }

    axios.post(domain + '/api/alarm/write', obj, header)
    .then((res) => {
        if(res.data.status === "ALARM_SAVE_FAILED"){
            alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "ALARM_SAVE_SUCCESSED"){
        }
    }).catch((error) => {
        alert("ERROR\n"+error.message);
    });

}