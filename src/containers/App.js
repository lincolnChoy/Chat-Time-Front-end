import React, { Component } from 'react';
import { connect } from 'react-redux';

import Particles from 'react-particles-js';
import { particlesOptions } from '../particleConfig';

import SignInForm from '../components/SignIn/SignInForm';
import RegistrationForm from '../components/Registration/RegistrationForm';
import HomePage from '../components/Home/HomePage';
import OwnProfile from '../components/Profile/OwnProfile';
import TargetProfile from '../components/Profile/TargetProfile';

import { 
	REGISTRATION,
	SIGN_IN,
	HOME,
	PROFILE,
	TARGET_PROFILE
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
				page = <HomePage />;
				break;
			case PROFILE : 
				page = <OwnProfile />;
				break;
			case TARGET_PROFILE : 
				page = <TargetProfile />
				break;
			default : 
				page = '';
		}

		return (
			<div>
				<Particles className = 'particles' params = { particlesOptions } />
				{ page } 
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
