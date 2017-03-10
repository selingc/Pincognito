import * as firebase from 'firebase'
import actionTypes from './types'
import router from 'react-router'
import { browserHistory } from 'react-router'

/*
 *	This is the heart of (react redux thunk).
 *	Board functions need to be rewritten with
 *	immutability in mind. We'll hash this out
 *	after we finalize the DB schema.
 *
 *	Will add more comments later.
 */


const boardsRef = firebase.database().ref('boards');

export function createBoard(board){
	return dispatch => {
		const key = boardsRef.push().key;
		boardsRef.child(key).set(board);
		dispatch({
			type: actionTypes.CREATE_BOARD
		});
	}
}

export function fetchBoards(){
	return dispatch =>{
		boardsRef.on('child_added', function(snap){
			const data = snap.val();
			data.id = snap.ref.key;
			dispatch({
				type: actionTypes.FETCH_BOARDS,
				payload: data
			});
		});
	}
}

export function deleteBoard(id){
	return dispatch =>{
		boardsRef.child(id).remove();
		dispatch({
			type: actionTypes.DELETE_BOARD,
			payload: id
		});
	}
}


export function stopFetchingBoards(){
	return dispatch =>{
		boardsRef.off();
		dispatch({
			type: actionTypes.STOP_BOARD_FETCH,
			payload: [] //no need for empty payload, should clear array in the reducer.
		});
	}
}

export function updateUserDisplayName(name){
	return dispatch => {
		console.log("123123213");
		dispatch({
			type: actionTypes.UPDATE_USER_DISPLAY_NAME,
			payload: name
		});
	}
}

export function fetchUser(){
	return dispatch => {
		//firebase.auth().onAuthStateChanged(function(user){
			//dispatch({
			//	type: actionTypes.UPDATE_USER_STATE,
			//	payload: user
			//});
		//});
	}
}

export function createUser(data){
	return dispatch => {
		if(/^\w+$/.test(data.username)){
            firebase.database().ref("users").child(data.username.toLowerCase()).once("value", function(snap){
                if(snap.exists()){
                    dispatch({type: actionTypes.USER_ERROR, payload: "The username is already taken."});
                }else{
                    firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(user){
                        firebase.database().ref("users").child(data.username.toLowerCase()).set({
                            email: data.email.toLowerCase(),
                            uid: user.uid,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            birthdate: data.birthdate
                        });

                        firebase.auth().currentUser.updateProfile({displayName: data.username}).then(function(){
                        	browserHistory.push("/" + data.username);
                        });

//dispatch({type: actionTypes.UPDATE_USER_DISPLAY_NAME,payload: data.username});

//						dispatch({type: actionTypes.CREATE_USER});

                    }).catch(function(error){
                    	dispatch({type: actionTypes.USER_ERROR, payload: error.message});
                    });
                }
            });
        }else{
        	dispatch({type: actionTypes.USER_ERROR, payload: "Username can only consist of letters, numbers, and underscores"});
        }
	}
}

export function logOff(){
	return dispatch => {
		firebase.auth().signOut().then(function() {
    		dispatch({type: actionTypes.LOGOFF_USER});
		}, function(error) {
    		console.log(error);
		});
	}
}

export function logIn(data){
	return dispatch => {
		if(data.email.includes("@")){
            firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function(){
            	dispatch({type: actionTypes.LOGIN_USER});
            	var user = firebase.auth().currentUser;

dispatch({type: actionTypes.UPDATE_USER_DISPLAY_NAME,payload: user.displayName});
            	browserHistory.push('/' + user.displayName);
            }).catch(function(error){
                dispatch({type: actionTypes.USER_ERROR, payload: error.message});
            });
        }else{
            firebase.database().ref("users").child(data.email.toLowerCase()).once("value", function(snap){
                if(snap.exists()){
                    firebase.auth().signInWithEmailAndPassword(snap.val().email, data.password).then(function(){
                    	dispatch({type: actionTypes.LOGIN_USER});
						browserHistory.push('/' + user.displayName);
                    }).catch(function(error){
                        dispatch({type: actionTypes.USER_ERROR, payload: error.message});
                    });
                }else{
                	dispatch({type: actionTypes.USER_ERROR, payload: "Username does not exist."});
                }
            });
        }
	}
}