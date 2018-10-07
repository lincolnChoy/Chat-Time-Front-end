import React from 'react';
import { connect } from 'react-redux';

import { getTargetProfile } from '../../actions';

import {
	TARGET_PROFILE_READ
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

		const { messageTarget } = this.props;

		return (
			
			<div className = 'w-100 h-100' style = {{ display : 'flex', justifyContent : 'space-around' }} >
				<div className = 'pa3'>{ messageTarget.first + '  ' +  messageTarget.last }</div>
				<div className = 'h-50 br3 pa3 pointer grow' style = {{ border : '1px solid black' }}
					onClick = { () => {
						this.callGetProfile();
					}
				}>View Profile</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerTopBar);