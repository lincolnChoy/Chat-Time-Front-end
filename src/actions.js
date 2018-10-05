import * as API from './apiConstants';

import {
	LOAD_USER,
	LOAD_PROFILE,
	
	SET_TARGET,
	SET_LIST
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
			id: user.id,
			pw : user.pw
		}
	}
}

export const loadProfile = (profile) => {

	return {
		type : LOAD_PROFILE,
		payload : {
			id : profile.id,
			occupation : profile.occupation,
			birthday : profile.birthday,
			location : profile.location,
			blurb : profile.blurb
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

export const readAPI = (type) => {

	return {
		type : type
	}
}

export const signIn = (email,pw) => (dispatch) => {

	dispatch({ type: API.API_PENDING });
	//fetch('https://chat-time-api.herokuapp.com/signIn', {
	fetch('http://localhost:3000/signIn', {
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
	//fetch('https://chat-time-api.herokuapp.com/register', {
	fetch('http://localhost:3000/register', {
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

export const getList = (id, pw) => (dispatch) => {

	dispatch({ type : API.LIST_PENDING });
	/* Call the getList API */
	//fetch('https://chat-time-api.herokuapp.com/getList', {
	fetch('http://localhost:3000/getList', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			id: id,
			pw: pw
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: API.LIST_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API.LIST_FAIL, payload : err}));
}

export const setList = (list) => {

	return {
		type : SET_LIST,
		payload : list
	}
}


export const getProfile = (id, pw) => (dispatch) => {

	dispatch({ type : API.API_PENDING });
	/* Call the getProfile API */
	//fetch('https://chat-time-api.herokuapp.com/getProfile?user=' + id, {
	fetch('http://localhost:3000/getProfile?user=' + id, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: API.API_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API.API_FAIL, payload : err}));

}

export const setTarget = (first, last, id) => {

	const user = {
		first : first,
		last : last,
		id : id
	}
	return {
		type : SET_TARGET,
		payload : user
	}
}