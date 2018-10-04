import React, { Component } from 'react';
import { connect } from 'react-redux';

import Particles from 'react-particles-js';
import { particlesOptions } from '../particleConfig';

import SignInForm from '../components/SignIn/SignInForm';
import RegistrationForm from '../components/Registration/RegistrationForm';
import HomePage from '../components/Home/HomePage';

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
				page = <HomePage />;
				break;
			default : 
				page = '';
		}

		return (
			<div style = {{ height : '100%' }} >
				<Particles className = 'particles' params = { particlesOptions } />
				{ page } 
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
