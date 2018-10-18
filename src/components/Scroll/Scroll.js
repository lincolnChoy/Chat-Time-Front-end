import React from 'react';


const Scroll = (props) => {
		
	return (

		<div id = 'list' style = {{ overflowY : 'scroll', height : '700px' }} >
			{props.children}
		</div>
	);

}

export default Scroll;