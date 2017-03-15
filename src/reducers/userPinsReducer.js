import actionTypes from '../actions/types.js';

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_USER_PINS:
			return state.concat(action.payload);
		case actionTypes.STOP_FETCHING_USER_PINS:
			return [];
	}
	return state;
}