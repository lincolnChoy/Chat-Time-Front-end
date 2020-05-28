import * as React from 'react';
import './Header.css';

import { connect } from 'react-redux';
import { RESET_APP_STATE, LOAD_ROUTE, SET_PROFILE_TARGET, TOGGLE_THEME } from 'src/store/constants';
import { getColor } from 'src/utility/theme';
import { IAuthData } from 'src/interfaces';
import { deleteUser } from 'src/store/actions/user';
import Loading from 'react-loading-animation';

interface IProps {
    user: string;
    route: string;
    theme: string;
    target: string;
    authData: IAuthData;
    deleteResponse: string;
    logout: () => {};
    viewProfile: () => {};
    goBack: () => {};
    loadTarget: (target: string) => {};
    deleteUser: (authData: IAuthData) => {};
    toggleTheme: () => {};
}

const mapStateToProps = (state:any) => {
    return {
        user: state.auth.authData.username,
        authData: state.auth.authData,
        route: state.route.route,
        theme: state.theme.theme,
        target: state.profile.target,
        deleteResponse: state.user.deleteResponse
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch({type: RESET_APP_STATE }),
        viewProfile: () => dispatch({ type: LOAD_ROUTE, payload: "PROFILE"}),
        loadTarget: (target: string) => dispatch({ type: SET_PROFILE_TARGET, payload: target }),
        deleteUser: (authData: IAuthData) => dispatch(deleteUser(authData)),
        goBack: () => dispatch({ type: LOAD_ROUTE, payload: "HOME"}),
        toggleTheme: () => dispatch({ type: TOGGLE_THEME })
    }
}

class Header extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidUpdate = () => {
        if (this.props.deleteResponse === 'SUCCESS') {
            alert('Account successfully deleted');
            this.props.logout();
        }
        else if (this.props.deleteResponse === 'FAIL') {
            alert('Something went wrong, could not delete account');
        }
    }

    public viewProfile = () => {
        this.props.loadTarget(this.props.user);
        this.props.viewProfile();
    }

    public deleteProfile = () => {
        const confirmation = confirm('Are you sure you want to delete your account?');
        if (confirmation === true) {
            this.props.deleteUser(this.props.authData);
        }
    }

    public render() {
        let extraProfile;

        if (this.props.target === this.props.user) {
            extraProfile = 
                <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.deleteProfile}>Delete account</div>;
                
            if (this.props.deleteResponse === 'PENDING') {
                extraProfile = 
                <div className = "header-loading">
                    <Loading isLoading={true} />
                </div>
            }
        } 
        
        return (
            <div className = "header-container" style = {{backgroundColor: getColor(this.props.theme, 'header')}}>
                <div>
                    <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.props.toggleTheme}>Toggle theme</div>
                </div>
                <div className = "header-button-group">
                    {(this.props.route === 'PROFILE') ?
                    <div className = "profile-group">
                        <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.props.goBack}>Home</div>
                        {extraProfile}
                    </div>
                    :
                    <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.viewProfile}>My profile</div>
                    }
                    <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.props.logout}>Sign out</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);