import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/index.js';

const store = createStore(
	reducers,
	applyMiddleware(reduxThunk)
);

export default store;