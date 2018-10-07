import React from 'react';

const MessageCard = ({ isSending, message }) => {

	if (isSending) {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-end'}}>
				<div className = 'msgCard tr bg-light-red br4 ph3 pv2 white ma2'>
					{ message }
				</div>
			</div>
		)
	}
	else {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-start'}}>
				<div className = 'msgCard tl bg-light-blue br4 pa3 ma2'>
					{ message }
				</div>
			</div>
		)
	}

}

export default MessageCard;