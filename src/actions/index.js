import * as firebase from 'firebase'
import actionTypes from './types'
import config from '../constants/firebase_config'
import router from 'react-router'
import { browserHistory } from 'react-router'


firebase.initializeApp(config);

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

export function getCurrentUser(){
	return dispatch => {
		dispatch({
			type: actionTypes.GET_CURRENT_USER
		});
	}
}

export function updateUserDisplayName(name){
	return dispatch => {
		firebase.auth().currentUser.updateProfile({
			displayName: name
		}).then(function() {
			dispatch({
				type: actionTypes.UPDATE_USER_DISPLAY_NAME,
				payload: name
		})
		}, function(error) {
			console.log(error);
		});
	}
}

export function createUser(data){
	return dispatch => {
		firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function(user) {
    		dispatch({type: actionTypes.CREATE_USER});
    		dispatch(updateUserDisplayName(data.displayName));
    		browserHistory.push('/test');
		}, function(error) {
    		console.log(error);
		});
	}
}

export function logOff(){
	return dispatch => {
		firebase.auth().signOut().then(function() {
    		dispatch({type: actionTypes.LOGOFF_USER});
    		console.log("export function logOff was run");
		}, function(error) {
    		console.log(error);
		});
	}
}

export function logIn(data){
	return dispatch => {
		firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(function() {
    		dispatch({type: actionTypes.LOGIN_USER});
    		console.log("export function login was run");
    		var user = firebase.auth().currentUser;
    		dispatch(updateUserDisplayName(user.displayName));
    		browserHistory.push('/test');
		}, function(error) {
    		console.log(error);
		});
	}
}