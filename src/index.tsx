import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

/* Redux modules */
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from './store/reducers/auth';
import routeReducer from './store/reducers/route';
import listReducer from './store/reducers/userlist';
import messengerReducer from './store/reducers/messenger';
import profileReducer from './store/reducers/profile';
import themeReducer from './store/reducers/theme';
import userReducer from './store/reducers/user';

const rootReducer = combineReducers({ 
	auth: authReducer, 
	route: routeReducer,
	list: listReducer,
	messenger: messengerReducer,
	profile: profileReducer,
	theme: themeReducer,
	user: userReducer
 });

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store = { store }>
		<App />
  </Provider>, document.getElementById('root') as HTMLElement);
  

registerServiceWorker();
