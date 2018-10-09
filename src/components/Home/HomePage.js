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
				<div className = 'w-20 h-100'>
					<UserList />
				</div>
				<Messenger />
			</div>	
		</div>	
	)

}

export default HomePage;