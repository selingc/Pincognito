import actionTypes from '../actions/types.js';

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_USER_BOARDS:
			return state.concat(action.payload);
		case actionTypes.CREATE_USER_BOARD:
			return state;
		case actionTypes.STOP_FETCHING_USER_BOARDS:
			return [];
	}
	return state;
}