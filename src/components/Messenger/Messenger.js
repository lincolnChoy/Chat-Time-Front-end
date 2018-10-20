import React from 'react';
import { connect } from 'react-redux'; 


import MessageSection from './MessageSection';
import MessengerTopBar from './MessengerTopBar';
import attach from './attach.png';

import { sendMessage, editField } from '../../actions';

import {
	EMPTY_MSG,
	CLEAR_MSG,
	EDIT_MSG
	// SET_FILE,
	// CLEAR_FILE

} from '../../constants';

const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		messageTarget : state.loadTarget.target,
		message : state.editMessenger.message,

	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		confirmSent : () => dispatch({ type : CLEAR_MSG }),
		editField : (text,type) => dispatch(editField(text,type)),
		sendMessage : (sender, destination, pw, message, isFile, isGroup) => dispatch(sendMessage(sender, destination, pw, message, isFile, isGroup)),
		clearMessage : () => dispatch({ type : EMPTY_MSG })
	}
}

class Messenger extends React.Component {

	constructor(props) {
		super(props);
		this.uploadFile = this.uploadFile.bind(this);
	}


	callSendMessage() {

		const { sendMessage, id, messageTarget, pw, message, isFile, clearMessage } = this.props;
		sendMessage(id, messageTarget.id, pw, message, isFile, messageTarget.isGroup);
		clearMessage();

	}


	uploadFile(event) {

		/* Grab the file and read as a base64 string */
		let file = event.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);

		
		const { sendMessage, id, messageTarget, pw } = this.props;

		/* When b64 string is ready, send it to the back-end */
		reader.onload = function () {

			var fileData = reader.result.toString();
			sendMessage(id, messageTarget.id, pw, fileData, 1, messageTarget.isGroup);
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
					<div className = 'message w-100' style = {{ display : 'flex', justifyContent : 'center'}}>
						<input onChange = { (event) => {
									editField(event.target.value, EDIT_MSG);
								}
							}
							value = { this.props.message }
							onKeyPress = { (event) => { if (event.key === 'Enter') { this.callSendMessage(); }}}
							
							className = 'b pa2 input-reset ba bg-transparent w-80' type = 'text' />

						<div className = 'image-upload grow'>
							<label htmlFor = 'file-input'>
								<img className = 'pointer grow' src = { attach } alt = 'paperclip' width = '40px'/>
							</label>
							<input id = 'file-input' type = 'file'
								onChange = { this.uploadFile }/>
						</div>
						<input
							onClick = {
								() => {
									this.callSendMessage();
								}
							}
							className = 'ml2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib br3' type = 'submit' value = 'Send' />
					</div>
				</div>
		}
		else {
			messageBox = <h1 className = 'mt7 tc black'>Click on a user to message them!</h1>;
		}

		return (
			<div className = 'w-80 wrapper' style = {{ height : '850px'}}>
				{ messageBox }
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);