import {
	EDIT_EMAIL,
	EDIT_FIRST_NAME,
	EDIT_LAST_NAME,
	EDIT_PW,
	EDIT_PW2,
	EDIT_CODE,
	SIGN_IN,
	REGISTRATION,
	HOME

} from './constants';

import {
	API_PENDING,
	API_SUCCESS,
	API_FAIL,
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


const initialFormState = {

	email : '',
	first : '',
	last : '',
	pw : '',
	pw2 : '',
	code : ''

}

export const signInForm = (state = initialFormState, action = {}) => {

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
		case EDIT_CODE : 
			return Object.assign({}, state, { code : action.payload });
		default :
			return state;
	}
}

const APIResults = {

	isPending : false,
	resp : '',
	error : ''
}

export const callAPI = (state = APIResults, action = {}) => {

	switch (action.type) {

		case API_PENDING :
			return Object.assign({}, state, { isPending : true });
		/* Fall through */
		case API_SUCCESS :
		case API_FAIL : 
			return Object.assign({}, state, { resp : action.payload , isPending : false });
		default :
			return state;
	}
}
