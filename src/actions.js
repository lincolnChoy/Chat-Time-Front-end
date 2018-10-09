import {
	LOAD_USER,

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

	USER_PROFILE_PENDING,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,

	TARGET_PROFILE_PENDING,
	TARGET_PROFILE_SUCCESS,
	TARGET_PROFILE_FAIL,

	SENDING_MSG,
	MSG_SENT,
	MSG_SEND_FAIL,

	MSG_LOAD,
	LOAD_OLD_MSG,

	DOMAIN
	
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
			pw : user.pw,
			picture : user.picture
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

	fetch(DOMAIN + 'signIn', {
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
	fetch(DOMAIN + 'register', {
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
	fetch(DOMAIN + 'getList', {
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


export const getUserProfile = (id) => (dispatch) => {


	dispatch({ type : USER_PROFILE_PENDING });
	
	/* Call the getProfile API */
	fetch(DOMAIN + 'getProfile?user=' + id, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : USER_PROFILE_FAIL, payload : err}));

}


export const getTargetProfile = (id) => (dispatch) => {

	dispatch({ type : TARGET_PROFILE_PENDING });
	/* Call the getProfile API */
	fetch(DOMAIN + 'getProfile?user=' + id, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch({ type: TARGET_PROFILE_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : TARGET_PROFILE_FAIL, payload : err}));

}

export const saveProfile = (id, pw, birthday, location, occupation, blurb, picture) => (dispatch) => {

	dispatch({ type : API_PENDING });
	/* Call the saveProfile API */
	fetch(DOMAIN + 'saveProfile', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			id : id,
			pw: pw,
			birthday : birthday,
			location : location,
			occupation : occupation,
			blurb : blurb,
			picture : picture
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
	fetch(DOMAIN + 'getMessages', {
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
	fetch(DOMAIN + 'sendMessage', {
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
		type : MSG_LOAD,
		payload : messages
	}
}

export const loadOldMessages = (messages) => {

	return {

		type : LOAD_OLD_MSG,
		payload : messages
	}
}

export const setTarget = (first, last, id, picture) => {

	const user = {
		first : first,
		last : last,
		id : id,
		picture : picture
	}
	return {
		type : SET_TARGET,
		payload : user
	}
}