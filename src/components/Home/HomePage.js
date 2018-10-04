import React from 'react';
import UserList from './UserList';
import Messenger from '../Messenger/Messenger';

const HomePage = () => {

	return (

		<div className = 'home'>
			<Messenger />
			<UserList />
		</div>
	)
}

export default HomePage;