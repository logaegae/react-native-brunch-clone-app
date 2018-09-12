import axios from 'axios';
import { domain } from '../config';

//@params path, obj, fn, fn, token
const axiosRequest = (path, obj, token) => {
    return new Promise((resolve, reject) => {
        let header, post;
        if(token) {
            const header = {
                headers : {
                    'x-access-token' : token
                }
            }
            post = axios.post(domain+path, obj, header);
        }else{
            post = axios.post(domain+path, obj);
        }
        post
        .then((res) => {
            if(res.data.status === "FAIL"){
                reject(res);
            }else if(res.data.status === "SUCCESS"){
                resolve(res);
            }
        }).catch((error) => {
            reject(new Error("ERROR\n"+error.message));
        });
    });
};

export default axiosRequest;