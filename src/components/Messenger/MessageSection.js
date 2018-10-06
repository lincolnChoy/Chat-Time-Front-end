import React from 'react';
import { connect } from 'react-redux';

import MessageCard from './MessageCard';

import { getMessages, readAPI } from '../../actions';

import {
	SUCCESS,
	MSG_READ,
	CLEAR_MSG
} from '../../constants';

const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		target : state.setTarget.target,
		messages : state.fetchMessages.resp.messages,
		fetchResp : state.fetchMessages.resp,
		resultWasRead : state.fetchMessages.resultRead,
		messageSent : state.sendMessage.messageSent
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getMessages : (sender, destination, pw) => dispatch(getMessages(sender, destination, pw)),
		readAPI : (type) => dispatch(readAPI(type)),
	}
}

class MessageSection extends React.Component {

	refreshMessages() {
		const { id, pw, target, getMessages } = this.props;
		getMessages(id, target.id, pw);
	}

	componentDidMount() {
		this.refreshMessages();
		this.interval = setInterval(() => this.refreshMessages(), 1000);
	}


	componentDidUpdate() {

		const { readAPI } = this.props;

		/* If message was sent by client, refresh messages and clear the flag */
		if (this.props.messageSent) {
			this.refreshMessages();
			this.scrollToBottom();
			readAPI(CLEAR_MSG)
		}
		/* If a message fetch was called, check the results */
		if (!this.props.resultWasRead) {

			const { fetchResp } = this.props;
			const { code } = fetchResp;
			/* If message fetch was successful, load the messages */
			if (code === SUCCESS) {
				//update messages
				this.scrollToBottom();
			}
			/* Clear the flag so we know messages have been loaded */
			readAPI(MSG_READ);
		}
	}

	scrollToBottom() {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	render() {

		const { messages, id } = this.props;

		/* Check if there are messages */
		let conversation;
		if (messages !== '' && messages!== undefined) {
			conversation = messages.map((message,i) => {
				let isSending = (message.sender === id)
				return <MessageCard key = {i} isSending = { isSending } message = { message.message } />
			});
		}
		return (

			<div style = {{ overflowY : 'scroll', height : '700px'}}>
				{ conversation }
				<div style={{ float:"left", clear: "both" }}
             		ref={(el) => { this.messagesEnd = el; }}>
        		</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSection);