import * as firebase from 'firebase'
import actionTypes from './types'
import config from '../constants/firebase_config'
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

firebase.initializeApp(config);

var firebaseUser = null;

export function sayHello(){
	return dispatch => {
		dispatch({
			type: actionTypes.SAY_HELLO,
			payload: "Hello"
		});
	}
}

export function fetchUserBoards(){
	return dispatch =>{
		if(firebaseUser){
			firebase.database().ref("users/" + firebaseUser.displayName + "/ownedBoards").orderByValue().equalTo(true).on("child_added", function(snap){
				firebase.data().ref("boards").child(snap.ref.key).on("child_added", function(snap){
					dispatch({
						type: actionTypes.FETCH_USER_BOARDS,
						payload: snap.val()
					});
				});
			});
		}
	}
}

export function createUserBoard(data){
	return dispatch =>{
		var key = firebase.database().ref("boards").push().key;
		firebase.database().ref("boards").child(key).set(data);
		firebase.database().ref("users/" + firebaseUser.displayName + "/ownedBoards").child(key).set(true);

		dispatch({
			type: actionTypes.CREATE_USER_BOARD
		})
	}
}

export function stopFetchingUserBoards(){
	return dispatch =>{
		firebase.database().ref("user-boards").child(firebaseUser.uid).off();
		dispatch({
			type: actionTypes.STOP_FETCHING_USER_BOARDS
		});
	}
}

export function stopFetchingBoards(){
	return dispatch =>{
		firebase.database().ref("").off();
		dispatch({
			type: actionTypes.STOP_BOARD_FETCH,
			payload: [] //no need for empty payload, should clear array in the reducer.
		});
	}
}

export function fetchUser(){
	return dispatch => {
		firebase.auth().onAuthStateChanged(function(user){
			firebaseUser = user;
			dispatch({
				type: actionTypes.UPDATE_USER_STATE,
				payload: user
			});
		});
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

                        firebase.auth().currentUser.updateProfile({
							displayName: username
						});

						dispatch({type: actionTypes.CREATE_USER});
                        browserHistory.push("/");

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
    		browserHistory.push('/login');
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
            	browserHistory.push('/');
            }).catch(function(error){
                dispatch({type: actionTypes.USER_ERROR, payload: error.message});
            });
        }else{
            firebase.database().ref("users").child(data.email.toLowerCase()).once("value", function(snap){
                if(snap.exists()){
                    firebase.auth().signInWithEmailAndPassword(snap.val().email, data.password).then(function(){
                    	dispatch({type: actionTypes.LOGIN_USER});
						browserHistory.push('/');
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