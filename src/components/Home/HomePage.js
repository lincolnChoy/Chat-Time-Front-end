import React from 'react';
import UserList from './UserList';
import Messenger from '../Messenger/Messenger';
import NavBar from '../NavBar/NavBar';
import './home.css';

const HomePage = () => {

	return (

		<div>
			<NavBar />
			<div className = 'home'>
				<UserList />
				<Messenger />
			</div>
		</div>
	)
}

export default HomePage;