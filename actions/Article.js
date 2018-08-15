import { 
    ARTICLE_GETTING,
    ARTICLE_GETFAIL,
    ARTICLE_GETSUCCESS,
    ARTICLE_INIT
} from './ActionTypes'
import axios from 'axios';
import { AsyncStorage } from "react-native";

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
        let article = oriArticle;
        article.backgroundColor = article.bg.color.value || "#6B5ED1";
        article.photoUrl = article.bg.photo || null;
        article.weather = article.weather && article.weather.name ? article.weather.name : null;

        dispatch(article_getting());

        const header = {
            headers : {
                'x-access-token' : token
            }
        }

        // API REQUEST
        return axios.post('http://localhost:9000/api/article/write', article, header)
        .then((res) => {
            if(res.data.status === "ARTICLE_SAVE_FAILED"){
                alert("ERROR\n"+res.data.message);
                dispatch(article_getFailure());
            }else if(res.data.status === "ARTICLE_SAVE_SUCCESSED"){
                dispatch(article_getSuccess(res.data._id));
            }
        }).catch((error) => {
            dispatch(article_getFailure());
        });
    }
}