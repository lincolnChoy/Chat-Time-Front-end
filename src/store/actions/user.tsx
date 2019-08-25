import { IAuthData } from 'src/interfaces';
import { ADDRESS, USER_DELETE_FAIL, USER_DELETE_PENDING, USER_DELETE_SUCCESS } from '../constants';

export const deleteUser = (authData: IAuthData) => (dispatch: any) => {

    dispatch({ type: USER_DELETE_PENDING});

	fetch(ADDRESS + 'users', {
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			...authData
		}),
		method : 'delete'
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		if (data.code === 0) {
            dispatch({ type: USER_DELETE_SUCCESS}); 
        }
        else {
            dispatch({ type: USER_DELETE_FAIL });
        }
	})
	.catch(err => dispatch({ type: USER_DELETE_FAIL, payload: err }));

}