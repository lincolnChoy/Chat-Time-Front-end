import { IReducerAction } from "src/interfaces";
import { SET_PROFILE_TARGET, RESET_APP_STATE, LOAD_PROFILE, UPDATE_PROFILE_PENDING, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from '../constants';

const initialState = {
    target: null,
    profile: null,
    update: {
        state: 'none'
    }
}

const reducer = (state = initialState, action: IReducerAction) => {

    switch(action.type) {
        case SET_PROFILE_TARGET:
            return {
                profile: null,
                update: { state: 'none'},
                target: action.payload
            }
        case LOAD_PROFILE:
            return {
                ...state,
                update: {state: 'none'},
                profile: action.payload
            }
        case UPDATE_PROFILE_PENDING:
            return {
                ...state,
                update: {
                    state: 'PENDING'
                }
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                update: {
                    state: 'SUCCESS'
                }
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                update: {
                    state: 'FAIL'
                }
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;