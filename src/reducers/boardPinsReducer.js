import actionTypes from '../actions/types.js';

const initialState = {
	name: "",
	pins: []
} 

export default function(state=initialState, action){
	switch(action.type){
		case actionTypes.FETCH_BOARD_NAME:
			return Object.assign({}, state, {name: action.payload});
		case actionTypes.FETCH_BOARD_PINS:
			return Object.assign({}, state, {pins: state.pins.concat(action.payload)});
		case actionTypes.CREATE_BOARD_PIN:
			return state;
		case actionTypes.STOP_FETCHING_BOARD_PINS:
			return initialState;
		case actionTypes.RESET_STATE:
			return initialState;
	}
	return state;
}