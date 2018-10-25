import React from 'react';
import { connect } from 'react-redux';

import MessageCard from './MessageCard';

import { getMessages, loadMessages, loadOldMessages } from '../../actions';

import {
	SUCCESS,
	CLEAR_MSG,
	REMOVE_BLOCK

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
		messageSent : state.sendMessage.messageSent,
		members : state.loadTarget.group,
		firstLoad : state.fetchMessages.firstLoad
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getMessages : (sender, destination, pw, isGroup) => dispatch(getMessages(sender, destination, pw, isGroup)),
		loadMessages : (messages) => dispatch(loadMessages(messages)),
		clearSentFlag : () => dispatch({ type : CLEAR_MSG }),
		loadOldMessages : (messages) => dispatch(loadOldMessages(messages)) ,
		removeBlock : () => dispatch({ type : REMOVE_BLOCK })
	}
}

class MessageSection extends React.Component {


	refreshMessages() {
		const { id, pw, target, getMessages } = this.props;
		getMessages(id, target.id, pw, target.isGroup);
	}

	loadOldMsg() {

		const { messages, loadOldMessages } = this.props;
		loadOldMessages(messages);
	}

	componentDidMount() {
		this.refreshMessages();
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

			const { fetchResp, loadMessages, prevMessages, firstLoad, removeBlock } = this.props;
			const { code, messages } = fetchResp;
			/* If message fetch was successful, load the messages */
			if (code === SUCCESS) {
				if (firstLoad) {
					removeBlock();
				}
				else {
					/* If new messages */
					loadMessages(messages);
					this.scroll(messages, prevMessages, firstLoad);	
				}
			}
		}
	}
	


	scroll(messages, prevMessages, firstLoad) {
		if (prevMessages.length > 0 && messages.length !== prevMessages.length) {
			this.scrollToBottom();						
		}
		else if (firstLoad) {
			setTimeout(() => { 
			var elem = document.getElementById('bottom');
	  		elem.scrollTop = elem.scrollHeight;
			}, 50);	
		}
	}

	/* Hacky scroll method */
    scrollToBottom() {
		var elem = document.getElementById('bottom');
  		elem.scrollTop = elem.scrollHeight;
    }

	render() {

		const { messages, userPicture , target, id, members } = this.props;

		/* Check if there are messages */
		let conversation;
		if (messages) {
			conversation = messages.map((message,i) => {

				/* Determine if chathead avatar should be displayed,
					based off consecutive messages  */
				let consecutiveMessage = false;
				if (i > 0) {
					if (messages[i-1].sender === messages[i].sender) {
						consecutiveMessage = true;
					}
				}

				let isSending = (message.sender === id);
				let targetPic = target.picture;
				
				/* Change target picture according to group chat */
				if (target.isGroup) {
					for (var j = 0; j < members.length; j++) {
						if (members[j].id === message.sender) {
							targetPic = members[j].picture;
						}
					}
				}

				return <MessageCard key = {i}
								userPic = { userPicture } 
								targetPic = { targetPic } 
								isSending = { isSending }
								consecutiveMessage = { consecutiveMessage } 
								message = { message.message } 
								fileCode = { message.filecode } />
			});
		}
		return (
			<div id = 'bottom' style = {{ overflowY : 'scroll', height : '70vh'}}>
				<div className = 'mb5' >
					{ conversation }
				</div>
			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSection);