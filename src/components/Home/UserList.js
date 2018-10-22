import React from 'react';
import { connect } from 'react-redux';

import plus from './plus.png';
import close from './close.png';
import tick from './tick.png';

import Scroll from '../Scroll/Scroll';
import UserCard from './UserCard';
import GroupCard from './GroupCard';

import { getList, setTarget, setList, setGroupList, addUser, callCreateGroup } from '../../actions';
import { 
	SUCCESS,
	CLEAR_TARGET_PROFILE,
	CLEAR_MSG,
	CREATE_GROUP,
	CANCEL_CREATE
} from '../../constants';


const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		listResponse : state.getList.resp,
		list : state.getList.list,
		groupList : state.getList.groupList,
		listLoaded : state.getList.isLoaded,
		shouldCreate : state.createGroup.createGroup,
		group : state.createGroup.group
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
		getList : (id, pw) => dispatch(getList(id, pw)),
		setTarget : (first, last, id, picture, isGroup) => dispatch(setTarget(first, last, id, picture, isGroup)),
		setList : (list) => dispatch(setList(list)),
		setGroupList : (list) => dispatch(setGroupList(list)),
		clearProfile : () => dispatch({ type : CLEAR_TARGET_PROFILE }),
		clearMessages : () => dispatch({ type : CLEAR_MSG }),
		createGroup : () => dispatch({ type : CREATE_GROUP }),
		cancelCreate : () => dispatch({ type : CANCEL_CREATE }),
		addUser : (user) => dispatch(addUser(user)),
		submitGroup : (id, pw, group) => dispatch(callCreateGroup(id, pw, group)),
	}
}

class UserList extends React.Component {


	componentDidUpdate() {

		/* Only load list once after list is fetched */
		if (!this.props.listLoaded) {
			/* Destructure props */
			const { listResponse, setList, setGroupList } = this.props;
			const { code } = listResponse;
			/* Pass the list to the state if list is fetched successfully */
			if (code === SUCCESS) {
				setList(listResponse.users);
				setGroupList(listResponse.groups);
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
		const { id, pw, list, groupList, setTarget, clearProfile, clearMessages, createGroup, cancelCreate, shouldCreate, addUser, submitGroup, group } = this.props;

		/* Check if there is a user list */
		let userArray;
		let groupArray;
		if (list !== '') {
			userArray = list.map((user,i) => {
				return <UserCard key = {i}
								user = { list[i] }
								setTarget = { setTarget } 
								clearProfile = { clearProfile }
								clearMessages = { clearMessages }
								shouldCreate = { shouldCreate }
								addUser = { addUser }
								 />
			});
		}
		if (groupList !== '') {
			groupArray = groupList.map((user,i) => {
				return <GroupCard key = {i} 
								id = {groupList[i].id} 
								picture = { '' } 
								setTarget = { setTarget } 
								clearProfile = { clearProfile }
								clearMessages = { clearMessages }
								 />
			});
		}

		/* Determine what goes in the user list div */
		let content;
		if (shouldCreate) {
			content = 
				<div>
					<p className = 'w-100 f4 ph5 pv3 br3 tc'>Create a group chat</p>
						<Scroll>
							<div className = 'tc'>
								{ userArray }
							</div>
						</Scroll>
						<div style = {{ display : 'flex', justifyContent : 'space-between' }}>
							<img src = { close } alt = 'x' 
								className = 'ml3 pointer grow'
								onClick = { 
									() => {
										cancelCreate();
									}
								} 
							/>
							<img src = { tick } alt = 'tick' 
								className = 'ml3 pointer grow'
								onClick = { 
									() => {
										submitGroup(id, pw, group);
									}
								} 
							/>
						</div>
				</div>
		}
		else {
			content =
				<div>
					<p className = 'w-100 f4 ph5 pv3 br3 tc'>Online Users</p>
						<Scroll>
							<div className = 'tc'>
								{ userArray }
								{ groupArray }
							</div>
						</Scroll>
					<img src = { plus } alt = 'plus' 
						className = 'ml3 pointer grow'
						onClick = { 
							() => {
								createGroup();
							}
						} 
					/>
				</div>
		}
		return (
			
			<div className = 'ml1 w-100 h-60'>
				{ content }
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);