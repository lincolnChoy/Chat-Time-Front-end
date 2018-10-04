import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import 'tachyons';

/* Redux modules */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { changeRoute, signInForm, callAPI, setFormState, loadUser, registrationForm, setTarget } from './reducers';

/* Prepare redux logger */
const logger = createLogger();

const rootReducer = combineReducers({ changeRoute, signInForm, callAPI, setFormState, loadUser, registrationForm, setTarget });

/* Create store to contain state, also add redux-logger for debugging and thunk middleware for async actions
 The store uses the root reducer to create the store/ the object tree of the state */
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

/* Wrap container in Provider and pass store down */
ReactDOM.render(
	<Provider store = { store }>
		<App />
	</Provider>, document.getElementById('root'));

