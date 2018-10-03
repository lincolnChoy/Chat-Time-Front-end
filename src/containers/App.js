import React, { Component } from 'react';
import { connect } from 'react-redux';

import Particles from 'react-particles-js';
import { particlesOptions } from '../particleConfig';

import SignInForm from '../components/SignIn/SignInForm';

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
				page = '';
				break;
			case REGISTRATION : 
				page = '';
				break;
			case HOME : 
				page = '';
				break;
			default : 
				page = '';
		}

		return (
			<div className = 'App'>
				<Particles className = 'particles' params = { particlesOptions } />
				<SignInForm />
				{ page } 
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
