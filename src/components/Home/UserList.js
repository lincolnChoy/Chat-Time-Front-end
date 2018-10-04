import React from 'react';
import Scroll from '../Scroll/Scroll';


class UserList extends React.Component {


	componentDidUpdate() {


	}

	componentDidMount() {


	}


	render() {

		return (
			<div className = 'ma2 w-20'>
				<p className = 'f4 ph5 pv3 bg-white br3 tc'>Online Users</p>
					<Scroll>
						<div className = 'tc'>
							<p>User 1</p>
							<p>User 2</p>
						</div>
					</Scroll>
			</div>
		)
	}
}

export default UserList;