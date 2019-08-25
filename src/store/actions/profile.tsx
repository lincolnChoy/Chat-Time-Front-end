import { ADDRESS, LOAD_PROFILE, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_PENDING, UPDATE_PROFILE_SUCCESS } from "../constants";
import { IUpdateProfileConfig } from 'src/interfaces';


export const getProfile = (target: string) => (dispatch: any) => {


    fetch(`${ADDRESS}profile?username=${target}`, {
		method :'get',
		headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(res => {
        if (res.code === 0) {
            dispatch({ type: LOAD_PROFILE, payload: res.user });
        }
    })
}

export const updateProfile = (config: IUpdateProfileConfig) => (dispatch: any) => {

    dispatch({ type: UPDATE_PROFILE_PENDING });
    
    fetch(`${ADDRESS}profile`, {
		method :'put',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            ...config
		})
    })
    .then(res => res.json())
    .then(res => {
        if (res.code === 0) {
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.user });
        }
        else {
            dispatch({ type: UPDATE_PROFILE_FAIL });
        }
    })
    .catch(err => {
        console.log(err);
    })
}