import {combineReducers} from 'redux';
import boardReducer from './boardReducer.js';

const combinedReducers = combineReducers({
	boards: boardReducer
});

export default combinedReducers;