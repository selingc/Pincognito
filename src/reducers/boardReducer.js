import actionTypes from '../actions/types.js';

export default function(state=[], action){
	switch(action.type){
		case actionTypes.CREATE_BOARD:
			return state;
		case actionTypes.FETCH_BOARDS:
			return state.concat(action.payload);
		case actionTypes.DELETE_BOARD:
			const newArray = state.slice();
			var index = -1;

			for(var i = 0; i < newArray.length; i++){
				if(newArray[i].id === action.payload){
					index = i;
					break;
				}
			}

			newArray.splice(index, 1);
			return newArray;
		case actionTypes.STOP_BOARD_FETCH:
			return action.payload;
	}
	return state;
}