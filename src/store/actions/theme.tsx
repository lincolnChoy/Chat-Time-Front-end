import { SET_THEME } from '../constants';

export const setTheme = (theme: string) => {
    return {
        type: SET_THEME,
        payload: theme
    }
}