import React from 'react';
import { connect } from 'react-redux';

import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import { getList, setTarget, setList } from '../../actions';
import { 
	SUCCESS,
	CLEAR_TARGET_PROFILE,
	CLEAR_MSG
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
		setTarget : (first, last, id, picture) => dispatch(setTarget(first, last, id, picture)),
		setList : (list) => dispatch(setList(list)),
		clearProfile : () => dispatch({ type : CLEAR_TARGET_PROFILE }),
		clearMessages : () => dispatch({ type : CLEAR_MSG })
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
		const { list, setTarget, clearProfile, clearMessages } = this.props;

		/* Check if there is a user list */
		let userArray;
		if (list !== '') {
			userArray = list.map((user,i) => {
				return <UserCard key = {i} 
								first = {list[i].first} 
								last = {list[i].last} 
								id = {list[i].id} 
								picture = { list[i].picture } 
								setTarget = { setTarget } 
								clearProfile = { clearProfile }
								clearMessages = { clearMessages } />
			});
		}

		return (
			<div className = 'ml1 w-100 h-60'>
				<p className = 'w-100 f4 ph5 pv3 br3 tc'>Online Users</p>
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