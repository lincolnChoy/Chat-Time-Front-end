import React from 'react';
import { connect } from 'react-redux';
import LoadAnim from '../LoadAnim/LoadAnim';

import { editField, changeRoute, register, setFormState, loadUser, readAPI } from '../../actions';

import { 

	HOME,
	SIGN_IN,

	EDIT_FIRST_NAME,
	EDIT_LAST_NAME,
	EDIT_EMAIL,
	EDIT_PW,
	EDIT_PW2,

	NOT_COMPLETE,
	EXISTING_EMAIL,

	RESET
} from '../../constants';

import {
	REGISTRATION_SUCCESS,
	API_READ
} from '../../apiConstants';


const mapStateToProps = (state) => {

	return {
		first : state.registrationForm.first,
		last : state.registrationForm.last,
		email : state.registrationForm.email,
		pw : state.registrationForm.pw,
		pw2 : state.registrationForm.pw2,
		route : state.changeRoute.route,
		isPending : state.callAPI.isPending,
		apiResponse : state.callAPI.resp,
		formState : state.setFormState.formState,
		resultWasRead : state.callAPI.resultRead
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editField : (text,type) => dispatch(editField(text,type)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		register : (first, last, email, pw) => dispatch(register(first, last, email, pw)),
		setFormState : (state) => dispatch(setFormState(state)),
		loadUser : (user) => dispatch(loadUser(user)),
		readAPI :  (type) => dispatch(readAPI(type))
	}
}

class RegistrationForm extends React.Component {


	/* Check for state updates, mainly for listening for registration API result */
	componentDidUpdate() {

		if (!this.props.resultWasRead) {

			/* Destructure props */
			const { apiResponse, setFormState, changeRoute, loadUser, readAPI } = this.props;

			if (apiResponse.code === REGISTRATION_SUCCESS) {
				/* Save the user in state, then route change */
				/* Signed in */
				setFormState(RESET);
				const user = {
					first : apiResponse.first,
					last : apiResponse.last,
					id : apiResponse.id,
					pw : this.props.pw
				}
				loadUser(user);
				changeRoute(HOME);
			}
			else if (apiResponse.code === EXISTING_EMAIL) {
				setFormState(EXISTING_EMAIL);
			}
			else {
				setFormState(RESET);
			}
			readAPI(API_READ);
		}
	}

	callRegister() {

		/* Destructure props */
		const { first, last, email, pw, pw2, register, setFormState } = this.props;

		/* Make sure form is complete */
		if (!(email && pw && first && last && pw2)) {
			setFormState(NOT_COMPLETE);
		}
		/* If so, call API */
		else {
			register(first, last, email, pw);
		}
	}


	render() {

		/* Destructure props */
		const { editField, changeRoute, isPending, formState, setFormState } = this.props;

		/* If API is pending, should show loading animation */
		let loading;
		/* Determine state of the form, and if error, show it to the user */
		let formError = <p></p>;

		if (isPending) {
			loading = <LoadAnim />
		}
		else if (formState === EXISTING_EMAIL) {
			formError = <p className = 'f4 pa1 bg-light-red br3 white'>An account with this email exists.</p>;
		}
		else if (formState === NOT_COMPLETE) {
			formError = <p className = 'f4 pa1 bg-light-red br3 white'>Please fill in all fields.</p>;
		}

		return (
			<div className = 'tc'>
				{ loading }
				<div className = 'mt6'>
					<h1 className = 'f1 white'>Chat Time</h1>
					<div className = 'br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
						<div className = 'pa4 black-80'>
							<div className = 'measure'>
								<div className = 'ba b--transparent ph0 mh0'>
									<div className = 'f2 fw6 ph0 mh0'>Sign Up!</div>
									<div className = 'mt3'>
										<label className = 'db fw6 lh-copy f4'>First name</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_FIRST_NAME);
											} 
										} className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' />
										<label className = 'db fw6 lh-copy f4'>Last name</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_LAST_NAME);
											} 
										} className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'text' />
										<label className = 'db fw6 lh-copy f4'>Email</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_EMAIL);
											} 
										} className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'email' />
										<label className = 'db fw6 lh-copy f4'>Password</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_PW);
											} 
										} className = 'b pa2 input-reset ba bg-transparent hover-white w-100' type = 'password' />
										<label className = 'db fw6 lh-copy f4'>Confirm Password</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_PW2);
											} 
										} className = 'b pa2 input-reset ba bg-transparent hover-white w-100' type = 'password' />
									</div>
								</div>

								<input onClick = { 
										() => {
											this.callRegister();
										}
									} 
									className = 'mt2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Sign in' />
								<div className = 'lh-copy mt3'>
									<p onClick = { 
										() => {
											setFormState(RESET);
											changeRoute(SIGN_IN);
										}
									}
									href = '' className = 'f5 link dim black db pointer'>Have an account? Click here to sign in.</p>
								</div>
							</div>
							{ formError }
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);