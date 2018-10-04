import React from 'react';
import UserList from './UserList';
import Messenger from '../Messenger/Messenger';

const HomePage = () => {

	return (

		<div className = 'home'>
			<UserList />
			<Messenger />
		</div>
	)
}

export default HomePage;