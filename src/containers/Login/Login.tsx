import * as React from 'react';
import './Login.css';

import { connect } from 'react-redux';
import { login } from 'src/store/actions/auth';
import { LOAD_ROUTE, CLEAR_AUTH_CODE } from 'src/store/constants';

import Loading from 'react-loading-animation';
import { IAuthData } from 'src/interfaces';
import { getColor } from 'src/utility/theme';


interface IProps {
    authResp: any;
    theme: string;
    login: (authData: IAuthData) => {};
    clearCode: () => {};
    loadHome: () => {};
    loadRegister: () => {}
}

interface IState {
    username: string;
    password: string;
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
        login: (authData: any) => dispatch(login(authData)),
        clearCode: () => dispatch({type: CLEAR_AUTH_CODE }),
        loadHome: () => dispatch({ type: LOAD_ROUTE, payload: 'HOME'}),
        loadRegister: () => dispatch({ type: LOAD_ROUTE, payload: 'REGISTER'})
    }
}

class Login extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: "",
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
            else if (this.props.authResp.code !== -1) {
                this.setState({ error: "Incorrect email/password"});
                this.setState({ waitingResponse: false });
                this.props.clearCode();
            }
        }
    }

    public onUpdateUsername = (event: any) => {
        this.setState({ username: event.target.value });
    }

    public onUpdatePassword = (event: any) => {
        this.setState({ password: event.target.value });
    }

    public onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.onLogin();
        }
    }

    public onLogin = () => {
        const { username, password } = this.state;

        if (!username || !password) {
            this.setState({ error: "Please fill in all fields"});
        }
        else {
            const authData: IAuthData = {
                username,
                password
            };
            this.setState({ waitingResponse: true });
            this.props.login(authData);
        }

    }

    public render() {
        return (
            <div className = "container">
                <div className = "form" style = {{borderColor: getColor(this.props.theme, 'border')}}>
                    <h1>Login</h1>
                    <div className = "input-container">
                        <label>Username</label>
                        <input className = "input" onChange = {this.onUpdateUsername} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}}/>
                    </div>
                    <div className = "input-container">
                        <label>Password</label>
                        <input className = "input" type = "password" onChange = {this.onUpdatePassword} style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}} onKeyDown = {this.onKeyDown} />
                    </div>
                    <div className = "button-container">
                        {(this.state.waitingResponse) ?
                        <Loading isLoading={true}/>
                        :
                        <div className = "login-button-group">
                           <button className = "login-button" onClick = {this.onLogin}>Login</button>
                            <a onClick = {this.props.loadRegister}>Click here to register</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);