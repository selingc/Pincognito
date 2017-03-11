import actionTypes from '../actions/types.js';

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_BOARD_PINS:
			return state.concat(action.payload);
		case actionTypes.CREATE_BOARD_PIN:
			return state;
		case actionTypes.STOP_FETCHING_BOARD_PINS:
			return [];
	}
	return state;
}