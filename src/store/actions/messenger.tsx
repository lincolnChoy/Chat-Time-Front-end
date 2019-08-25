import { ADDRESS, MSG_FETCH_SUCCESS, MSG_FETCH_FAIL, MSG_SEND_FAIL, MSG_FETCH_PENDING, MSG_SEND_PENDING, MSG_SEND_SUCCESS } from '../constants';
import { IGetMessageConfig, ISendMessageConfig } from 'src/interfaces';

export const getMessages = (authData: IGetMessageConfig) => (dispatch: any) => {

	dispatch({ type: MSG_FETCH_PENDING });
	/* Call the getMessages API */
	fetch(ADDRESS + 'messages/fetch', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({
			sender : authData.sender,
			destination : authData.destination,
			password: authData.password
		})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		console.log(data);
		if (data.code === 0) {
			dispatch({ type: MSG_FETCH_SUCCESS, payload: data });
		}
		else {
			dispatch({ type : MSG_FETCH_FAIL, payload : data })
		}
	})
	.catch(err => dispatch({ type : MSG_FETCH_FAIL, payload : err}));

}

export const sendMessage = (config: ISendMessageConfig) => (dispatch: any) => {

	dispatch({ type: MSG_SEND_PENDING });
	dispatch({ type: MSG_FETCH_PENDING });
	/* Call the sendMessage API */
	fetch(ADDRESS + 'messages/send', {
		method :'post',
		headers: {'Content-Type' : 'application/json'},
		body: JSON.stringify({ ...config})
	})
	/* Parse the json response */
	.then(response => response.json())
	.then(data => {
		dispatch(getMessages({
			sender: config.sender,
			destination: config.destination,
			password: config.password
		}))
		dispatch({ type: MSG_SEND_SUCCESS, payload: data });
	})
	.catch(err => dispatch({ type : MSG_SEND_FAIL, payload : err}));

}
