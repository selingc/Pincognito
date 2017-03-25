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

/*--------------------------------------------------------------
	learning purposes
--------------------------------------------------------------*/

export function sayHello(){
	return dispatch => {
		dispatch({
			type: actionTypes.SAY_HELLO,
			payload: "Hello"
		});
	}
}

/*--------------------------------------------------------------
	user actions
--------------------------------------------------------------*/

export function fetchUser(){
	return dispatch => {
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				if(user.displayName){
					dispatch({
						type: actionTypes.UPDATE_USER_STATE,
						payload: user
					});
				}
			}else{
				dispatch({
					type: actionTypes.UPDATE_USER_STATE,
					payload: user
				});
				dispatch({
					type: actionTypes.RESET_STATE
				});
			}
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
							displayName: data.username
						});

						dispatch({type: actionTypes.CREATE_USER, payload: data.username});
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

/*--------------------------------------------------------------
	user board actions
--------------------------------------------------------------*/

export function fetchUserBoards(username){
	return dispatch =>{
		firebase.database().ref("users/" + username).child("boards").orderByValue().equalTo(true).on("child_added", function(snap){
			firebase.database().ref("boards").child(snap.ref.key).once("value", function(snap){
				var data = snap.val();
				data.boardID = snap.ref.key;
				data.imageURL = "https://uos.edu.pk/assets/backend/images/staff/imagenotfound.svg";
				dispatch({
					type: actionTypes.FETCH_USER_BOARDS,
					payload: data
				});

				if(snap.val().pins){
					firebase.database().ref("boards/" + snap.ref.key).child("pins").orderByValue().equalTo(true).once("child_added", function(snap){
						firebase.database().ref("pins").child(snap.ref.key).once("value", function(snap){
							if(snap.val().imageURL){
								data.imageURL = snap.val().imageURL;
								dispatch({
									type: actionTypes.FETCH_USER_BOARD_IMAGE,
									payload: data
								});
							}else{
								data.imageURL = "https://uos.edu.pk/assets/backend/images/staff/imagenotfound.svg";
								dispatch({
									type: actionTypes.FETCH_USER_BOARD_IMAGE,
									payload: data
								});
							}						
						});
					});
				}
			});
		});
	}
}

export function createUserBoard(username, data){
	return dispatch =>{
		const key = firebase.database().ref("boards").push().key;
		var redoData = {
			name: data.name,
			description: data.description,
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			createdBy: username
		}

		firebase.database().ref("boards").child(key).set(redoData);
		firebase.database().ref("users/" + username + "/boards").child(key).set(true);

		var tagsArray = data.tags.replace(/\s/g,"").split(",");
		for(var i=0; i<tagsArray.length; i++){
			firebase.database().ref("boards/" + key + "/tags").child(tagsArray[i]).set(true);
			firebase.database().ref("tags/boards/" + tagsArray[i]).child(key).set(true);
		}

		dispatch({
			type: actionTypes.CREATE_USER_BOARD
		})
	}
}

export function stopFetchingUserBoards(username){
	return dispatch =>{
		firebase.database().ref("users/" + username + "/boards").off();
		dispatch({
			type: actionTypes.STOP_FETCHING_USER_BOARDS
		});
	}
}

export function deleteUserBoard(username, boardID){
	return dispatch =>{
		firebase.database().ref("boards").child(boardID).remove();
		firebase.database().ref("users/" + username + "/boards").child(boardID).set(false);
		dispatch({
			type: actionTypes.DELETE_USER_BOARD
		})
	}
}

export function editUserBoard(username, boardID, oldData, newData){
	return dispatch =>{
		var redoData = {
			name: newData.name,
			description: newData.description
		}

		firebase.database().ref("boards").child(boardID).update(redoData);

		var oldTagsArray = oldData.tags.replace(/\s/g,"").split(",");
		for(var i=0; i<oldTagsArray.length; i++){
			firebase.database().ref("boards/" + boardID + "/tags").child(oldTagsArray[i]).set(false);
			firebase.database().ref("tags/boards/" + oldTagsArray[i]).child(boardID).set(false);
		}

		var newTagsArray = newData.tags.replace(/\s/g,"").split(",");
		for(var i=0; i<newTagsArray.length; i++){
			firebase.database().ref("boards/" + boardID + "/tags").child(newTagsArray[i]).set(true);
			firebase.database().ref("tags/boards/" + newTagsArray[i]).child(boardID).set(true);
		}

		dispatch({
			type: actionTypes.EDIT_USER_BOARD
		})
	}
}

/*--------------------------------------------------------------
	board pin actions
--------------------------------------------------------------*/

export function fetchBoardPins(boardID){
	return dispatch =>{
		firebase.database().ref("boards").child(boardID).once("value", function(snap){
			dispatch({
				type: actionTypes.FETCH_BOARD_NAME,
				payload: snap.val().name
			});
		});

		firebase.database().ref("boards/" + boardID).child("pins").orderByValue().equalTo(true).on("child_added", function(snap){
			firebase.database().ref("pins").child(snap.ref.key).once("value", function(snap){
				var pinData = snap.val();
                var tagKeys = Object.keys(pinData.tags);
                var tags = "";
                for(var i=0; i<tagKeys.length; i++){
                    tags += tagKeys[i];
                    if(i < tagKeys.length - 1){
                        tags += ", ";
                    }
                }
                pinData.tags = tags;
                pinData.boardID = boardID;
                pinData.pinID = snap.ref.key;

				dispatch({
					type: actionTypes.FETCH_BOARD_PINS,
					payload: pinData
				});
			});
		});
	}
}

export function createBoardPin(username, boardID, data){
	return dispatch =>{
		const key = firebase.database().ref("pins").push().key;

		firebase.storage().ref().child('images/pins/' + key + '.jpg').put(data.file).then(function(snapshot){
			var redoData = {
				name: data.name,
				description: data.description,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				imageURL: snapshot.downloadURL,
				createdBy: username,
				boardID: boardID
			}

			firebase.database().ref("pins").child(key).set(redoData);
			firebase.database().ref("boards/" + boardID + "/pins").child(key).set(true);
			firebase.database().ref("users/" + username + "/pins").child(key).set(true);

			var tagsArray = data.tags.replace(/\s/g,"").split(",");
			for(var i=0; i<tagsArray.length; i++){
				firebase.database().ref("pins/" + key + "/tags").child(tagsArray[i]).set(true);
				firebase.database().ref("tags/pins/" + tagsArray[i]).child(key).set(true);
			}

			dispatch({
				type: actionTypes.CREATE_BOARD_PIN
			});
		});
	}
}

export function stopFetchingBoardPins(boardID){
	return dispatch =>{
		firebase.database().ref("boards/" + boardID+ "/pins").off();
		dispatch({
			type: actionTypes.STOP_FETCHING_BOARD_PINS
		});
	}
}

export function deleteBoardPin(boardID, pinID){
	return dispatch =>{
		firebase.database().ref("pins").child(pinID).set(redoData);
		firebase.database().ref("boards/" + boardID + "/pins").child(pinID).set(false);
		dispatch({
			type: actionTypes.DELETE_BOARD_PIN
		})
	}
}

export function editBoardPin(oldBoardID, newBoardID, pinID, oldData, newData){
	return dispatch =>{
		var redoData = {
			name: newData.name,
			description: newData.description,
			boardID: newBoardID
		}

		if(newData.file){
			firebase.storage().ref().child('images/pins/' + pinID + '.jpg').put(newData.file).then(function(snapshot){
				redoData.imageURL = snapshot.downloadURL;
				firebase.database().ref("pins").child(pinID).update(redoData);

				dispatch(editBoardPinData(oldBoardID, newBoardID, pinID, oldData, newData));
			});
		}else{
			firebase.database().ref("pins").child(pinID).update(redoData);

			dispatch(editBoardPinData(oldBoardID, newBoardID, pinID, oldData, newData));
		}
	}
}

export function editBoardPinData(oldBoardID, newBoardID, pinID, oldData, newData){
	return dispatch =>{
		if(oldBoardID !== newBoardID){
			firebase.database().ref("boards/" + oldBoardID + "/pins").child(pinID).set(false);
			firebase.database().ref("boards/" + newBoardID + "/pins").child(pinID).set(true);
		}

		var oldTagsArray = oldData.tags.replace(/\s/g,"").split(",");
		for(var i=0; i<oldTagsArray.length; i++){
			firebase.database().ref("pins/" + pinID + "/tags").child(oldTagsArray[i]).set(false);
			firebase.database().ref("tags/pins/" + oldTagsArray[i]).child(pinID).set(false);
		}

		var newTagsArray = newData.tags.replace(/\s/g,"").split(",");
		for(var i=0; i<newTagsArray.length; i++){
			firebase.database().ref("pins/" + pinID + "/tags").child(newTagsArray[i]).set(true);
			firebase.database().ref("tags/pins/" + newTagsArray[i]).child(pinID).set(true);
		}

		dispatch({
			type: actionTypes.EDIT_BOARD_PIN
		});
	}
}

/*--------------------------------------------------------------
	pin actions
--------------------------------------------------------------*/

export function fetchPins(){
	return dispatch =>{
		firebase.database().ref("pins").on("child_added", function(snap){
			var pinData = snap.val();
			if(pinData.tags){
				var tagKeys = Object.keys(pinData.tags);
                var tags = "";
                for(var i=0; i<tagKeys.length; i++){
                    tags += tagKeys[i];
                    if(i < tagKeys.length - 1){
                        tags += ", ";
                    }
                }
                pinData.tags = tags;
			}

			dispatch({
				type: actionTypes.FETCH_PINS,
				payload: pinData
			});
		});
	}	
}

export function stopFetchingPins(){
	return dispatch =>{
		firebase.database().ref("pins").off();
			dispatch({
				type: actionTypes.STOP_FETCHING_PINS
			});
	}
}

/*--------------------------------------------------------------
	user pin actions
--------------------------------------------------------------*/

export function fetchUserPins(username){
	return dispatch=>{
		firebase.database().ref("users/" + username).child("pins").orderByValue().equalTo(true).on("child_added", function(snap){
			firebase.database().ref("pins").child(snap.ref.key).once("value", function(snap){
				var pinData = snap.val();
				if(pinData.tags){
					var tagKeys = Object.keys(pinData.tags);
	                var tags = "";
	                for(var i=0; i<tagKeys.length; i++){
	                    tags += tagKeys[i];
	                    if(i < tagKeys.length - 1){
	                        tags += ", ";
	                    }
	                }
	                pinData.tags = tags;
				}
                pinData.pinID = snap.ref.key;
				dispatch({
					type: actionTypes.FETCH_USER_PINS,
					payload: pinData
				});
			});
		});
	}
}

export function stopFetchingUserPins(username){
	return dispatch =>{
		firebase.database().ref("users/" + username).child("pins").off();
		dispatch({
			type: actionTypes.STOP_FETCHING_USER_PINS
		});
	}
}