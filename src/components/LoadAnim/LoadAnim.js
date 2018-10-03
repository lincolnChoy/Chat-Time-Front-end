import React from 'react';
import Loading from 'react-loading-animation';
import './loadAnim.css';

const LoadAnim = () => {
	
	return (
		<div className = 'loadAnim circle'>
			<Loading />
		</div>
	)
}

export default LoadAnim;