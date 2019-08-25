import { ADDRESS, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants';
import { IAuthData, IRegisterConfig } from 'src/interfaces';


export const login = (authData: IAuthData) => (dispatch: any) => {

    
	fetch(ADDRESS + 'auth/login', {
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			...authData
		}),
		method : 'post'
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		const userData = {
			...data,
			authData: {
				...authData
			}
		}
		dispatch({ type: LOGIN_SUCCESS, payload: userData});
	})
	.catch(err => dispatch({ type: LOGIN_FAIL, payload: err }));
}

export const register = (authData: IRegisterConfig) => (dispatch: any) => {

    
	fetch(ADDRESS + 'auth/register', {
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			...authData
		}),
		method : 'post'
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		const userData = {
			...data,
			authData: {
				...authData
			}
		}
		dispatch({ type: LOGIN_SUCCESS, payload: userData});

	})
	.catch(err => dispatch({ type: LOGIN_FAIL, payload: err }));
}