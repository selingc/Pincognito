import {combineReducers} from 'redux';
import boardReducer from './boardReducer.js';
import userReducer from './userReducer.js';

const combinedReducers = combineReducers({
	boards: boardReducer,
	user: userReducer
});

export default combinedReducers;