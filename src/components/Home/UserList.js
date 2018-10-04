import React from 'react';
import { connect } from 'react-redux';


import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import { getList } from '../../actions';


const mapStateToProps = (state) => {

	return {
		email : state.loadUser.user.email,
		pw : state.loadUser.user.pw,
		list : state.callAPI.resp.users
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
		getList : (email, pw) => dispatch(getList(email, pw))
	}
}

class UserList extends React.Component {


	componentDidMount() {

		const { getList, email, pw } = this.props;
		getList(email, pw);
	}

	render() {

		const { list } = this.props;
		let userArray;
		if (list !== undefined) {
			userArray = list.map((user,i) => {
				return <UserCard key = {i} first = {list[i].first} last = {list[i].last} email = {list[i].email} />
			});
		}

		return (
			<div className = 'ma2 w-20'>
				<p className = 'f4 ph5 pv3 bg-white br3 tc'>Online Users</p>
					<Scroll>
						<div className = 'tc'>
							{ userArray }
						</div>
					</Scroll>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);