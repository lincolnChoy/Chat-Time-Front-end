import React from 'react';
import { connect } from 'react-redux'; 

const mapStateToProps = (state) => {
	return {
		messageTarget : state.setTarget.target
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

class Messenger extends React.Component {

	render() {

		const { messageTarget } = this.props;

		let messageBox;
		if (messageTarget) {
			messageBox = 
				<div className = 'w-100 pa3' style = {{ display : 'flex', justifyContent : 'space-around' }}>
					<div className = 'pa3'>{ messageTarget.first + '  ' +  messageTarget.last }</div>
					<div className = 'h-50 br3 pa3 pointer grow' style = {{ border : '1px solid blue' }}>View Profile</div>
					<div className = 'message w-100'>
						<input className = 'b pa2 input-reset ba bg-transparent hover-white w-90' type = 'text' />
						<input className = 'ml2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib' type = 'submit' value = 'Send' />
					</div>
				</div>
		}
		else {
			messageBox = <h1 className = 'mt7 tc white'>Click on a user to message them!</h1>;
		}

		return (
			<div className = 'w-80 wrapper'>
				{ messageBox }
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);