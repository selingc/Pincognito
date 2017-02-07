import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import Login from './components/registration/login.js';
import Signup from './components/registration/signup.js';

ReactDOM.render(
    <Router history={browserHistory}>
      	<Route path="/" component={Layout}>
        	<IndexRoute component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
      	</Route>
    </Router>,
    document.getElementById('root')
);