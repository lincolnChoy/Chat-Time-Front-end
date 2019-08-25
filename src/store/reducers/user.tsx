import { IReducerAction } from "src/interfaces";
import { RESET_APP_STATE, USER_DELETE_PENDING, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from '../constants';

const initialState = {
    deleteResponse: null
}

const reducer = (state = initialState, action: IReducerAction) => {

    switch(action.type) {
        case USER_DELETE_PENDING:
            return {
                deleteResponse: 'PENDING'
            }
        case USER_DELETE_SUCCESS:
            return {
                deleteResponse: 'SUCCESS'
            }
        case USER_DELETE_FAIL:
            return {
                deleteResponse: 'FAIL'
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;