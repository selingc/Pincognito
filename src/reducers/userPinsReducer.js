import actionTypes from '../actions/types.js';

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_USER_PINS:
			var newState = state.slice();
			for(var i=0; i<state.length; i++){
				if(state[i].pinID === action.payload.pinID){
					newState[i] = action.payload;
					return newState;
				}
			}
			return state.concat(action.payload);
		case actionTypes.STOP_FETCHING_USER_PINS:
			return [];
		case actionTypes.FETCH_USER_REMOVED_PINS:
			var newState = state.slice();
			var index = -1;
			for(var i=0; i<state.length; i++){
				if(state[i].pinID === action.payload){
					index = i;
				}
			}

			if(index >= 0){
				newState.splice(index, 1);
				return newState;
			}

			return state;
		case actionTypes.RESET_STATE:
			return [];
	}
	return state;
}