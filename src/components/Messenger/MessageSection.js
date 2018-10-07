import React from 'react';
import { connect } from 'react-redux';

import MessageCard from './MessageCard';

import { getMessages } from '../../actions';

import {
	SUCCESS,
	MSG_LOAD,
	CLEAR_MSG
} from '../../constants';

const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		target : state.loadTarget.target,
		messages : state.fetchMessages.resp.messages,
		fetchResp : state.fetchMessages.resp,
		messagesLoaded : state.fetchMessages.messagesLoaded,
		messageSent : state.sendMessage.messageSent
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getMessages : (sender, destination, pw) => dispatch(getMessages(sender, destination, pw)),
		clearReceivedFlag : () => dispatch({ type : MSG_LOAD }),
		clearSentFlag : () => dispatch({ type : CLEAR_MSG })
	}
}

class MessageSection extends React.Component {

	refreshMessages() {
		const { id, pw, target, getMessages } = this.props;
		getMessages(id, target.id, pw);
	}

	componentDidMount() {
		this.refreshMessages();
		//this.interval = setInterval(() => this.refreshMessages(), 1000);
	}


	componentDidUpdate() {

		/* If message was sent by client, refresh messages and clear the flag */
		if (this.props.messageSent) {
			const { clearSentFlag } = this.props;
			clearSentFlag();
			this.refreshMessages();
			this.scrollToBottom();
		}

		/* If a message fetch was called, check the results */
		if (!this.props.messagesLoaded) {

			const { fetchResp, clearReceivedFlag } = this.props;
			const { code } = fetchResp;
			/* If message fetch was successful, load the messages */
			if (code === SUCCESS) {
				this.scrollToBottom();
			}
			/* Clear the flag so we know messages have been loaded */
			clearReceivedFlag();
		}
	}

	scrollToBottom() {
		this.messagesEnd.scrollIntoView({ behavior : 'smooth' });
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