import React from 'react';
import { connect } from 'react-redux';

import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import { getList, setTarget, setList } from '../../actions';
import { 
	SUCCESS,
	CLEAR_TARGET_PROFILE
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		listResponse : state.getList.resp,
		list : state.getList.list,
		listLoaded : state.getList.isLoaded
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
		getList : (id, pw) => dispatch(getList(id, pw)),
		setTarget : (first, last, id) => dispatch(setTarget(first, last, id)),
		setList : (list) => dispatch(setList(list)),
		clearProfile : () => dispatch({ type : CLEAR_TARGET_PROFILE })
	}
}

class UserList extends React.Component {


	componentDidUpdate() {

		/* Only load list once after list is fetched */
		if (!this.props.listLoaded) {
			/* Destructure props */
			const { listResponse, setList } = this.props;
			const { code } = listResponse;
			/* Pass the list to the state if list is fetched successfully */
			if (code === SUCCESS) {
				setList(listResponse.users);
			}
		}


	}

	refreshList() {
		/* Get list when component mounts */
		const { getList, id, pw } = this.props;
		getList(id, pw);
	}

	componentDidMount() {

		/* Get list when component mounts */
		const { getList, id, pw } = this.props;
		getList(id, pw);

		/* Refresh the user list every 10 seconds */
		this.interval = setInterval(() => this.refreshList(), 10000);

	}


	componentWillUnmount() {

		clearInterval(this.interval);
	}

	render() {

		/* Destructure props */
		const { list, setTarget, clearProfile } = this.props;

		/* Check if there is a user list */
		let userArray;
		if (list !== '') {
			userArray = list.map((user,i) => {
				return <UserCard key = {i} first = {list[i].first} last = {list[i].last} id = {list[i].id} setTarget = { setTarget } clearProfile = { clearProfile } />
			});
		}

		return (
			<div className = 'ma2 w-90 h-60'>
				<p className = 'f4 ph5 pv3 br3 tc'>Online Users</p>
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