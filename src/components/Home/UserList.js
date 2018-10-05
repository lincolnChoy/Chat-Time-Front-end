import React from 'react';
import { connect } from 'react-redux';


import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import { getList, setTarget } from '../../actions';


const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		list : state.callAPI.resp.users
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
		getList : (id, pw) => dispatch(getList(id, pw)),
		setTarget : (first, last, id) => dispatch(setTarget(first, last, id))
	}
}

class UserList extends React.Component {


	componentDidMount() {

		const { getList, id, pw } = this.props;
		getList(id, pw);
	}

	render() {

		const { list, setTarget } = this.props;
		let userArray;
		if (list !== undefined) {
			userArray = list.map((user,i) => {
				return <UserCard key = {i} first = {list[i].first} last = {list[i].last} id = {list[i].id} setTarget = { setTarget } />
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