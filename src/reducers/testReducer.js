import actionTypes from '../actions/types.js';

//	here we will contain only board reducers
//	We will have to rewrite these later include an immutable state


export default function(state="", action){
	switch(action.type){
		case actionTypes.SAY_HELLO:
			return action.payload;
	}
	return state;
}