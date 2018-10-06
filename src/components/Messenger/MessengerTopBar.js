import React from 'react';
import { connect } from 'react-redux';

import { getProfile, loadProfile } from '../../actions';

import {
	SUCCESS,
	API_READ
} from '../../constants';

const mapStateToProps = (state) => {

	return {

		messageTarget : state.setTarget.target,

		profileResponse : state.callAPI.resp,
		isPending : state.callAPI.isPending,
		resultWasRead : state.callAPI.resultRead
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getProfile : (id) => dispatch(getProfile(id)),
		loadProfile : (profile) => dispatch(loadProfile(profile)),
		readAPI : (type) => dispatch({ type : type })
	}
}


class MessengerTopBar extends React.Component {

	callGetProfile() {

		/* Destructure props */
		const { messageTarget, getProfile } = this.props;

		/* Make sure that the target is loaded into state before requesting profile */
		if (messageTarget) {
			getProfile(messageTarget.id);
		}	
	}

	componentDidUpdate() {

		/* Only update if there is an unread API result */
		if (!this.props.resultWasRead) {

			/* Destructure props */
			const { profileResponse, loadProfile, readAPI } = this.props;
			const { code } = profileResponse;

			if (code === SUCCESS) {
				loadProfile(profileResponse);
			}
			readAPI(API_READ);
		}

	}


	render() {

		const { messageTarget } = this.props;

		return (
			
			<div className = 'w-100 h-100' style = {{ display : 'flex', justifyContent : 'space-around' }} >
				<div className = 'pa3'>{ messageTarget.first + '  ' +  messageTarget.last }</div>
				<div className = 'h-50 br3 pa3 pointer grow' style = {{ border : '1px solid blue' }}
					onClick = { () => {
						this.callGetProfile();
					}
				}>View Profile</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerTopBar);