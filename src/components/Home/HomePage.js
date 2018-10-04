import React from 'react';
import UserList from './UserList';
import Messenger from '../Messenger/Messenger';
import './home.css';

const HomePage = () => {

	return (

		<div className = 'home'>
			<UserList />
			<Messenger />
		</div>
	)
}

export default HomePage;