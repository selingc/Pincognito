import actionTypes from '../actions/types.js';

/*{	user reducers will go here
 *	InitialState is the initial state of the store
 *	The store is meant to be immutable, if you need to return state,
 *	make a deep copy first (object.assign(params...)
 *	This is one of the main ideas behind the flux framework we are using.
 *	All payload names are constants kept in action/types.js but we might
 *	have to split them up as we write more.
 */

const initialState = {
   username: null,
   error: ""
}

export default function(state=initialState, action){
	switch(action.type){
		case actionTypes.CREATE_USER:
			return Object.assign({}, state, {error: ""});

		case actionTypes.UPDATE_USER_STATE:
			return Object.assign({}, state, (action.payload ? {username: action.payload.displayName} : initialState));

		case actionTypes.UPDATE_USER_PHOTOURL:
			return Object.assign({}, state, {photoURL: action.payload});

		case actionTypes.LOGIN_USER:
			return Object.assign({}, state, {error: ""});

		case actionTypes.LOGOFF_USER:
			return state;
			
		case actionTypes.USER_ERROR:
			return Object.assign({}, state, {error: action.payload});
	}
	return state;
}