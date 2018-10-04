import React from 'react';

class Messenger extends React.Component {

	render() {
		return (
			<div className = 'w-80 wrapper'>
				<div className = 'message w-100'>
					<input className = 'b pa2 input-reset ba bg-transparent hover-white w-90' type = 'text' />
					<input className = 'ml2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Send' />
				</div>
			</div>
		)
	}
}

export default Messenger;