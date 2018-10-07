import React from 'react';
import { connect } from 'react-redux'; 

import MessageSection from './MessageSection';
import MessengerTopBar from './MessengerTopBar';

import { readAPI, sendMessage, editField } from '../../actions';
import {
	SUCCESS,
	API_READ,
	EDIT_MSG
} from '../../constants';

const mapStateToProps = (state) => {

	return {

		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		messageTarget : state.loadTarget.target,
		message : state.editMessenger.message,

		msgResp : state.sendMessage.resp,
		isPending : state.sendMessage.isPending,
		resultWasRead : state.sendMessage.resultRead
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		readAPI : (type) => dispatch(readAPI(type)),
		editField : (type,text) => dispatch(editField(type,text)),
		sendMessage : (sender, destination, pw, message) => dispatch(sendMessage(sender, destination, pw, message))
	}
}

class Messenger extends React.Component {

	callSendMessage() {

		const { sendMessage, id, messageTarget, pw, message } = this.props;
		sendMessage(id, messageTarget.id, pw, message);

	}

	componentDidUpdate() {

		/* Only update if there is an unread API result */
		if (!this.props.resultWasRead) {

			/* Destructure props */
			const { msgResp, readAPI } = this.props;
			const { code } = msgResp;

			if (code === SUCCESS) {
				console.log('code is success');
			}
			readAPI(API_READ);
		}

	}

	render() {

		/* Determine who the user clicked on */
		const { messageTarget, editField } = this.props;

		/* Show the user the relevant chat */
		let messageBox;
		if (messageTarget) {
			messageBox = 
				<div className = 'w-100'>
					<MessengerTopBar />
					<div className = 'mt3 w-100'>
						<MessageSection />
					</div>
					<div className = 'message w-100'>
						<input onChange = { (event) => {
									editField(event.target.value, EDIT_MSG);
								}
							}
							onKeyPress = { (event) => { if (event.key === 'Enter') { this.callSendMessage(); }}}
							className = 'b pa2 input-reset ba bg-transparent hover-white w-90' type = 'text' />
						<input
							onClick = {
								() => {
									this.callSendMessage();
								}
							}
							className = 'ml2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Send' />
					</div>
				</div>
		}
		else {
			messageBox = <h1 className = 'mt7 tc white'>Click on a user to message them!</h1>;
		}

		return (
			<div className = 'w-80 wrapper' style = {{ height : '850px'}}>
				{ messageBox }
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);