import actionTypes from '../actions/types.js';

//try putting the filter in the payload from navsearchbar after enter

export default function(state=[], action){
	switch(action.type){
		case actionTypes.FETCH_PINS:
			var newState = state.slice();
			for(var i=0; i<state.length; i++){
				if(state[i].pinID === action.payload.pinID){
					newState[i] = action.payload;
					return newState;
				}
			}
			newState.unshift(action.payload);
			return newState;
		case actionTypes.FETCH_REMOVED_PINS:
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
		case actionTypes.STOP_FETCHING_PINS:
			return [];
		case actionTypes.RESET_STATE:
			return [];
		case actionTypes.FILTER_PINS:
			for (var i=0; i<state.length; i++){
				
			}
				return [];
	}
	return state;
}