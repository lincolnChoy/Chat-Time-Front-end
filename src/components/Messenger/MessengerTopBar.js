import React from 'react';
import { connect } from 'react-redux';

import { getTargetProfile, changeRoute } from '../../actions';

import {
	TARGET_PROFILE_READ,
	TARGET_PROFILE
} from '../../constants';

const mapStateToProps = (state) => {

	return {

		messageTarget : state.loadTarget.target,
		profile : state.loadTarget.profile,
		profileLoaded : state.loadTarget.isLoaded
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getTargetProfile : (id) => dispatch(getTargetProfile(id)),
		loadProfile : () => dispatch({ type : TARGET_PROFILE_READ }),
		changeRoute : (route) => dispatch(changeRoute(route))
	}
}


class MessengerTopBar extends React.Component {

	callGetProfile() {

		/* Destructure props */
		const { messageTarget, getTargetProfile } = this.props;

		/* Make sure that the target is loaded into state before requesting profile */
		if (messageTarget) {
			getTargetProfile(messageTarget.id);
		}	
	}

	componentDidUpdate() {

		/* Only load profile once after fetching */
		if (!this.props.profileLoaded) {
			this.props.loadProfile();
		}

	}


	render() {

		const { messageTarget, changeRoute } = this.props;

		return (
			
			<div className = 'w-100 h-100 pointer' style = {{ backgroundColor : 'rgba(255,255,255,0.2)', display : 'flex', justifyContent : 'space-around' }} 
				onClick = { () => {
							this.callGetProfile();
							changeRoute(TARGET_PROFILE);
						}}
			>
			<div className = 'pa3' >{ messageTarget.first + '  ' +  messageTarget.last }</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerTopBar);