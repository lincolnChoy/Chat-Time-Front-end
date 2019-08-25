import { ADDRESS, LIST_SUCCESS, LIST_FAIL } from '../constants';

export const getList = (username: string) => (dispatch: any) => {

	/* Call the getList API */
	fetch(`${ADDRESS}users?username=${username}`, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		if (data.code === 0) {
			dispatch({ type: LIST_SUCCESS, payload: data });
		}
		else {
			dispatch({ type: LIST_FAIL, payload: data });
		}
	})
	.catch(err => dispatch({ type : LIST_FAIL, payload : err}));
}