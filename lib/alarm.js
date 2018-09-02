import { domain } from '../config';

export default (obj, token) => {

    const objToUpdate = obj;
    const header = {
        headers : {
            'x-access-token' : token
        }
    }

    axios.post(domain + '/api/alarm/write', objToUpdate, header)
    .then((res) => {
        if(res.data.status === "ALARM_SAVE_FAILED"){
            alert("ERROR\n"+res.data.message);
        }else if(res.data.status === "ALARM_SAVE_SUCCESSED"){
            alert("ALARM SUCCESS");
        }
    }).catch((error) => {
        alert("ERROR\n"+error.message);
    });
}