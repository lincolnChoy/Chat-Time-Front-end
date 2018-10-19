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
	TARGET_PROFILE,

	NOT_COMPLETE,
	WRONG_CRED,
	EXISTING_EMAIL,
	PW_MISMATCH,
	INVALID_EMAIL,
	RESET,

	LOAD_USER,
	SET_TARGET,
	SET_LIST,

	EDIT_BIRTHDAY,
	EDIT_LOCATION,
	EDIT_OCCUPATION,
	EDIT_BLURB,
	EDIT_PICTURE,

	API_PENDING,
	API_SUCCESS,
	API_FAIL,
	API_READ,

	LIST_PENDING,
	LIST_SUCCESS,
	LIST_FAIL,

	MSG_FETCH_PENDING,
	MSG_FETCH_SUCCESS,
	MSG_FETCH_FAIL,
	MSG_LOAD,
	LOAD_OLD_MSG,

	USER_PROFILE_PENDING,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
	USER_PROFILE_READ,

	TARGET_PROFILE_PENDING,
	TARGET_PROFILE_SUCCESS,
	TARGET_PROFILE_FAIL,
	TARGET_PROFILE_READ,
	CLEAR_TARGET_PROFILE,

	SENDING_MSG,
	MSG_SENT,
	MSG_SEND_FAIL,
	CLEAR_MSG,

	SET_FILE,
	CLEAR_FILE,
	EMPTY_MSG,

	CREATE_GROUP,
	CANCEL_CREATE,
	ADD_USER,
	GROUP_PENDING,
	GROUP_CREATED,
	GROUP_FAILED

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
		case TARGET_PROFILE : 
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
	message : '',
	isFile : 0
}

export const editMessenger = (state = initialMessageBox, action = {}) => {

	switch(action.type) {
		case EDIT_MSG : 
			return Object.assign({}, state, { message : action.payload });
		case EMPTY_MSG : 
			return Object.assign({}, state, { message : '' });
		case SET_FILE : 
			return Object.assign({}, state, { isFile : 1 });
		case CLEAR_FILE : 
			return Object.assign({}, state, { isFile : 0 });
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

	isPending : false,
	resp : '',
	list : '',
	isLoaded : true
}

export const getList = (state = initialUserList, action = {}) => {

	switch(action.type) {

		case LIST_PENDING : 
			return Object.assign({}, state, { listPending : true });
		case LIST_SUCCESS :
			return Object.assign({}, state, { resp : action.payload , listPending : false, isLoaded : false });
		case LIST_FAIL :
			return Object.assign({}, state, { resp : action.payload , listPending : false, isLoaded : false });
		case SET_LIST :
			return Object.assign({}, state, { list : action.payload, isLoaded : true });
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
	signedIn : false
}


export const loadUser = (state = initialStateUser, action = {}) => {

	switch (action.type) {

		case LOAD_USER : 
			return Object.assign({}, state, { user : action.payload, signedIn : true });
		default : 
			return state;
	}
}

const initialUserProfile = {

	profile : '',
	isPending : false,
	isLoaded : true
}


export const getUserProfile = (state = initialUserProfile, action = {}) => {

	switch(action.type) {
		case USER_PROFILE_PENDING : 
			return Object.assign({}, state, { isPending : true });
		case USER_PROFILE_SUCCESS : 
			return Object.assign({}, state, { profile : action.payload, isPending : false, isLoaded : false });
		case USER_PROFILE_FAIL : 
			return Object.assign({}, state, { profile : action.payload, isPending : false, isLoaded : false});
		case USER_PROFILE_READ : 
			return Object.assign({}, state, { isLoaded : true });
		default : 
			return state;
	}
}



const initialTarget = {

	target : '',
	profile : '',
	isPending : false,
	isLoaded : true
}

export const loadTarget = (state = initialTarget, action = {}) => {

	switch (action.type) {

		case SET_TARGET :
			return Object.assign({}, state, { target : action.payload });
		case TARGET_PROFILE_PENDING : 
			return Object.assign({}, state, { isPending : true });
		case TARGET_PROFILE_SUCCESS : 
			return Object.assign({}, state, { profile : action.payload, isPending : false, isLoaded : false });
		case TARGET_PROFILE_FAIL : 
			return Object.assign({}, state, { profile : action.payload, isPending : false, isLoaded : false});
		case TARGET_PROFILE_READ : 
			return Object.assign({}, state, { isLoaded : true });
		case CLEAR_TARGET_PROFILE : 	
			return Object.assign({}, state, { profile : '' });
		default : 
			return state;
	}
}

const initialProfileForm = {

	birthday : '',
	location : '',
	occupation : '',
	blurb : '',
	picture : ''

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
		case EDIT_PICTURE : 
			return Object.assign({}, state, { picture : action.payload });
		default : 	
			return state;
	}
}

const initialMessages = {

	isPending : false,
	messagesLoaded : false,
	resp : '',
	messages : '',
	prevMessages : ''
}

export const fetchMessages = (state = initialMessages, action = {}) => {

	switch(action.type) {

		case MSG_FETCH_PENDING : 
			return Object.assign({}, state, { isPending : true });
		case MSG_FETCH_SUCCESS :
			return Object.assign({}, state, { resp : action.payload , isPending : false, messagesLoaded : false });
		case MSG_FETCH_FAIL :
			return Object.assign({}, state, { resp : action.payload , isPending : false, messagesLoaded : false });
		case MSG_LOAD : 
			return Object.assign({}, state, { messages : action.payload, messagesLoaded : true });
		case LOAD_OLD_MSG : 
			return Object.assign({}, state, { prevMessages : action.payload });	
		default : 
			return state;
	}
}

const msgResults = {

	isPending : false,
	resp : '',
	messageSent : false
}

export const sendMessage = (state = msgResults, action = {}) => {

	switch(action.type) {
		case SENDING_MSG :
			return Object.assign({}, state, { isPending : true });
		case MSG_SENT : 
			return Object.assign({}, state, { resp : action.payload , isPending : false, messageSent : true });
		case MSG_SEND_FAIL : 
			return Object.assign({}, state, { resp : action.payload , isPending : false, messageSent : false });
		case CLEAR_MSG : 
			return Object.assign({}, state, { messageSent : false });
		default : 
			return state;
	}
}

const initialCreateGroup = {

	isPending : false,
	resp : '',
	createGroup : false,
	group : []

}

export const createGroup = (state = initialCreateGroup, action = {}) => {

	switch(action.type) {
		case CREATE_GROUP : 
			return Object.assign({}, state, { createGroup : true, group : [] });
		case ADD_USER : 
			return Object.assign({}, state, { group : action.payload });
		case CANCEL_CREATE : 
			return Object.assign({}, state, { createGroup : false, group : [] });
		case GROUP_PENDING : 
			return Object.assign({}, state, { isPending : true });
		case GROUP_CREATED :
			return Object.assign({}, state, { isPending : false, resp : action.payload, group : [] });
		case GROUP_FAILED :
			return Object.assign({}, state, { isPending : false, resp : action.payload, group : [] });
		default : 
			return state;
	}
}