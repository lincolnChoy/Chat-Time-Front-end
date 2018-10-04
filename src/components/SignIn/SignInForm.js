import React from 'react';
import { connect } from 'react-redux';
import LoadAnim from '../LoadAnim/LoadAnim';

import { editField, changeRoute, signIn, setFormState, loadUser, setAPIRead } from '../../actions';

import { 

	REGISTRATION,
	HOME,

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
		formState : state.setFormState.formState,
		resultWasRead : state.callAPI.resultRead
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editField : (text,type) => dispatch(editField(text,type)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		signIn : (email, pw) => dispatch(signIn(email, pw)),
		setFormState : (state) => dispatch(setFormState(state)),
		loadUser : (user) => dispatch(loadUser(user)),
		setAPIRead :  () => dispatch(setAPIRead())
	}
}

class SignInForm extends React.Component {


	/* Check for state updates, mainly for listening for login API result */
	componentDidUpdate() {

		if (!this.props.resultWasRead) {

			/* Destructure props */
			const { signInResponse, setFormState, changeRoute, loadUser, setAPIRead } = this.props;

			if (signInResponse.code === SIGN_IN_SUCCESS) {
				/* Save the user in state, then route change */
				/* Signed in */
				setFormState(RESET);
				const user = {
					first : signInResponse.first,
					last : signInResponse.last,
					email : signInResponse.email,
					pw : this.props.pw
				}
				loadUser(user);
				changeRoute(HOME);
			}
			else if (signInResponse.code === WRONG_CRED) {
				setFormState(WRONG_CRED);
			}
			/* Tentatively deprecated verification functionality
			else if (signInResponse.code === NOT_VERIFIED) {
				setFormState(RESET);
				loadUser(signInResponse);
				changeRoute(VERIFY);
			}*/
			else {
				setFormState(RESET);
			}
			setAPIRead();
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
		else if (formState === WRONG_CRED) {
			formError = <p className = 'f4 pa1 bg-light-red br3 white'>Incorrect email or password.</p>;
		}
		else if (formState === NOT_COMPLETE) {
			formError = <p className = 'f4 pa1 bg-light-red br3 white'>Please fill in both fields.</p>;
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
									<div className = 'f2 fw6 ph0 mh0'>Sign In</div>
									<div className = 'mt3'>
										<label className = 'db fw6 lh-copy f4'>Email</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_EMAIL);
											} 
										} className = 'pa2 input-reset ba bg-transparent hover-white w-100' type = 'email' />
									</div>
									<div className = 'mv3'>
										<label className = 'db fw6 lh-copy f4'>Password</label>
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
									className = 'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Sign in' />

								<div className = 'lh-copy mt3'>
									<p onClick = { 
										() => {
											setFormState(RESET);
											changeRoute(REGISTRATION);
										}
									}
									href = '' className = 'f5 link dim black db pointer'>Register</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);