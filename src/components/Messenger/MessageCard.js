import React from 'react';
import {
	DOMAIN
} from '../../constants';

import './message.css';

const MessageCard = ({ user, targetPic, isSending, message }) => {

	if (isSending) {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-end'}}>
				<div className = 'msgCard v-mid bg-light-red br4 ph3 pv2 white ma2'>
					{ message }
				</div>
				<div className = 'chatHead ma2' style = {{ border : '1px solid black'}} >
					<img 
						src = { DOMAIN + user.toString() + '.jpg'}
						alt = { DOMAIN + 'anon.jpg' }/>
				</div>
			</div>
		)
	}
	else {
		return (
			<div style = {{ display : 'flex', justifyContent : 'flex-start'}}>
				<div className = 'chatHead ma2' style = {{ border : '1px solid black'}} >
					<img 
						src = { DOMAIN + targetPic }
						alt = { DOMAIN + 'anon.jpg' }/>
				</div>
				<div className = 'msgCard v-mid bg-light-blue br4 ph3 pv2 ma2'>
					{ message }
				</div>
			</div>
		)
	}

}

export default MessageCard;