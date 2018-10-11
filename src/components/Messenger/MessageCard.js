import React from 'react';

import './message.css';

const MessageCard = ({ userPic, targetPic, isSending, message, fileCode }) => {

	let finalMessage = message;

	/* If message is an image */
	if (fileCode === 0 || fileCode === 1) {
		finalMessage = 
		<div className = 'msgCard br4 pv2 ma2' >
			<img src = { message } alt = 'msgImg'width = '200px' />
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
	/* If image is simple text */
	else {
		if (isSending) {
			finalMessage = 
			<div className = 'msgCard bg-light-red br4 ph3 pv2 white ma2'>
				{ message }
			</div>
		}
		else {
			finalMessage = 
			<div className = 'msgCard bg-light-blue br4 ph3 pv2 ma2'>
				{ message }
			</div>
		}
	}

	if (isSending) {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-end'}}>
				{ finalMessage }
				<div className = 'chatHead ma2'>
					<img 
						src = { userPic }
						alt = 'user dp'/>
				</div>
			</div>
		)
	}
	else {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-start'}}>
				<div className = 'chatHead ma2'>
					<img 
						src = { targetPic }
						alt = 'target dp'/>
				</div>
				{ finalMessage }
			</div>
		)
	}

}

export default MessageCard;