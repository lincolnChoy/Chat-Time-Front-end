import * as React from 'react';
import { connect } from 'react-redux';

import Loading from 'react-loading-animation';

import './Profile.css';
import { getProfile } from 'src/store/actions/profile';
import Header from 'src/components/Header/Header';
import { getColor } from 'src/utility/theme';
import ProfileEdit from './ProfileEdit/ProfileEdit';

interface IProps {
    target: any;
    user: string;
    profile: any;
    theme: string;
    getProfile: (target: string) => {};
    updateState: string;
}

interface IState {
    editMode: boolean;
}

const mapStateToProps = (state: any) => {
    return {
        target: state.profile.target,
        user: state.auth.authData.username,
        profile: state.profile.profile,
        theme: state.theme.theme,
        updateState: state.profile.update.state
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getProfile: (target: string) => (dispatch(getProfile(target)))
    }
}

class Profile extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            editMode: false
        }
    }

    public componentDidMount() {
        this.props.getProfile(this.props.target);
    }

    public toggleEditMode = () => {
        this.setState({editMode: !this.state.editMode});
    }

    public render() {

        let stateMessage = null;
        if (this.props.updateState === 'SUCCESS') {
            stateMessage = <p>Successfully updated profile!</p>;
        }
        else if (this.props.updateState === 'FAIL') {
            stateMessage = <p>Could not update profile. Please try again</p>;
        }

        return (
            <div className = "profile-page-container" style = {{borderColor: getColor(this.props.theme, 'border')}}>
                <Header />
                {(this.props.profile === null) ?
                <Loading isLoading={true} />
                :
                (this.state.editMode) ? 
                <ProfileEdit profile = {this.props.profile} toggleEditMode = {this.toggleEditMode}/>
                :
                <div className = "profile-main-container">
                    <div className = "profile-container">
                        <div className = "profile-pic-edit">
                            <img src = {this.props.profile.picture} className = "profile-picture" />
                        </div>
                        <div className = "profile-details">
                            <div>
                                <div className = "profile-item">
                                    <h3>{this.props.profile.first} {this.props.profile.last}</h3>
                                </div>
                                <div className = "profile-item">
                                    <span>About me: {this.props.profile.about}</span>
                                </div>
                                <div className = "profile-item">
                                    <span>Location: {this.props.profile.location}</span>
                                </div>
                                <div className = "profile-item">
                                    <span>Occupation: {this.props.profile.occupation}</span>
                                </div>
                                <div className = "profile-item">
                                    <span>Birthday: {this.props.profile.birthday}</span>   
                                </div>
                            </div>
                            {(this.props.updateState ==='PENDING') ?
                            <Loading isLoading = {true}/>
                            :
                            (this.props.user === this.props.target)  ?
                            <button 
                                onClick = {this.toggleEditMode} 
                                className = "edit-button" 
                                style = {{backgroundColor: getColor(this.props.theme, 'button'), color: getColor(this.props.theme, 'btnText'), borderColor: getColor(this.props.theme, 'border')}}
                                >Edit</button>
                            :
                            null
                            }
                            {stateMessage}

                        </div>
                    </div>
                </div>

                }

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);