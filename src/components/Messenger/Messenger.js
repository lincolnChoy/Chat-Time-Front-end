import React from 'react';


class Messenger extends React.Component {

	render() {
		return (
			<div className = 'w-70 h-100 ma5 f1'>
				<div className = 'bg-white '>Messenger</div>
				<div className = 'bg-white' style = {{ height : '500px'}}>
					Box
				</div>
				<div>Text field</div>
			</div>
		)
	}
	
}

export default Messenger;