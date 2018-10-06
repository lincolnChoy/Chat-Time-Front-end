import {
	EDIT_EMAIL,
	EDIT_FIRST_NAME,
	EDIT_LAST_NAME,
	EDIT_PW,
	EDIT_PW2,
	EDIT_MSG,

	SIGN_IN,
	REGISTRATION,
	HOME,
	PROFILE,

	NOT_COMPLETE,
	WRONG_CRED,
	EXISTING_EMAIL,
	PW_MISMATCH,
	INVALID_EMAIL,
	RESET,

	LOAD_USER,
	LOAD_USER_PROFILE,
	LOAD_TARGET_PROFILE,
	LOAD_MESSAGES,
	SET_TARGET,
	SET_LIST,

	EDIT_BIRTHDAY,
	EDIT_LOCATION,
	EDIT_OCCUPATION,
	EDIT_BLURB,
	CLEAR_PROFILE,

	API_PENDING,
	API_SUCCESS,
	API_FAIL,
	API_READ,

	LIST_PENDING,
	LIST_SUCCESS,
	LIST_FAIL,
	LIST_READ,

	MSG_FETCH_PENDING,
	MSG_FETCH_SUCCESS,
	MSG_FETCH_FAIL,
	MSG_READ,

	SENDING_MSG,
	MSG_SENT,
	MSG_SEND_FAIL,
	CLEAR_MSG

} from './constants';


const initialRouteState = {

	route : SIGN_IN
}

export const changeRoute = (state = initialRouteState, action = {}) => {

	switch(action.type) {
		case SIGN_IN : 
			return Object.assign({}, state, { route : action.payload });
		case REGISTRATION : 
			return Object.assign({}, state, { route : action.payload });
		case HOME : 
			return Object.assign({}, state, { route : action.payload });
		case PROFILE : 
			return Object.assign({}, state, { route : action.payload });
		default : 
			return state;
	}
}


const initialSignInForm = {
	email : '',
	pw : ''
}

export const signInForm = (state = initialSignInForm, action = {}) => {

	switch (action.type) {

		case EDIT_EMAIL : 
			return Object.assign({}, state, { email : action.payload });
		case EDIT_PW : 
			return Object.assign({}, state, { pw : action.payload });
		default :
			return state;
	}
}

const initialRegistrationForm = {
	first : '',
	last : '',
	email : '',
	pw : '',
	pw2 : '' 
}


export const registrationForm = (state = initialRegistrationForm, action = {}) => {

	switch (action.type) {

		case EDIT_EMAIL : 
			return Object.assign({}, state, { email : action.payload });
		case EDIT_FIRST_NAME : 
			return Object.assign({}, state, { first : action.payload });
		case EDIT_LAST_NAME : 
			return Object.assign({}, state, { last : action.payload });
		case EDIT_PW : 
			return Object.assign({}, state, { pw : action.payload });
		case EDIT_PW2 : 
			return Object.assign({}, state, { pw2 : action.payload });
		default :
			return state;
	}
}

const initialMessageBox = {
	message : ''
}

export const editMessenger = (state = initialMessageBox, action = {}) => {

	switch(action.type) {
		case EDIT_MSG : 
			return Object.assign({}, state, { message : action.payload });
		default : 
			return state;
	}
}


const APIResults = {

	isPending : false,
	resultRead : true,
	resp : '',
	error : ''
}

export const callAPI = (state = APIResults, action = {}) => {

	switch (action.type) {

		case API_PENDING :
			return Object.assign({}, state, { isPending : true });
		case API_SUCCESS :
			return Object.assign({}, state, { resp : action.payload , isPending : false, resultRead : false });
		case API_FAIL : 
			return Object.assign({}, state, { resp : action.payload , isPending : false, resultRead : false });
		case API_READ : 
			return Object.assign({}, state, { resultRead : true });
		default :
			return state;
	}
}

const initialUserList = {

	listPending : false,
	resultRead : false,
	resp : '',
	list : 'empty'
}

export const getList = (state = initialUserList, action = {}) => {

	switch(action.type) {

		case LIST_PENDING : 
			return Object.assign({}, state, { listPending : true });
		case LIST_SUCCESS :
			return Object.assign({}, state, { resp : action.payload , listPending : false, resultRead : false });
		case LIST_FAIL :
			return Object.assign({}, state, { resp : action.payload , listPending : false, resultRead : false });
		case LIST_READ : 
			return Object.assign({}, state, { resultRead : true });
		case SET_LIST :
			return Object.assign({}, state, { list : action.payload });
		default : 
			return state;
	}

}



const initialFormState = {

	formState : ''
}


export const setFormState = (state = initialFormState, action = {}) => {

	switch (action.type) {
		case NOT_COMPLETE :
			return Object.assign({} , state, { formState : action.payload });
		case WRONG_CRED :
			return Object.assign({} , state, { formState : action.payload });
		case EXISTING_EMAIL :
			return Object.assign({} , state, { formState : action.payload });
		case PW_MISMATCH :
			return Object.assign({} , state, { formState : action.payload });
		case INVALID_EMAIL :
			return Object.assign({} , state, { formState : action.payload });
		case RESET : 
			return initialFormState;
		default : 
			return state;
	}

}

const initialStateUser = {

	user : {
		first : '',
		last : '',
		id : '',
		pw : ''
	},
	profile : '',
	signedIn : false
}


export const loadUser = (state = initialStateUser, action = {}) => {

	switch (action.type) {

		case LOAD_USER : 
			return Object.assign({}, state, { user : action.payload, signedIn : true });
		case LOAD_USER_PROFILE : 
			return Object.assign({}, state, { profile : action.payload, signedIn : true });
		case CLEAR_PROFILE : 
			return Object.assign({}, state, { profile : '' });
		default : 
			return state;
	}
}

const initialTarget = {

	target : '',
	profile : ''
}

export const setTarget = (state = initialTarget, action = {}) => {

	switch (action.type) {

		case SET_TARGET : 
			return Object.assign({}, state, { target : action.payload });
		case LOAD_TARGET_PROFILE : 
			return Object.assign({}, state, { profile : action.payload });
		default : 
			return state;
	}
}

const initialProfileForm = {

	birthday : '',
	location : '',
	occupation : '',
	blurb : ''

}

export const editProfile = (state = initialProfileForm, action = {}) => {

	switch(action.type) {
		case EDIT_BIRTHDAY : 
			return Object.assign({}, state, { birthday : action.payload });
		case EDIT_LOCATION : 
			return Object.assign({}, state, { location : action.payload });
		case EDIT_OCCUPATION : 
			return Object.assign({}, state, { occupation : action.payload });
		case EDIT_BLURB : 
			return Object.assign({}, state, { blurb : action.payload });
		default : 	
			return state;
	}
}

const initialMessages = {

	isPending : false,
	resultRead : false,
	resp : '',
	messages : ''
}

export const fetchMessages = (state = initialMessages, action = {}) => {

	switch(action.type) {

		case MSG_FETCH_PENDING : 
			return Object.assign({}, state, { isPending : true });
		case MSG_FETCH_SUCCESS :
			return Object.assign({}, state, { resp : action.payload , isPending : false, resultRead : false });
		case MSG_FETCH_FAIL :
			return Object.assign({}, state, { resp : action.payload , isPending : false, resultRead : false });
		case MSG_READ : 
			return Object.assign({}, state, { resultRead : true });		
		case LOAD_MESSAGES :
			return Object.assign({}, state, { messages : action.payload });
		default : 
			return state;
	}
}

const msgResults = {

	isPending : false,
	resultRead : false,
	resp : '',
	messageSent : true
}

export const sendMessage = (state = msgResults, action = {}) => {

	switch(action.type) {
		case SENDING_MSG :
			return Object.assign({}, state, { isPending : true });
		case MSG_SENT : 
			return Object.assign({}, state, { resp : action.payload , isPending : false, resultRead : false, messageSent : true });
		case MSG_SEND_FAIL : 
			return Object.assign({}, state, { resp : action.payload , isPending : false, resultRead : false });
		case CLEAR_MSG : 
			return Object.assign({}, state, { messageSent : false, resultRead : true });
		default : 
			return state;
	}
}