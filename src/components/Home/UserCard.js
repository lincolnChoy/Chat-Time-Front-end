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

		const { first, last, id, picture, setTarget, clearProfile, clearMessages, shouldCreate, addUser, group } = this.props;
		return (
			<div>
				<div onClick = { () => {
					if (!shouldCreate) {
						clearMessages();
						clearProfile();
						setTarget(first, last, id, picture);
					}
					else {
						let tempGroup = group;
						if (!tempGroup.includes(id)) {
							tempGroup.push(id);
							addUser(tempGroup);
						}
					}
				}}
				className = 'br3 ma2 pointer userCard' style = {{ border : '1px solid transparent' }}>
					<p>{ first } { last } </p>
				</div>
			</div>
		)
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);