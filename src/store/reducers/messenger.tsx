import { LOAD_TARGET, RESET_APP_STATE, MSG_FETCH_SUCCESS, MSG_FETCH_FAIL, MSG_SEND_SUCCESS, MSG_FETCH_PENDING, MSG_SEND_PENDING, MSG_SEND_FAIL } from '../constants';

const initialState = {
    target: null,
    fetch: {
        messages: [],
        code: -1
    },
    send: {
        code: -1
    }
}

const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case LOAD_TARGET:
            return {
                ...state,
                fetch: {
                    code: -1,
                    messages: []
                },
                target: action.payload
            }
        case MSG_FETCH_PENDING:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    code: -1
                }
            }
        case MSG_FETCH_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...action.payload
                }
            }
        case MSG_FETCH_FAIL:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    code: -1
                }
            }
        case MSG_SEND_PENDING:
            return {
                ...state,
                send: {
                    code: null
                }
            }
        case MSG_SEND_SUCCESS:
            return {
                ...state,
                send: {
                    code: 0
                }
            }
        case MSG_SEND_FAIL:
            return {
                ...state,
                send: {
                    code: -1
                }
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;