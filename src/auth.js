import firebase from 'firebase'
import browserHistory from 'react-router'
import store from './store/index'
import { updateUserDisplayName } from './actions/index'

function select(state) {
	console.log("fbname = " + (state.firebase.get('auth') == undefined ? undefined : state.firebase.get('auth').displayName));
	console.log("username = " + state.user.userame);
	return ({
		fbname: (state.firebase.get('auth') == undefined ? undefined : state.firebase.get('auth').displayName),
		username: state.user.username
	});
}

let name

function handleChange() {

	name = select(store.getState());

	if(name.fbname != undefined && name.username==undefined){
		store.dispatch(updateUserDisplayName(name.fbname));
		console.log("hello " + name.fbname);
	}
};


let Auth = store.subscribe(handleChange);

export default Auth;
