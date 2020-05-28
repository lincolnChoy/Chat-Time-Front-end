import * as React from 'react';

import { connect } from 'react-redux';
import { LOAD_ROUTE, CLEAR_AUTH_CODE } from 'src/store/constants';

import Loading from 'react-loading-animation';
import { IAuthData, IRegisterConfig } from 'src/interfaces';
import { getColor } from 'src/utility/theme';
import { register } from 'src/store/actions/auth';


interface IProps {
    authResp: any;
    theme: string;
    login: (authData: IAuthData) => {};
    clearCode: () => {};
    loadHome: () => {};
    loadLogin: () => {};
    register: (authData: IRegisterConfig) => {};
}

interface IState {
    username: string;
    password: string;
    confPassword: string;
    first: string;
    last: string;
    waitingResponse: boolean;
    error: string;
}

const mapStateToProps = (state: any) => {
    return {
        authResp: state.auth,
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        register: (authData: IRegisterConfig) => dispatch(register(authData)),
        clearCode: () => dispatch({type: CLEAR_AUTH_CODE }),
        loadHome: () => dispatch({ type: LOAD_ROUTE, payload: 'HOME'}),
        loadLogin: () => dispatch({ type: LOAD_ROUTE, payload: 'LOGIN'})
    }
}

class Register extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confPassword: "",
            first: "",
            last: "",
            waitingResponse: false,
            error: ""
        }
    }

    public componentDidUpdate = () => {
        if (this.state.waitingResponse === true) {
            if (this.props.authResp.code === 0) {
                this.props.loadHome();
                this.setState({ waitingResponse: false });
                this.props.clearCode();
            }
            else if (this.props.authResp.code === 2) {
                this.setState({ error: "That username already exists."});
                this.setState({ waitingResponse: false });
                this.props.clearCode();
            }
        }
    }

    public onUpdateUsername = (event: any) => {
        this.setState({ username: event.target.value });
    }

    public onUpdateFirstName = (event: any) => {
        this.setState({ first: event.target.value });
    }

    public onUpdateLastName = (event: any) => {
        this.setState({ last: event.target.value });
    }

    public onUpdatePassword = (event: any) => {
        this.setState({ password: event.target.value });
    }

    public onUpdateConfPassword = (event: any) => {
        this.setState({ confPassword: event.target.value });
    }

    public onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.onRegister();
        }
    }

    public onRegister = () => {
        const { first, last, username, password, confPassword } = this.state;

        if (!first || !last || !username || !password || !confPassword) {
            this.setState({ error: "Please fill in all fields"});
        }
        else if (password !== confPassword) {
            this.setState({ error: "Passwords do not match"});
        }
        else {
            const authData: IRegisterConfig = {
                username: this.state.username,
                password: this.state.password,
                first: this.state.first,
                last: this.state.last
            };
            this.setState({ waitingResponse: true });
            this.props.register(authData);
        }

    }

    public render() {
        return (
            <div className = "container">
                <div className = "form" style = {{borderColor: getColor(this.props.theme, 'border')}}>
                    <h1>Register</h1>
                    <div className = "input-container">
                        <label>Username</label>
                        <input className = "input" onChange = {this.onUpdateUsername} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}}/>
                    </div>
                    <div className = "input-container">
                        <label>First name</label>
                        <input className = "input" onChange = {this.onUpdateFirstName} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}}/>
                    </div>
                    <div className = "input-container">
                        <label>Last name</label>
                        <input className = "input" onChange = {this.onUpdateLastName} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}}/>
                    </div>
                    <div className = "input-container">
                        <label>Password</label>
                        <input className = "input" type = "password" onChange = {this.onUpdatePassword} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}} />
                    </div>
                    <div className = "input-container">
                        <label>Confirm password</label>
                        <input className = "input" type = "password" onChange = {this.onUpdateConfPassword} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}} onKeyDown = {this.onKeyDown} />
                    </div>
                    <div className = "button-container">
                        {(this.state.waitingResponse) ?
                        <Loading isLoading={true}/>
                        :
                        <div className = "login-button-group">
                            <button className = "login-button" onClick = {this.onRegister}>Register</button>
                            <a onClick = {this.props.loadLogin}>Click here to login</a>
                        </div>
                        }
                        {(this.state.error === "") ?
                        null
                        :
                        <p className = "error">{this.state.error}</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);