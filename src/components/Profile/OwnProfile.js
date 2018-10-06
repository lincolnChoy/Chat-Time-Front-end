import React from 'react';
import { connect } from 'react-redux';

import { editProfileField, saveProfile, changeRoute, getProfile, loadProfile, readAPI } from '../../actions';
import {
	EDIT_BIRTHDAY,
	EDIT_LOCATION,
	EDIT_OCCUPATION,
	EDIT_BLURB,

	HOME,

	SUCCESS,
	API_READ,
	LOAD_USER_PROFILE
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		birthday : state.editProfile.birthday,
		location : state.editProfile.location,
		occupation : state.editProfile.occupation,
		blurb : state.editProfile.blurb,
		profile : state.loadUser.profile,
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,

		resultWasRead : state.callAPI.resultRead,
		profileResponse : state.callAPI.resp
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editProfileField : (field, text) => dispatch(editProfileField(field, text)),
		saveProfile : (id, pw, birthday, location, occupation, blurb) => dispatch(saveProfile(id, pw, birthday, location, occupation, blurb)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		getProfile : (id) => dispatch(getProfile(id)),
		loadProfile : (type,profile) => dispatch(loadProfile(type,profile)),
		readAPI : (type) => dispatch(readAPI(type))
	}
}


class OwnProfile extends React.Component {


	saveChanges() {

		/* Destructure props */
		const { birthday, location, occupation, blurb, saveProfile, id, pw } = this.props;
		saveProfile(id, pw, birthday, location, occupation, blurb);

	}

	componentDidMount() {
		
		const { getProfile, id } = this.props;
		getProfile(id);
	}

	componentDidUpdate() {

		if (!this.props.resultWasRead) {

			const { profileResponse, loadProfile, readAPI, editProfileField } = this.props;

			if (profileResponse.code === SUCCESS) {

				loadProfile(LOAD_USER_PROFILE,profileResponse);
				editProfileField(EDIT_OCCUPATION, profileResponse.occupation)
				editProfileField(EDIT_LOCATION, profileResponse.location)
				editProfileField(EDIT_BIRTHDAY, profileResponse.birthday)
				editProfileField(EDIT_BLURB, profileResponse.blurb)
			}
			readAPI(API_READ);
		}

	}

	render() {

		const { editProfileField, changeRoute } = this.props;
		const { birthday, occupation, location, blurb } = this.props;
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

					<input onClick = { () => {this.saveChanges();}} 
						className = 'mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Save changes' />
					<input onClick = { () => { changeRoute(HOME);}} 
						className = 'mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Go back' />
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfile);