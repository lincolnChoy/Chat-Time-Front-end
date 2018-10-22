import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {

	return {
		group : state.createGroup.group
	}
}

const mapDispatchToProps = (dispatch) => {

	return {}
}

class UserCard extends React.Component {

	render() {

		const { user , setTarget, clearProfile, clearMessages, shouldCreate, addUser, group } = this.props;
		const { first, last, id, picture } = user;
		return (
			<div>
				<div onClick = { () => {
					if (!shouldCreate) {
						clearMessages();
						clearProfile();
						setTarget(first, last, id, picture, 0);
					}
					else {
						let tempGroup = group;
						if (!tempGroup.includes(id)) {
							tempGroup.push(id);
							addUser(tempGroup);
						}
					}
				}}
				className = 'br3 ma2 pointer userCard' 
				style = {{ border : '1px solid transparent', display : 'flex', justifyContent : 'space-around', alignItems : 'center' }}>
					<div className = 'listHead'>
						<img src = { picture } height = '40px' alt = '' />
					</div>
					<span>{ first } { last } </span>
				</div>
			</div>
		)
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);