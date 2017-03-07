import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as firebase from 'firebase';

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import Login from './components/registration/login.js';
import Signup from './components/registration/signup.js';
import Profile from './components/profile/profile.js';

var config = {
    apiKey: "AIzaSyDRtAfAp5xUug2tTBZTDwtSLnPzE3Oujn4",
    authDomain: "ideaboard-f10ef.firebaseapp.com",
    databaseURL: "https://ideaboard-f10ef.firebaseio.com",
    storageBucket: "ideaboard-f10ef.appspot.com",
    messagingSenderId: "115197901745"
};

firebase.initializeApp(config);

ReactDOM.render(
    <Router history={browserHistory}>
      	<Route path="/" component={Layout}>
        	<IndexRoute component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/:username" component={Profile}/>
      	</Route>
    </Router>,
    document.getElementById('root')
);