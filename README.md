#Pinterest

###Installation Instructions
1. git clone git@github.com:selingSJSU/IdeaBoard.git
2. cd IdeaBoard
3. npm install (installs all dependencies)

###Run Application
1. npm run build
2. npm start (set to automatically recompile when changes are made, so don't worry about restarting the server)

###Folder Structure
Everything you need is inside the "src" folder
* index.js - contains firebase api keys and routes
* registration folder
	* signup.js - signup page
	* login.js - login page
* pages folder
	* layout.js - so that the navbar is displayed on every page
	* home.js - homepage