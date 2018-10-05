import React from 'react';
import { connect } from 'react-redux'; 

import { getProfile, loadProfile, readAPI } from '../../actions';

import {
	API_READ,

	PROFILE_FETCHED,
	PROFILE_FAIL
} from '../../apiConstants';


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
		readAPI : (type) => dispatch(readAPI(type))
	}
}

class Messenger extends React.Component {

	callGetProfile() {

		/* Destructure props */
		const { messageTarget, getProfile } = this.props;

		/* Make sure that the target is loaded into state before requesting profile */
		if (messageTarget) {
			getProfile(messageTarget.id);
		}	
	}

	componentDidUpdate() {

		if (!this.props.resultWasRead) {

			/* Destructure props */
			const { profileResponse, loadProfile } = this.props;

			if (profileResponse.code === PROFILE_FETCHED) {
				loadProfile(profileResponse);
			}
			else if (profileResponse.code === PROFILE_FAIL) {
				console.log('PROFILE DOES NOT EXIST');
			}
			readAPI(API_READ);
		}

	}

	render() {

		const { messageTarget } = this.props;

		let messageBox;
		if (messageTarget) {
			messageBox = 
				<div className = 'w-100 pa3' style = {{ display : 'flex', justifyContent : 'space-around' }}>
					<div className = 'pa3'>{ messageTarget.first + '  ' +  messageTarget.last }</div>
					<div className = 'h-50 br3 pa3 pointer grow' style = {{ border : '1px solid blue' }}
						onClick = { () => {
							this.callGetProfile();
						}
					}>View Profile</div>
					<div className = 'message w-100'>
						<input className = 'b pa2 input-reset ba bg-transparent hover-white w-90' type = 'text' />
						<input className = 'ml2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Send' />
					</div>
				</div>
		}
		else {
			messageBox = <h1 className = 'mt7 tc white'>Click on a user to message them!</h1>;
		}

		return (
			<div className = 'w-80 wrapper'>
				{ messageBox }
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);