import {compose, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/index.js';
import config from '../constants/firebase_config'
import {reduxReactFirebase } from 'redux-react-firebase'
//import {persistStore, autoRehydrate} from 'redux-persist'

/*	This is the store that is created by redux and passed through by the provider
 *	windowreduxdevltools is a chrome extension that allows you to view the store
 *	and step foward and backward to make debugging nice
 *	reduxThunk is a nice way to dispatch actions to the store. Most of the logic
 *	will be handled by thunk and the store.
 *	Reducers are the functions that "modify" the store state before returning
 *	the state back over to the app.
 */

/*const createStoreWithFirebase = compose(
    reduxReactFirebase(config),
)(createStore)


const store = createStoreWithFirebase(
	reducers,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(reduxThunk)
);*/

//import firebase from 'firebase'
//firebase.initializeApp(config);

const store = createStore(
	reducers, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	//applyMiddleware(reduxThunk)
	compose(
    applyMiddleware(reduxThunk),
    reduxReactFirebase(config)
    //autoRehydrate()
  )
);

//persistStore(store)

export default store;
