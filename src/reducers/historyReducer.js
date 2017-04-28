import actionTypes from '../actions/types.js';

export default function(state="/", action){
	switch(action.type){
		case actionTypes.SAVE_PREVIOUS_PATH:
			return action.payload;
	}
	return state;
}