import React from 'react';
import { connect } from 'react-redux';

import { editProfileField, saveProfile, changeRoute, getUserProfile } from '../../actions';
import {
	EDIT_BIRTHDAY,
	EDIT_LOCATION,
	EDIT_OCCUPATION,
	EDIT_BLURB,

	HOME,

	USER_PROFILE_READ
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		birthday : state.editProfile.birthday,
		location : state.editProfile.location,
		occupation : state.editProfile.occupation,
		blurb : state.editProfile.blurb,
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
		saveProfile : (id, pw, birthday, location, occupation, blurb) => dispatch(saveProfile(id, pw, birthday, location, occupation, blurb)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		getUserProfile : (id) => dispatch(getUserProfile(id)),
		loadProfile : () => dispatch({ type : USER_PROFILE_READ })
	}
}


class OwnProfile extends React.Component {


	saveChanges() {

		/* Destructure props */
		const { birthday, location, occupation, blurb, saveProfile, id, pw } = this.props;
		saveProfile(id, pw, birthday, location, occupation, blurb);

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
		const { birthday, occupation, location, blurb } = this.props.profile;
		return (
			<div>
				<div className = 'ma3 pa3 w-70'>
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
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfile);