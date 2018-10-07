import React from 'react';
import { connect } from 'react-redux';

import { editProfileField, saveProfile, changeRoute, getUserProfile } from '../../actions';
import {

	DOMAIN,

	EDIT_BIRTHDAY,
	EDIT_LOCATION,
	EDIT_OCCUPATION,
	EDIT_BLURB,
	EDIT_PICTURE,

	HOME,

	USER_PROFILE_READ
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		birthday : state.editProfile.birthday,
		location : state.editProfile.location,
		occupation : state.editProfile.occupation,
		blurb : state.editProfile.blurb,
		picture : state.editProfile.picture,
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,

		isPending : state.getUserProfile.isPending,
		profile : state.getUserProfile.profile,
		profileLoaded : state.getUserProfile.isLoaded
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editProfileField : (field, text) => dispatch(editProfileField(field, text)),
		saveProfile : (id, pw, birthday, location, occupation, blurb, picture) => dispatch(saveProfile(id, pw, birthday, location, occupation, blurb, picture)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		getUserProfile : (id) => dispatch(getUserProfile(id)),
		loadProfile : () => dispatch({ type : USER_PROFILE_READ })
	}
}


class OwnProfile extends React.Component {

	constructor(props) {
		super(props);
		this.uploadFile = this.uploadFile.bind(this);
	}


	saveChanges() {

		/* Destructure props */
		const { birthday, location, occupation, blurb, picture, saveProfile, id, pw } = this.props;
		saveProfile(id, pw, birthday, location, occupation, blurb, picture);

	}

	uploadFile(event) {
		let file = event.target.files[0];

        var reader = new FileReader();
		reader.readAsDataURL(file);

		const { editProfileField } = this.props;

		reader.onload = function () {

			var fileData = reader.result.toString();
			editProfileField(EDIT_PICTURE, fileData);

		}
	}

	componentDidMount() {
		
		const { getUserProfile, id } = this.props;
		getUserProfile(id);
	}

	componentDidUpdate() {

		/* Only load profile once after fetching */
		if (!this.props.profileLoaded) {
			const { loadProfile } = this.props;
			loadProfile();
		}
	}

	render() {

		const { editProfileField, changeRoute } = this.props;
		const { birthday, occupation, location, blurb, picture } = this.props.profile;
		return (
			<div>
				<div className = 'ma5 pa3 w-80' style = {{ display : 'flex', justifyContent : 'space-around' }}>
					<div>
						<h1>My Profile</h1>
						<label className = 'ma2 db fw6 lh-copy f4'>Occupation</label>
						<input onChange = {(event) => { editProfileField(EDIT_OCCUPATION, event.target.value);}}
							className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' placeholder = { occupation }/>

						<label className = 'ma2 db fw6 lh-copy f4'>Location</label>
						<input 
							onChange = {(event) => { editProfileField(EDIT_LOCATION, event.target.value);}}
							className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' placeholder = { location }/>

						<label className = 'ma2 db fw6 lh-copy f4'>Birthday</label>
						<input onChange = {(event) => { editProfileField(EDIT_BIRTHDAY, event.target.value);}}
							className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' placeholder = { birthday }/>

						<label className = 'ma2 db fw6 lh-copy f4'>Blurb</label>
						<input onChange = {(event) => { editProfileField(EDIT_BLURB, event.target.value);}}
							className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' placeholder = { blurb }/>

						<input onClick = { () => {this.saveChanges(); changeRoute(HOME);}} 
							className = 'mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Save changes' />
						<input onClick = { () => { changeRoute(HOME);}} 
							className = 'mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Go back' />
					</div>
					<div className = 'ma5'>
						<img 
						className = 'br3 dp' style = {{ border : '1px solid black'}} 
						src = { picture }
						alt = 'user avatar' height = '500px'/>
						<br/>
						<p>Choose a new profile picture</p>
						<input type = 'file'
							onChange= { this.uploadFile } />
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfile);