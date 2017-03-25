import actionTypes from '../actions/types.js';

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_PINS:
			return state.concat(action.payload);
		case actionTypes.STOP_FETCHING_PINS:
			return [];
		case actionTypes.RESET_STATE:
			return [];
	}
	return state;
}