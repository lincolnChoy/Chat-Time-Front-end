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

class GroupCard extends React.Component {

	render() {

		const { id, picture, setTarget, clearProfile, clearMessages } = this.props;
		return (
			<div>
				<div onClick = { () => {
					clearMessages();
					clearProfile();
					setTarget('Group ', id.toString() , id, picture, 1);
				}}
				className = 'br3 ma2 pointer userCard' style = {{ border : '1px solid transparent' }}>
					<p>{ 'Group ' } { id.toString() } </p>
				</div>
			</div>
		)
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);