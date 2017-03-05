import actionTypes from '../actions/types.js';

const initialState = {
   displayName: null,
   photoURL: "http://"
}

export default function(state=initialState, action){
	switch(action.type){
		case actionTypes.CREATE_USER:
			return state;
		case actionTypes.UPDATE_USER_DISPLAY_NAME:
			return Object.assign({}, state, {displayName: action.payload});
		case actionTypes.UPDATE_USER_PHOTOURL:
			return Object.assign({}, state, {photoURL: action.payload});
		case actionTypes.GET_CURRENT_USER:
			return state;
		case actionTypes.LOGIN_USER:
			return state;
		case actionTypes.lOGOFF_USER:
			return Object.assign({}, state, {displayName: null, photoURL: "asd"});
	}
	return state;
}