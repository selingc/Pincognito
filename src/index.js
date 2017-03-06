import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/index'
import Home from './components/pages/home'
import Layout from './components/pages/layout'
import Login from './components/registration/login'
import Signup from './components/registration/signup'
import Test from './components/pages/test'

/*
 *  index.js is the launchpad of our app, it looks for 'root' in the .html file and injects
 *  itself into the browser through javascript.
 *  Ideally this is the only place where we should explicitly call react's render function
 *  The provider store gives access to all children  through the connect function.
 *  Router history keeps track of history, and will also allows us to push to other pages
 *  Router history will take some more work
 */

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
          	<Route path="/" component={Layout}>
            	<IndexRoute component={Home}/>
                <Route path="test" component={Test}/>
                <Route path="login" component={Login}/>
                <Route path="signup" component={Signup}/>
          	</Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);