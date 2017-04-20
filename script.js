var admin = require("firebase-admin");
//admin.database.enableLogging(true);
var serviceAccount = require("./ideaboard-f10ef-firebase-adminsdk-se3t2-8d8ba15d73.json");

admin.initializeApp({
  	credential: admin.credential.cert(serviceAccount),
  	databaseURL: "https://ideaboard-f10ef.firebaseio.com"
});

// admin.database().ref("pins").on("child_added", function(snap){
// 	var numRepins = snap.val().numRepins ? snap.val().numRepins : 0;
// 	var pinID = snap.ref.key;
// 	var createdBy = snap.val().createdBy;
// 	admin.database().ref("users").on("child_added", function(snap){
// 		var username = snap.ref.key;
// 		var pins = snap.val().pins;
// 		if(pins && pins[pinID] && createdBy !== username){
// 			console.log(pinID, numRepins, createdBy, username);
// 			admin.database().ref("pins").child(pinID).update({numRepins: numRepins+=1});
// 		}
// 	});
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