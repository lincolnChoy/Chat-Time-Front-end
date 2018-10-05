import React from 'react';


const UserCard = ({ first, last, id, setTarget }) => {

	return (
		<div>
			<div onClick = { () => {
				setTarget(first, last, id);
			}}
			className = 'br3 pa2 ma2 pointer grow' style = {{ border : '1px solid white' }}>
				<p>{ first } { last } </p>
			</div>
		</div>
	)
}

export default UserCard;