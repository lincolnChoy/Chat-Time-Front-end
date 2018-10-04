import React, { Component } from 'react';
import { connect } from 'react-redux';

import Particles from 'react-particles-js';
import { particlesOptions } from '../particleConfig';

import SignInForm from '../components/SignIn/SignInForm';
import RegistrationForm from '../components/Registration/RegistrationForm';

import { 
	REGISTRATION,
	SIGN_IN,
	HOME
} from '../constants';


import './App.css';


const mapStateToProps = (state) => {

	return {
		route : state.changeRoute.route,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

class App extends Component {

	render() {
		const { route } = this.props;

		let page;
		switch(route) {
			case SIGN_IN : 
				page = <SignInForm />;
				break;
			case REGISTRATION : 
				page = <RegistrationForm />;
				break;
			case HOME : 
				page = <img src = 'https://pics.me.me/thumb_hacker-voice-im-in-thalmor-embassy-if-paaari-rnax-hackerman-22788331.png' />;
				break;
			default : 
				page = '';
		}

		return (
			<div className = 'App'>
				<Particles className = 'particles' params = { particlesOptions } />
				{ page } 
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
