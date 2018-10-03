import React from 'react';

import { connect } from 'react-redux';

import { editField, changeRoute, signIn } from '../../actions';

import { 
	REGISTRATION,
	EDIT_EMAIL,
	EDIT_PW 
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		email : state.signInForm.email,
		pw : state.signInForm.pw,
		route : state.changeRoute.route,
		isPending : state.callAPI.isPending,
		resp : state.callAPI.resp
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		editField : (text,type) => dispatch(editField(text,type)),
		changeRoute : (route) => dispatch(changeRoute(route)),
		signIn : (email, pw) => dispatch(signIn(this.props.email, this.props.pw))
	}
}

class SignInForm extends React.Component {


	render() {

		const { editField, changeRoute } = this.props;

		return (
			<article className = 'br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center'>
				<main className = 'pa4 black-80'>
					<div className = 'measure'>
						<fieldset className = 'ba b--transparent ph0 mh0'>
							<legend className = 'f1 fw6 ph0 mh0'>Sign In</legend>
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
						</fieldset>

						<input onClick = { 
								() => {
									signIn();
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
						</div>
					</div>
				</main>
			</article>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);