import React from 'react';

import './message.css';

const MessageCard = ({ userPic, targetPic, isSending, message }) => {

	if (isSending) {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-end'}}>
				<div className = 'msgCard bg-light-red br4 ph3 pv2 white ma2'>
					{ message }
				</div>
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
				<div className = 'msgCard bg-light-blue br4 ph3 pv2 ma2'>
					{ message }
				</div>
			</div>
		)
	}

}

export default MessageCard;