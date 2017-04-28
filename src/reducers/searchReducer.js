import ActionTypes from '../actions/types.js';

const initialState = {
	boards: [],
	pins: []
}

export default function(state=initialState, action){
	switch(action.type){
		case ActionTypes.FETCH_SEARCHED_PINS:
			return Object.assign({}, state, {pins: state.pins.concat(action.payload)});
		case ActionTypes.FETCH_SEARCHED_BOARDS:
			return Object.assign({}, state, {boards: state.boards.concat(action.payload)});
		case ActionTypes.FETCH_SEARCH_BOARD_IMAGE:
			var newBoardsState = state.boards.slice();
			for(var i=0; i<state.boards.length; i++){
				if(state.boards[i].boardID === action.payload.boardID){
					newBoardsState[i] = action.payload;
					return Object.assign({}, state, {boards: newBoardsState});
				}
			}
			return state;
		case ActionTypes.RESET_SEARCH:
			return initialState;
	}
	return state;
}