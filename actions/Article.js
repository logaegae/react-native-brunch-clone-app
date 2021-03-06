import { domain } from '../config';
import { 
    ARTICLE_GETTING,
    ARTICLE_GETFAIL,
    ARTICLE_GETSUCCESS,
    ARTICLE_UPDATESUCCESS,
    ARTICLE_INIT
} from './ActionTypes'
import axios from 'axios';

//action creator
export const article_getting = () => {
    return {
        type : ARTICLE_GETTING
    }
}
export const article_getFailure = () => {
    return {
        type : ARTICLE_GETFAIL
    }
}
export const article_getSuccess = (_id) => {
    return {
        type : ARTICLE_GETSUCCESS,
        _id
    }
}
export const article_updateSuccess = (_id) => {
    return {
        type : ARTICLE_UPDATESUCCESS,
        _id
    }
}
export const article_getInit = () => {
    return {
        type : ARTICLE_INIT
    }
}

//action functions
//Article 저장
export const requestSaveArticle = (oriArticle, token) => {
    return (dispatch) => {
        if(!token) {
            alert("ERROR\nNo Token Info");
            return false;
        }
        let article = Object.assign({},oriArticle);
        article.bgStyle = {};
        article.bgStyle.backgroundColor = article.bg.color.value || article.bgStyle.backgroundColor || null;
        article.bgStyle.photoUrl = article.bg.photo || (article.bgStyle ? article.bgStyle.photoUrl : null) || null;
        if(!article.bgStyle.photoUrl){
            article.bgStyle.backgroundColor = article.bgStyle.backgroundColor || "#6B5ED1";
        }else{
            article.bgStyle.backgroundColor = null;
        }
        article.weather = article.weather && article.weather.name ? article.weather.name : null;

        dispatch(article_getting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        // API REQUEST
        return axios.post(domain+'/api/article/write', article, header)
        .then((res) => {
            // alert(JSON.stringify(res,0,2));
            if(res.data.status == "ARTICLE_SAVE_FAILED" || res.data.status == "ARTICLE_UPDATE_FAILED"){
                alert("ERROR\n"+res.data.message);
                dispatch(article_getFailure());
            }else if(res.data.status == "ARTICLE_SAVE_SUCCESSED"){
                // alert("ARTICLE_SAVE_SUCCESSED")
                dispatch(article_getSuccess(res.data.article._id));
            }else if(res.data.status == "ARTICLE_UPDATE_SUCCESSED"){
                // alert("ARTICLE_UPDATE_SUCCESSED")
                dispatch(article_updateSuccess(res.data.article._id));
            }
        }).catch((error) => {
            dispatch(article_getFailure());
        });
    }
}