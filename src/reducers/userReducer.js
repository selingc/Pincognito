import ActionTypes from '../constants/types.js';

const initialState = {
   email: null
}

export default function(state=initialState, action){
	switch(action.type){
		case ActionTypes.CREATE_USER:
			return Object.assign({}, state, {email: action.payload.email});
		case ActionTypes.GET_CURRENT_USER:
			return state;
		case ActionTypes.LOGIN_USER:
			return state;
		case ActionTypes.lOGOFF_USER:
			return state;
	}
	return state;
}