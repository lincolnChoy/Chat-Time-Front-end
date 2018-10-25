import React from 'react';
import { connect } from 'react-redux';
import LoadAnim from '../LoadAnim/LoadAnim';
import './form.css';

import { editField, changeRoute, signIn, setFormState, loadUser, readAPI } from '../../actions';

import { 

	REGISTRATION,
	HOME,

	EDIT_EMAIL,
	EDIT_PW,

	SUCCESS,
	NOT_COMPLETE,
	WRONG_CRED,
	USER_NOT_EXIST,

	API_READ,

	RESET
} from '../../constants';


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
		readAPI :  (type) => dispatch(readAPI(type))
	}
}

class SignInForm extends React.Component {


	/* Check for state updates, mainly for listening for login API result */
	componentDidUpdate() {

		if (!this.props.resultWasRead) {

			/* Destructure props */
			const { signInResponse, setFormState, changeRoute, loadUser, readAPI } = this.props;
			const { code } = signInResponse;

			if (code === SUCCESS) {
				/* Save the user in state, then route change */
				/* Signed in */
				setFormState(RESET);
				const user = {
					first : signInResponse.first,
					last : signInResponse.last,
					id : signInResponse.id,
					picture : signInResponse.picture,
					pw : this.props.pw
				}
				loadUser(user);
				changeRoute(HOME);
			}
			else if (code === WRONG_CRED || code === USER_NOT_EXIST) {
				setFormState(WRONG_CRED);
			}
			else {
				setFormState(RESET);
			}
			readAPI(API_READ);
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
			formError = <p className = 'formError pa2'>INCORRECT EMAIL OR PASSWORD</p>;
		}
		else if (formState === NOT_COMPLETE) {
			formError = <p className = 'formError pa2'>PLEASE FILL IN BOTH FIELDS</p>;
		}

		return (
			<div className = 'formPage'>
				{ loading }
				<div className = 'mt6'>
					<h1 className = 'f1 white'>Chime</h1>
					<div className = 'br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center form'>
						<div className = 'pa4 black-80'>
							<div className = 'measure'>
								<div className = 'ba b--transparent ph0 mh0'>
									<div className = 'f2 fw6 ph0 mh0'>Sign In</div>
									<div className = 'mt3'>
										<label className = 'formLabel lh-copy'>Email</label>
										<input onChange = { 
											(event) => {
												editField(event.target.value, EDIT_EMAIL);
											} 
										} className = 'pa2 formInput' type = 'email' />
									</div>
									<div className = 'mv3'>
										<label className = 'formLabel lh-copy'>Password</label>
										<input 
										onChange = { 
											(event) => {
												editField(event.target.value, EDIT_PW);
											}

										}
										onKeyPress = {
											(event) => {
												if (event.key === 'Enter') {
													this.callSignIn();
												}
											}
										}
										 className = 'pa2 formInput' type = 'password' />
										
									</div>
								</div>

								<input onClick = { 
										() => {
											this.callSignIn();
										}
									} 
									className = 'ph4 pv3 mt2 formButton' type = 'submit' value = 'Sign in' />

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