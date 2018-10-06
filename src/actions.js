import {
	LOAD_USER,
	LOAD_USER_PROFILE,
	LOAD_TARGET_PROFILE,
	CLEAR_PROFILE,
	LOAD_MESSAGES,
	
	SET_TARGET,
	SET_LIST,

	API_PENDING,
	API_SUCCESS,
	API_FAIL,
	
	LIST_PENDING,
	LIST_SUCCESS,
	LIST_FAIL,

	MSG_FETCH_PENDING,
	MSG_FETCH_SUCCESS,
	MSG_FETCH_FAIL,

	SENDING_MSG,
	MSG_SENT,
	MSG_SEND_FAIL
	
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

export const loadProfile = (type,profile) => {

	return {
		type : type,
		payload : {
			id : profile.id,
			occupation : profile.occupation,
			birthday : profile.birthday,
			location : profile.location,
			blurb : profile.blurb
		}
	}
}

export const editProfileField = (field, text) => {

	return {
		type : field,
		payload : text
	}
}

export const clearProfile = () => {

	return {
		type : CLEAR_PROFILE
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

	dispatch({ type: API_PENDING });
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
		dispatch({ type: API_SUCCESS, payload: data});
	})
	.catch(err => dispatch({ type: API_FAIL, payload: err }));
}


export const register = (first, last, email, pw) => (dispatch) => {

	dispatch({ type : API_PENDING });

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
		dispatch({ type: API_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API_FAIL, payload : err}));
}

export const getList = (id, pw) => (dispatch) => {

	dispatch({ type : LIST_PENDING });
	/* Call the getList API */
	fetch('https://chat-time-api.herokuapp.com/getList', {
	//fetch('http://localhost:3000/getList', {
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
		dispatch({ type: LIST_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : LIST_FAIL, payload : err}));
}

export const setList = (list) => {

	return {
		type : SET_LIST,
		payload : list
	}
}


export const getProfile = (id, pw) => (dispatch) => {

	dispatch({ type : API_PENDING });
	/* Call the getProfile API */
	fetch('https://chat-time-api.herokuapp.com/getProfile?user=' + id, {
	//fetch('http://localhost:3000/getProfile?user=' + id, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: API_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API_FAIL, payload : err}));

}

export const saveProfile = (id, pw, birthday, location, occupation, blurb) => (dispatch) => {

	dispatch({ type : API_PENDING });

	/* Call the saveProfile API */
	fetch('https://chat-time-api.herokuapp.com/saveProfile', {
	//fetch('http://localhost:3000/saveProfile', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			id : id,
			pw: pw,
			birthday : birthday,
			location : location,
			occupation : occupation,
			blurb : blurb
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: API_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : API_FAIL, payload : err}));

}

export const getMessages = (sender, destination, pw) => (dispatch) => {

	dispatch({ type : MSG_FETCH_PENDING });
	/* Call the getList API */
	fetch('https://chat-time-api.herokuapp.com/getMessages', {
	//fetch('http://localhost:3000/getMessages', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			sender : sender,
			destination : destination,
			pw: pw
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: MSG_FETCH_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : MSG_FETCH_FAIL, payload : err}));

}

export const sendMessage = (sender, destination, pw, message) => (dispatch) => {

	dispatch({ type : SENDING_MSG });
	/* Call the getList API */
	fetch('https://chat-time-api.herokuapp.com/sendMessage', {
	//fetch('http://localhost:3000/sendMessage', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			sender : sender,
			destination : destination,
			message : message,
			pw: pw
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: MSG_SENT, payload: data });
	})
	.catch(err => dispatch({ type : MSG_SEND_FAIL, payload : err}));

}

export const loadMessages = (messages) => {

	return {
		type : LOAD_MESSAGES,
		payload : messages
	}
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