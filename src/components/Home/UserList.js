import React from 'react';
import { connect } from 'react-redux';


import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import { getList, setTarget, setList } from '../../actions';

import {
	API_SUCCESS
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

		const { listResponse, setList } = this.props;

		if (listResponse.code === API_SUCCESS) {
			setList(listResponse.users);
		}
		else {
			console.log('COULD NOT FETCH LIST');
		}

	}
	componentDidMount() {

		const { getList, id, pw } = this.props;
		getList(id, pw);
	}

	render() {

		const { list, setTarget } = this.props;
		let userArray;
		if (list !== 'empty') {
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