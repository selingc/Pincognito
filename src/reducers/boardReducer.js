import ActionTypes from '../constants/types.js';

export default function(state=[], action){
	switch(action.type){
		case ActionTypes.CREATE_BOARD:
			return state;
		case ActionTypes.FETCH_BOARDS:
			return state.concat(action.payload);
		case ActionTypes.DELETE_BOARD:
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
		case ActionTypes.STOP_BOARD_FETCH:
			return action.payload;
	}
	return state;
}