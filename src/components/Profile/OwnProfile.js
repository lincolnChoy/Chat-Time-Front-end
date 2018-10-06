import React from 'react';
import { connect } from 'react-redux';

import { editProfileField, saveProfile } from '../../actions';
import {
	EDIT_BIRTHDAY,
	EDIT_LOCATION,
	EDIT_OCCUPATION,
	EDIT_BLURB
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		birthday : state.editProfile.birthday,
		location : state.editProfile.location,
		occupation : state.editProfile.occupation,
		blurb : state.editProfile.blurb,
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw

	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editProfileField : (field, text) => dispatch(editProfileField(field, text)),
		saveProfile : (id, pw, birthday, location, occupation, blurb) => dispatch(saveProfile(id, pw, birthday, location, occupation, blurb))
	}
}


class OwnProfile extends React.Component {


	saveChanges() {

		/* Destructure props */
		const { birthday, location, occupation, blurb, saveProfile, id, pw } = this.props;
		saveProfile(id, pw, birthday, location, occupation, blurb);

	}

	componentDidMount() {
		
	}

	render() {

		const { editProfileField } = this.props;

		return (
			<div>
				<div className = 'ma3 pa3 w-70'>
					<h1>My Profile</h1>
					<label className = 'ma2 db fw6 lh-copy f4'>Occupation</label>
					<input 
						onChange = {
							(event) => {
								editProfileField(EDIT_OCCUPATION, event.target.value);
							}
						}
						className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' />

					<label className = 'ma2 db fw6 lh-copy f4'>Location</label>
					<input 
						onChange = {
							(event) => {
								editProfileField(EDIT_LOCATION, event.target.value);
							}
						}
						className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' />
					<label className = 'ma2 db fw6 lh-copy f4'>Birthday</label>
					<input 
						onChange = {
							(event) => {
								editProfileField(EDIT_BIRTHDAY, event.target.value);
							}
						}
						className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' />
					<label className = 'ma2 db fw6 lh-copy f4'>Blurb</label>
					<input 
						onChange = {
							(event) => {
								editProfileField(EDIT_BLURB, event.target.value);
							}
						}
						className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' />
					<input onClick = { () => {
											this.saveChanges();
										}
									} 
						className = 'mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Save changes' />
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProfile);