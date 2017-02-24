import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as firebase from 'firebase';

import {Provider} from 'react-redux';
import store from './store/index.js';

import Home from './components/pages/home.js';
import Layout from './components/pages/layout.js';
import Login from './components/registration/login.js';
import Signup from './components/registration/signup.js';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
          	<Route path="/" component={Layout}>
            	<IndexRoute component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
          	</Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);