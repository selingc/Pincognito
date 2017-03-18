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

export function sayHello(){
	return dispatch => {
		dispatch({
			type: actionTypes.SAY_HELLO,
			payload: "Hello"
		});
	}
}

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

export function fetchUserBoards(username){
	return dispatch =>{
		firebase.database().ref("users/" + username).child("boards").orderByValue().equalTo(true).on("child_added", function(snap){
			firebase.database().ref("boards").child(snap.ref.key).once("value", function(snap){
				var data = snap.val();
				data.id = snap.ref.key;
				if(snap.val().pins){
					firebase.database().ref("boards/" + snap.ref.key).child("pins").orderByValue().equalTo(true).once("child_added", function(snap){
						firebase.database().ref("pins").child(snap.ref.key).once("value", function(snap){
							if(snap.val().imageURL){
								data.imageURL = snap.val().imageURL;
								dispatch({
									type: actionTypes.FETCH_USER_BOARDS,
									payload: data
								});
							}else{
								data.imageURL = "https://uos.edu.pk/assets/backend/images/staff/imagenotfound.svg";
								dispatch({
									type: actionTypes.FETCH_USER_BOARDS,
									payload: data
								});
							}						
						});
					});
				}else{
					data.imageURL = "https://uos.edu.pk/assets/backend/images/staff/imagenotfound.svg";
					dispatch({
						type: actionTypes.FETCH_USER_BOARDS,
						payload: data
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
			timestamp: firebase.database.ServerValue.TIMESTAMP
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
				dispatch({
					type: actionTypes.FETCH_BOARD_PINS,
					payload: snap.val()
				});
			});
		});
	}
}

export function createBoardPin(boardID, data){
	return dispatch =>{
		const key = firebase.database().ref("pins").push().key;

		firebase.storage().ref().child('images/pins/' + key + '.jpg').put(data.file).then(function(snapshot){
			var redoData = {
				name: data.name,
				description: data.description,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				imageURL: snapshot.downloadURL
			}

			firebase.database().ref("pins").child(key).set(redoData);
			firebase.database().ref("boards/" + boardID + "/pins").child(key).set(true);

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

export function fetchPins(){
	return dispatch =>{
		firebase.database().ref("pins").on("child_added", function(snap){
			dispatch({
				type: actionTypes.FETCH_PINS,
				payload: snap.val()
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

export function fetchUserPins(username){
	return dispatch=>{
		firebase.database().ref("users/" + username).child("boards").orderByValue().equalTo(true).on("child_added", function(snap){
			firebase.database().ref("boards/" + snap.ref.key).child("pins").orderByValue().equalTo(true).on("child_added", function(snap){
				firebase.database().ref("pins").child(snap.ref.key).once("value", function(snap){
					var data = snap.val();
					data.imageURL = snap.val().imageURL ? snap.val().imageURL : "https://uos.edu.pk/assets/backend/images/staff/imagenotfound.svg";
					dispatch({
						type: actionTypes.FETCH_USER_PINS,
						payload: data
					});				
				});
			});
		});
	}
}

export function stopFetchingUserPins(username){
	return dispatch =>{
		firebase.database().ref("users/" + username).child("boards").off();
		dispatch({
			type: actionTypes.STOP_FETCHING_USER_PINS
		});
	}
}