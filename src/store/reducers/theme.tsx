import { IReducerAction } from "src/interfaces";
import { TOGGLE_THEME, SET_THEME } from '../constants';

const initialState = {
    theme: 'LIGHT'
}


const reducer = (state = initialState, action: IReducerAction) => {

    switch(action.type) {
        case TOGGLE_THEME:
            return {
                theme: (state.theme === 'LIGHT') ? 'DARK' : 'LIGHT'
            }
        case SET_THEME:
            return {
                theme: action.payload
            }
        default:
            return state;
    }
}

export default reducer;