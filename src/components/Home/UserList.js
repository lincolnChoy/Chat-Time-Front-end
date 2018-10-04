import React from 'react';
import './list.css';
import Scroll from '../Scroll/Scroll';


class UserList extends React.Component {


	componentDidUpdate() {


	}

	componentDidMount() {


	}


	render() {

		return (
			<div className = 'list'>
				<div className = 'listElements'>
					<p className = 'f4 ph5 pv3 bg-white br3'>Online Users</p>
					<Scroll >
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>						
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
						<p> User 1</p>
						<p> User 2</p>
						<p> User 3</p>
						<p> User 4</p>
					</Scroll>
				</div>
			</div>
		)
	}
}

export default UserList;