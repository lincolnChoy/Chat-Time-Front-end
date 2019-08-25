export interface IAuthData {
    username: string;
    password: string;
}

export interface IRegisterConfig {
    username: string;
    password: string;
    first: string;
    last: string;
}

export interface IGetMessageConfig {
    sender: string;
    destination: string;
    password: string;
}

export interface ISendMessageConfig {
    sender: string;
    destination: string;
    password: string;
    message: string;
    isImage: number;
}

export interface IUpdateProfileConfig {
    username: string;
    password: string;
    picture: string;
    about: string;
    birthday: string;
    location: string;
    occupation: string;
}

export interface IListUser {
    username: string;
    lastSeen: number;
    first: string;
    last: string;
    picture: string;
}

export interface IReducerAction {
    type: string;
    payload: any;
}