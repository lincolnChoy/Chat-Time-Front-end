import { LOAD_ROUTE, RESET_APP_STATE } from '../constants';

const initialState: any = {
    route: "LOGIN"
}


const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case LOAD_ROUTE:
            return {
                ...state,
                route: action.payload
            }
        case RESET_APP_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;