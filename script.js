var admin = require("firebase-admin");
//admin.database.enableLogging(true);
var serviceAccount = require("./ideaboard-f10ef-firebase-adminsdk-se3t2-8d8ba15d73.json");

admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://ideaboard-f10ef.firebaseio.com"
});

// admin.database().ref("pins").on("child_added", function(snap){
// 	var pinData = snap.val();
// 	if(pinData.tags){
// 		var tagKeys = Object.keys(pinData.tags);
// 	    for(var i=0; i<tagKeys.length; i++){
// 	    	if(pinData.tags[tagKeys[i]]){
// 	            admin.database().ref("pins/"+ snap.ref.key +"/tags").child(tagKeys[i]).remove();
// 	            admin.database().ref("pins/"+ snap.ref.key +"/tags").child(tagKeys[i].trim()).set(true);
// 	        }else{
// 	        	admin.database().ref("pins/"+ snap.ref.key +"/tags").child(tagKeys[i]).remove();
// 	        }
// 	    }
// 	}
// });

// admin.database().ref("tags/boards").child(" small plane").once("value", function(snap){
// 	admin.database().ref("tags/boards").child("small plane").set(snap.val());
// });

admin.database().ref("boards").on("child_added", function(snap){
	var pinID = snap.ref.key;
	admin.database().ref("boards/" + pinID).child("tags").orderByValue().equalTo(false).on("child_added", function(snap){
		console.log(pinID);
	});
});

// admin.database().ref("pins").on("child_added", function(snap){
// 	var pinData = snap.val();
// 	if(pinData.tags){
// 		var tagKeys = Object.keys(pinData.tags);
// 	    for(var i=0; i<tagKeys.length; i++){
// 	    	if(pinData.tags[tagKeys[i]]){
// 	            admin.database().ref("tags/pins/" + tagKeys[i]).child(snap.ref.key).set(true);
// 	        }
// 	    }
// 	}
// });

// admin.database().ref("boards").on("child_added", function(snap){
// 	admin.database().ref("boards").child(snap.ref.key).update({numFollowers: 0});
// });



// admin.database().ref("boards").on("child_added", function(snap){
// 	var numFollowers = snap.val().numFollowers ? snap.val().numFollowers : 0;
// 	var boardID = snap.ref.key;
// 	var createdBy = snap.val().createdBy;
// 	admin.database().ref("users").on("child_added", function(snap){
// 		var username = snap.ref.key;
// 		var boards = snap.val().boards;
// 		if(boards && boards[boardID] && createdBy !== username){
// 			console.log(boardID, numFollowers, createdBy, username);
// 			admin.database().ref("boards").child(boardID).update({numFollowers: numFollowers+=1});
// 		}
// 	});
// });