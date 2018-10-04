import {
	EDIT_EMAIL,
	EDIT_FIRST_NAME,
	EDIT_LAST_NAME,
	EDIT_PW,
	EDIT_PW2,

	SIGN_IN,
	REGISTRATION,
	HOME,

	NOT_COMPLETE,
	WRONG_CRED,
	EXISTING_EMAIL,
	WRONG_CODE,
	VERIFIED,
	PW_MISMATCH,
	NOT_VERIFIED,
	RESET,

	LOAD_USER,
	SET_TARGET

} from './constants';

import {
	API_PENDING,
	API_SUCCESS,
	API_FAIL,
	API_READ
} from './apiConstants';


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
		case WRONG_CODE :
			return Object.assign({} , state, { formState : action.payload });
		case VERIFIED : 
			return Object.assign({} , state, { formState : action.payload });
		case PW_MISMATCH :
			return Object.assign({} , state, { formState : action.payload });
		case NOT_VERIFIED :
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
		email : ''
	}
}


export const loadUser = (state = initialStateUser, action = {}) => {

	switch (action.type) {

		case LOAD_USER : 
			return Object.assign({}, state, { user : action.payload, signedIn : true });
		default : 
			return state;
	}
}

const initialTarget = {

	target : ''
}

export const setTarget = (state = initialTarget, action = {}) => {

	switch (action.type) {

		case SET_TARGET : 
			return Object.assign({}, state, { target : action.payload });
		default : 
			return state;
	}
}