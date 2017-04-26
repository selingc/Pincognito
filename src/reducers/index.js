import {combineReducers} from 'redux'
import boardPinsReducer from './boardPinsReducer'
import userReducer from './userReducer'
import testReducer from './testReducer'
import userBoardsReducer from './userBoardsReducer'
import { reducer as formReducer } from 'redux-form'
import pinsReducer from './pinsReducer'
import userPinsReducer from './userPinsReducer.js'

//reducers are combined into one for easy access to the store

const combinedReducers = combineReducers({
	user: userReducer,
	form: formReducer,
	test: testReducer,
	userBoards: userBoardsReducer,
	boardPins: boardPinsReducer,
	pins: pinsReducer,
	userPins: userPinsReducer
});

export default combinedReducers;