import * as API from './apiConstants';

import {
	LOAD_USER
} from './constants';


export const changeRoute = (route) => {

	return {
		type : route,
		payload : route
	}
}

export const loadUser = (user) => {

	return {
		type: LOAD_USER,
		payload: {
			first: user.first,
			last: user.last,
			email: user.email
		}
	}
}

export const editField = (text, type) => {

	return {
		type : type,
		payload : text
	}
}

export const setFormState = (state) => {

	return {
		type : state,
		payload : state
	}
}

export const signIn = (email,pw) => (dispatch) => {

	dispatch({ type: API.API_PENDING });
	fetch('https://interngrate-api.herokuapp.com/signIn', {
	//fetch('http://localhost:3000/signIn', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			email: email,
			pw: pw
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: API.API_SUCCESS, payload: data});
	})
	.catch(err => dispatch({ type: API.API_FAIL, payload: err }));
}