import {compose, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/index.js';
import {persistStore, autoRehydrate} from 'redux-persist'

/*	This is the store that is created by redux and passed through by the provider
 *	windowreduxdevltools is a chrome extension that allows you to view the store
 *	and step foward and backward to make debugging nice
 *	reduxThunk is a nice way to dispatch actions to the store. Most of the logic
 *	will be handled by thunk and the store.
 *	Reducers are the functions that "modify" the store state before returning
 *	the state back over to the app.
 */

const store = createStore(
	reducers, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	compose(
    applyMiddleware(reduxThunk),
    autoRehydrate()
  )
);

persistStore(store)

export default store;
