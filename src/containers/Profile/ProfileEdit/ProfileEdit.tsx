import * as React from 'react';
import { connect } from 'react-redux';
import { getColor } from 'src/utility/theme';
import { IAuthData, IUpdateProfileConfig } from 'src/interfaces';
import { updateProfile } from 'src/store/actions/profile';

import './ProfileEdit.css';

interface IProps {
    theme: string;
    profile: any;
    authData: IAuthData;
    toggleEditMode: () => {};
    saveProfile: (config: IUpdateProfileConfig) => {}
}

interface IState {
    birthday: string;
    about: string;
    location: string;
    occupation: string;
    imageInput: string
}

const mapStateToProps = (state: any) => {
    return {
        theme: state.theme.theme,
        authData: state.auth.authData
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveProfile: (config: IUpdateProfileConfig) => (dispatch(updateProfile(config)))
    }
}

class ProfileEdit extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        const { birthday, about, location, occupation } = this.props.profile;
        this.state = {
            imageInput: "",
            birthday,
            about,
            location,
            occupation
        }
    }


    public onChangeAbout = (event: any) => {
        this.setState({about: event.target.value});
    }

    public onChangeBirthday = (event: any) => {
        this.setState({birthday: event.target.value});
    }

    public onChangeLocation = (event: any) => {
        this.setState({location: event.target.value});
    }

    public onChangeOccupation = (event: any) => {
        this.setState({occupation: event.target.value});
    }

    public uploadFile = (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
            if (reader.result) {
                const fileData = reader.result.toString();
                this.setState({ imageInput: fileData });
            }
		}
    }
    
    public saveProfile = () => {
        const { birthday, about, location, imageInput, occupation } = this.state;

        const config: IUpdateProfileConfig= {
            ...this.props.authData,
            birthday,
            about,
            location,
            picture: imageInput,
            occupation
        }
        this.props.saveProfile(config);
        this.props.toggleEditMode();
    }

    public render() {

        const { picture } = this.props.profile;
        
        return (

            <div className = "profile-main-container">
                    <div className = "profile-container">
                        <div className = "profile-pic-edit">
                            <img src = {picture} className = "profile-picture" />   
                            <input type = 'file'
                                accept="image/png, image/jpeg"
							    onChange= { this.uploadFile } />
                        </div>
                        <div className = "profile-details">
                            <div>
                                <div className = "profile-item">
                                    <h3>{this.props.profile.first} {this.props.profile.last}</h3>
                                </div>
                                <div className = "profile-item">
                                    <input placeholder ="About me" 
                                        style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'border')}} 
                                        onChange = {this.onChangeAbout}
                                        value = {this.state.about}
                                    />
                                </div>
                                <div className = "profile-item">
                                    <input placeholder ="Location" 
                                        style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'border')}}
                                        onChange = {this.onChangeLocation}
                                        value = {this.state.location}
                                    />
                                </div>
                                <div className = "profile-item">
                                    <input placeholder ="Occupation" 
                                        style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'border')}} 
                                        onChange = {this.onChangeOccupation}
                                        value = {this.state.occupation}
                                    />
                                </div>
                                <div className = "profile-item">
                                    <input placeholder ="Birthday" 
                                        style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'border')}} 
                                        onChange = {this.onChangeBirthday}
                                        value = {this.state.birthday}
                                    />
                                </div>
                            </div>
                            <div className = "button-group-container">
                                <button 
                                    onClick = {this.saveProfile} 
                                    className = "edit-button" 
                                    style = {{backgroundColor: getColor(this.props.theme, 'button'), color: getColor(this.props.theme, 'btnText'), borderColor: getColor(this.props.theme, 'border')}}
                                >Save</button>
                                <button 
                                    onClick = {this.props.toggleEditMode} 
                                    className = "edit-button" 
                                    style = {{backgroundColor: getColor(this.props.theme, 'button'), color: getColor(this.props.theme, 'btnText'), borderColor: getColor(this.props.theme, 'border')}}
                                >Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>

        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);