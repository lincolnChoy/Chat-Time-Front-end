import React from 'react';
import { connect } from 'react-redux';

import MessageCard from './MessageCard';

import { getMessages, loadMessages, loadOldMessages } from '../../actions';

import {
	SUCCESS,
	CLEAR_MSG
} from '../../constants';

const mapStateToProps = (state) => {

	return {
		id : state.loadUser.user.id,
		pw : state.loadUser.user.pw,
		userPicture : state.loadUser.user.picture,
		target : state.loadTarget.target,
		messages : state.fetchMessages.messages,
		prevMessages : state.fetchMessages.prevMessages,
		fetchResp : state.fetchMessages.resp,
		messagesLoaded : state.fetchMessages.messagesLoaded,
		messageSent : state.sendMessage.messageSent
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getMessages : (sender, destination, pw) => dispatch(getMessages(sender, destination, pw)),
		loadMessages : (messages) => dispatch(loadMessages(messages)),
		clearSentFlag : () => dispatch({ type : CLEAR_MSG }),
		loadOldMessages : (messages) => dispatch(loadOldMessages(messages)) 
	}
}

class MessageSection extends React.Component {

	refreshMessages() {
		const { id, pw, target, getMessages } = this.props;
		getMessages(id, target.id, pw);
	}

	loadOldMsg() {

		const { messages, loadOldMessages } = this.props;
		loadOldMessages(messages);
	}

	componentDidMount() {
		this.refreshMessages();
		this.scrollToBottom();
		this.interval = setInterval(() => { this.refreshMessages(); this.loadOldMsg() }, 1000);
	}

	componentWillUnmount() {

		clearInterval(this.interval);
	}


	componentDidUpdate() {

		/* If message was sent by client, clear the flag */
		if (this.props.messageSent) {
			const { clearSentFlag } = this.props;
			clearSentFlag();
		}

		/* If a message fetch was called, check the results */
		if (!this.props.messagesLoaded) {

			const { fetchResp, loadMessages, target, prevMessages } = this.props;
			const { code, messages } = fetchResp;
			/* If message fetch was successful, load the messages */
			if (code === SUCCESS) {
				if (messages.length > 0) {
					if (messages[0].sender === target.id || messages[0].destination === target.id) {
						/* Load messages and clear the flag so we know messages have been loaded */
						loadMessages(messages);
						if (prevMessages.length > 0) {
							if (messages.length !== prevMessages.length) {
								this.scrollToBottom();							
							}
						}
						else {
							this.scrollToBottom();
						}
					}
				}
			}
		}
	}

	scrollToBottom() {
		this.messagesEnd.scrollIntoView({ behavior : 'smooth' });
	}

	render() {

		const { messages, userPicture , target, id } = this.props;

		/* Check if there are messages */
		let conversation;
		if (messages !== '' && messages!== undefined) {
			conversation = messages.map((message,i) => {
				let isSending = (message.sender === id)
				return <MessageCard key = {i}
								userPic = { userPicture } 
								targetPic = { target.picture } 
								isSending = { isSending } 
								message = { message.message } 
								fileCode = { message.filecode } />
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