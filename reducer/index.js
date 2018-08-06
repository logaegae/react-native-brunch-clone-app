import auth from './Auth';
import article from './Article';

import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    article
});