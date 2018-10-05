import React from 'react';
import UserList from './UserList';
import Messenger from '../Messenger/Messenger';
import NavBar from '../NavBar/NavBar';
import ProfileSection from '../Profile/ProfileSection';

import './home.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {

	return {
		profile : state.loadUser.profile
	}
} 

const mapDispatchToProps = (dispatch) => {

	return {


	}
}

class HomePage extends React.Component {

	render() {

		const { profile } = this.props;

		let section;
		if (profile !== '') {
			section = <ProfileSection 
				birthday = { profile.birthday } 
				location = { profile.location } 
				blurb = { profile.blurb }
				occupation = { profile.occupation }

			 />;
		}
		return (
			<div>
				<NavBar />
				<div className = 'home'>
					<UserList />
					<Messenger />
				</div>
				{ section }
			</div>
		)	
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);