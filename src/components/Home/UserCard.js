import React from 'react';


const UserCard = ({ first, last, id, picture, setTarget, clearProfile }) => {

	return (
		<div>
			<div onClick = { () => {
				clearProfile();
				setTarget(first, last, id, picture);
			}}
			className = 'br3 ma2 pointer grow' style = {{ border : '1px solid white' }}>
				<p>{ first } { last } </p>
			</div>
		</div>
	)
}

export default UserCard;