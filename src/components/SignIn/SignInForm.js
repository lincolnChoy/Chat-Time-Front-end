import React from 'react';
import { connect } from 'react-redux';
import LoadAnim from '../LoadAnim/LoadAnim';

import { editField, changeRoute, signIn, setFormState, loadUser } from '../../actions';

import { 

	REGISTRATION,
	HOME,
	VERIFY,

	EDIT_EMAIL,
	EDIT_PW,

	NOT_COMPLETE,
	WRONG_CRED,
	NOT_VERIFIED,

	RESET
} from '../../constants';

import {
	SIGN_IN_SUCCESS
} from '../../apiConstants';


const mapStateToProps = (state) => {

	return {
		email : state.signInForm.email,
		pw : state.signInForm.pw,
		route : state.changeRoute.route,
		isPending : state.callAPI.isPending,
		signInResponse : state.callAPI.resp,
		formState : state.setFormState.formState
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editField : (text,type) => dispatch(editField(text,type)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		signIn : (email, pw) => dispatch(signIn(email, pw)),
		setFormState : (state) => dispatch(setFormState(state)),
		loadUser : (user) => dispatch(loadUser(user))
	}
}

class SignInForm extends React.Component {


	constructor() {

		super();
		this.state = {
			apiRead : false
		}
	}

	/* Check for state updates, mainly for listening for login API result */
	componentDidUpdate() {


		if (!this.state.apiRead) {

			/* Destructure props */
			const { signInResponse, setFormState, changeRoute, loadUser } = this.props;

			if (signInResponse.code === WRONG_CRED) {
				setFormState(WRONG_CRED);
			}
			else if (signInResponse.code === SIGN_IN_SUCCESS) {
				/* Save the user in state, then route change */
				loadUser(signInResponse);
				changeRoute(HOME);
			}
			else if (signInResponse.code === NOT_VERIFIED) {
				setFormState(RESET);
				loadUser(signInResponse);
				changeRoute(VERIFY);
			}
			else {
				setFormState('');
			}
			this.setState({ apiRead : true });
		}

	}

	callSignIn() {

		/* Destructure props */
		const { email, pw, signIn, setFormState } = this.props;

		/* Make sure form is complete */
		if (!email || !pw) {
			setFormState(NOT_COMPLETE);
		}
		/* If so, call API */
		else {
			signIn(email, pw);
			this.setState({ apiRead : false });
		}
		

	}


	render() {

		/* Destructure props */
		const { editField, changeRoute, isPending, formState } = this.props;

		/* If API is pending, should show loading animation */
		let loading;
		if (isPending) {
			loading = <LoadAnim />
		}

		/* Determine state of the form, and if error, show it to the user */
		let formError;
		if (formState === WRONG_CRED) {
			formError = <p>Incorrect email or password.</p>;
		}
		else if (formState === NOT_COMPLETE) {
			formError = <p>Please fill in both fields.</p>;
		}

		return (
			<div>
				{ loading }
				<div className = 'mt7'>
					<div className = 'br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
						<div className = 'pa4 black-80'>
							<div className = 'measure'>
								<div className = 'ba b--transparent ph0 mh0'>
									<div className = 'f1 fw6 ph0 mh0'>Sign In</div>
									<div className = 'mt3'>
										<label className = 'db fw6 lh-copy f6'>Email</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_EMAIL);
											} 
										} className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'email' />
									</div>
									<div className = 'mv3'>
										<label className = 'db fw6 lh-copy f6'>Password</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_PW);
											} 
										} className = 'b pa2 input-reset ba bg-transparent hover-white w-100' type = 'password' />
									</div>
								</div>

								<input onClick = { 
										() => {
											this.callSignIn();
										}
									} 
									className = 'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib' type = 'submit' value = 'Sign in' />

								<div className = 'lh-copy mt3'>
									<p onClick = { 
										() => {
											changeRoute(REGISTRATION);
										}
									}
									href = '' className = 'f6 link dim black db pointer'>Register</p>
									{ formError }
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);