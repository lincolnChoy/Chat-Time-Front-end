import React from 'react';

import './message.css';

const MessageCard = ({ userPic, targetPic, isSending, message, fileCode, consecutiveMessage }) => {

	let finalMessage = message;

	/* If message is an image */
	if (fileCode === 0 || fileCode === 1) {
		finalMessage = 
		<div className = 'msgCard pv2 ma2' >
			<img className = 'br4' src = { message } alt = '' width = '200px' />
		</div>
	}

	/* If message is an mp3 file */
	else if (fileCode === 2) {
		finalMessage = 
		<div className = 'msgCard br4 pv2 ma2' >
			<audio controls>
				<source src = { message } type = 'audio/mpeg'/>
			</audio>
		</div>
	}

	/* If message is simple text */
	else {
		if (isSending) {
			finalMessage = 
			<div className = 'msgCard sender ph3 ma2'>
				{ message }
			</div>
		}
		else {
			finalMessage = 
			<div className = 'msgCard receiver ph3 ma2'>
				{ message }
			</div>
		}
	}


	if (isSending) {
		let chatHead = 
			<img 
				src = { userPic }
				alt = ''/>

		if (consecutiveMessage) {
			chatHead = ''
		}

		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-end'}}>
				{ finalMessage }
				<div className = 'chatHead ma2'>
					{ chatHead }
				</div>
			</div>
		)
	}
	else {
		let chatHead = 
			<img 
				src = { targetPic }
				alt = ''/>
		if (consecutiveMessage) {
			chatHead = '' 
		}

		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-start'}}>
				<div className = 'chatHead ma2'>
					{ chatHead }
				</div>
				{ finalMessage }
			</div>
		)
	}

}

export default MessageCard;