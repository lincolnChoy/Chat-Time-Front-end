import React from 'react';
import { connect } from 'react-redux';


import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import { getList, setTarget, setList } from '../../actions';

import {
	API_SUCCESS,
	API_FAIL,

	LIST_FAIL
} from '../../apiConstants';


const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		listResponse : state.getList.resp,
		list : state.getList.list
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
		getList : (id, pw) => dispatch(getList(id, pw)),
		setTarget : (first, last, id) => dispatch(setTarget(first, last, id)),
		setList : (list) => dispatch(setList(list))
	}
}

class UserList extends React.Component {


	componentDidUpdate() {

		/* Destructure props */
		const { listResponse, setList } = this.props;

		/* Pass the list to the state if list is fetched successfully */
		if (listResponse.code === API_SUCCESS) {
			setList(listResponse.users);
		}
		/* If list fetch failed, show to the user */
		else if (listResponse.code === API_FAIL) {
			setList(LIST_FAIL);
		}
	}


	componentDidMount() {

		/* Get list when component mounts */
		const { getList, id, pw } = this.props;
		getList(id, pw);
	}

	render() {

		/* Destructure props */
		const { list, setTarget } = this.props;

		/* Check if there is a user list */
		let userArray;
		if (list !== 'empty') {
			userArray = list.map((user,i) => {
				return <UserCard key = {i} first = {list[i].first} last = {list[i].last} id = {list[i].id} setTarget = { setTarget } />
			});
		}
		else if (list === LIST_FAIL) {
			userArray = 'Could not fetch list';
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