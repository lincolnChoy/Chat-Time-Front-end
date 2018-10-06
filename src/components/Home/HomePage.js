import React from 'react';
import { connect } from 'react-redux';

import UserList from './UserList';
import Messenger from '../Messenger/Messenger';
import NavBar from '../NavBar/NavBar';
import ProfileSection from '../Profile/ProfileSection';
import './home.css';

const mapStateToProps = (state) => {

	return {
		profile : state.loadUser.profile,
		target : state.setTarget.target
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {}
}

class HomePage extends React.Component {

	render() {

		/* Destructure props */
		const { profile, target } = this.props;

		let section;
		/* Read the target's profile */
		if (profile !== '') {
			section = <ProfileSection 
				birthday = { profile.birthday } 
				location = { profile.location } 
				blurb = { profile.blurb }
				occupation = { profile.occupation }
				name = { target.first + ' ' + target.last }
			 />;
		}
		return (
			<div>
				<NavBar />
				<div className = 'home'>
					<div className = 'w-20 h-100'>
						<UserList />
						{ section }
					</div>
					<Messenger />
				</div>
				
			</div>
		)	
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);