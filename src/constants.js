export const EDIT_EMAIL = 'EDIT_EMAIL';
export const EDIT_FIRST_NAME = 'EDIT_FIRST_NAME';
export const EDIT_LAST_NAME = 'EDIT_LAST_NAME';
export const EDIT_PW = 'EDIT_PW';
export const EDIT_PW2 = 'EDIT_PW2';
export const EDIT_CODE = 'EDIT_CODE';
export const EDIT_MSG = 'EDIT_MSG';

export const SIGN_IN = 'SIGN_IN';
export const REGISTRATION = 'REGISTRATION';
export const HOME = 'HOME';
export const PROFILE = 'PROFILE';
export const TARGET_PROFILE = 'TARGET_PROFILE';


/* Form state */
export const FORM_STATE_SET = 'FORM_STATE_SET';

/* API response codes */
export const SUCCESS = '0';
export const WRONG_CRED = '1';
export const USER_NOT_EXIST = '2';
export const NOT_COMPLETE = '3';
export const INVALID_PARAMS = '4';
export const EXISTING_EMAIL = '6';

export const RESET = 'RESET';
export const PW_MISMATCH = 'PW_MISMATCH';
export const NOT_VERIFIED = 'NOT_VERIFIED';
export const INVALID_EMAIL = 'INVALID_EMAIL';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_GROUP = 'LOAD_GROUP';

export const LOAD_USER_PROFILE = 'LOAD_USER_PROFILE';
export const LOAD_TARGET_PROFILE = 'LOAD_TARGET_PROFILE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const LOAD_OLD_MSG = 'LOAD_OLD_MSG';
export const DUMP_MSGS = 'DUMP_MSGS';
export const REMOVE_BLOCK = 'REMOVE_BLOCK';


/* Profile action constants */
export const EDIT_BIRTHDAY = 'EDIT_BIRTHDAY';
export const EDIT_LOCATION = 'EDIT_LOCATION';
export const EDIT_OCCUPATION = 'EDIT_OCCUPATION';
export const EDIT_BLURB = 'EDIT_BLURB';
export const EDIT_PICTURE = 'EDIT_PICTURE';

export const SET_TARGET = 'SET_TARGET';

export const SET_LIST = 'SET_LIST';
export const SET_GROUP_LIST = 'SET_GROUP_LIST';

/* For reducers */
export const API_PENDING = 'API_PENDING';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAIL = 'API_FAIL';
export const API_READ = 'API_READ';

export const MSG_FETCH_PENDING = 'MSG_FETCH_PENDING';
export const MSG_FETCH_SUCCESS = 'MSG_FETCH_SUCCESS';
export const MSG_FETCH_FAIL = 'MSG_FETCH_FAIL';
export const MSG_LOAD = 'MSG_LOAD';

export const LIST_PENDING = 'LIST_PENDING';
export const LIST_SUCCESS = 'LIST_SUCCESS';
export const LIST_FAIL = 'LIST_FAIL';
export const LIST_READ = 'LIST_READ';

export const USER_PROFILE_PENDING = 'USER_PROFILE_PENDING';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAIL = 'USER_PROFILE_FAIL';
export const USER_PROFILE_READ = 'USER_PROFILE_READ';

export const TARGET_PROFILE_PENDING = 'TARGET_PROFILE_PENDING';
export const TARGET_PROFILE_SUCCESS = 'TARGET_PROFILE_SUCCESS';
export const TARGET_PROFILE_FAIL = 'TARGET_PROFILE_FAIL';
export const TARGET_PROFILE_READ = 'TARGET_PROFILE_READ';
export const CLEAR_TARGET_PROFILE = 'CLEAR_TARGET_PROFILE';


export const SENDING_MSG = 'SENDING_MSG';
export const MSG_SENT = 'MSG_SENT';
export const MSG_SEND_FAIL = 'MSG_SEND_FAIL';
export const CLEAR_MSG = 'CLEAR_MSG';
export const SET_FILE = 'SET_FILE';
export const CLEAR_FILE = 'CLEAR_FILE';
export const EMPTY_MSG = 'EMPTY_MSG';

export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';
export const CREATE_GROUP = 'CREATE_GROUP';
export const CANCEL_CREATE = 'CANCEL_CREATE';
export const ADD_USER = 'ADD_USER';

export const GROUP_PENDING = 'GROUP_PENDING';
export const GROUP_CREATED = 'GROUP_CREATED';
export const GROUP_FAILED = 'GROUP_FAILED';


export const DOMAIN = 'https://chat-time-api.herokuapp.com/';
//export const DOMAIN = 'http://222.155.4.117:3000/';
//export const DOMAIN = 'http://localhost:3000/';