import React from 'react';
import { connect } from 'react-redux';

import { loadGroup } from '../../actions';

const mapStateToProps = (state) => {

	return {
		group : state.createGroup.group
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		setGroup : (members) => dispatch(loadGroup(members))
	}
}

class GroupCard extends React.Component {

	render() {

		const { id, picture, members, setTarget, clearProfile, clearMessages, setGroup } = this.props;
		return (
			<div>
				<div onClick = { () => {
					clearMessages();
					clearProfile();
					setTarget('Group ', id.toString() , id, picture, 1);
					setGroup(members);
				}}
				className = 'br3 ma2 pointer userCard' style = {{ border : '1px solid transparent' }}>
					<p>{ 'Group ' } { id.toString() } </p>
				</div>
			</div>
		)
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);