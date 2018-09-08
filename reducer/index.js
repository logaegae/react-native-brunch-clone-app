import auth from './Auth';
import article from './Article';
import alarm from './Alarm';

import { combineReducers } from 'redux';

export default combineReducers({
    auth,
    article,
    alarm
});