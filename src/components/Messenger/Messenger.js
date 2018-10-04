import React from 'react';
import UserList from '../Home/UserList';

class Messenger extends React.Component {

	render() {
		return (
			<div className = 'bg-white w-80'>
				<div>Chat box</div>
				<input type = 'text' />
			</div>
		)
	}
	
}

export default Messenger;