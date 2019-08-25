import { LOGIN_SUCCESS, RESET_APP_STATE, CLEAR_AUTH_CODE } from '../constants';
import { IAuthData } from 'src/interfaces';

interface IUser {
    username: string,
    picture: string,
    first: string,
    last: string
}

interface IState {
    authData: IAuthData,
    code: number,
    user: IUser
}

const initialState: IState = {
    authData: {
        username: "",
        password: ""
    },
    user: {
        username: "",
        picture: "",
        first: "",
        last: ""
    },
    code: -1
}

const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_AUTH_CODE:
            return {
                ...state,
                code: -1
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;