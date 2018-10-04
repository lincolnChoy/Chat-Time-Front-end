import * as API from './apiConstants';

import {
	LOAD_USER,
	SET_TARGET
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
			email: user.email,
			pw : user.pw
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

export const setAPIRead = () => {

	return {
		type : API.API_READ
	}
}

export const signIn = (email,pw) => (dispatch) => {

	dispatch({ type: API.API_PENDING });
	fetch('https://chat-time-api.herokuapp.com/signIn', {
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


export const register = (first, last, email, pw) => (dispatch) => {

	dispatch({ type : API.API_PENDING });

	/* Call the registration API */
	fetch('https://chat-time-api.herokuapp.com/register', {
	//fetch('http://localhost:3000/register', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			first: first,
			last: last,
			email: email,
			pw: pw
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: API.API_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API.API_FAIL, payload : err}));
}

export const getList = (email, pw) => (dispatch) => {

	dispatch({ type : API.API_PENDING });
	/* Call the getList API */
	fetch('https://chat-time-api.herokuapp.com/getList', {
	//fetch('http://localhost:3000/getList', {
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
		dispatch({ type: API.API_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API.API_FAIL, payload : err}));
}

export const setTarget = (first, last, email) => {

	const user = {
		first : first,
		last : last,
		email : email
	}
	return {
		type : SET_TARGET,
		payload : user
	}
}