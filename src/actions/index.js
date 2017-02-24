import * as firebase from 'firebase';
import ActionTypes from '../constants/types.js';
import config from '../constants/firebase_config.js';

firebase.initializeApp(config);

const boardsRef = firebase.database().ref('boards');

export function createBoard(board){
	return dispatch => {
		const key = boardsRef.push().key;
		boardsRef.child(key).set(board);
		dispatch({
			type: ActionTypes.CREATE_BOARD
		});
	}
}

export function fetchBoards(){
	return dispatch =>{
		boardsRef.on('child_added', function(snap){
			const data = snap.val();
			data.id = snap.ref.key;
			dispatch({
				type: ActionTypes.FETCH_BOARDS,
				payload: data
			});
		});
	}
}

export function deleteBoard(id){
	return dispatch =>{
		boardsRef.child(id).remove();
		dispatch({
			type: ActionTypes.DELETE_BOARD,
			payload: id
		});
	}
}

export function stopFetchingBoards(){
	return dispatch =>{
		boardsRef.off();
		dispatch({
			type: ActionTypes.STOP_BOARD_FETCH,
			payload: []
		});
	}
}