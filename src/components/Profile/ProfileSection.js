import React from 'react';

const ProfileSection = ({ birthday, location, occupation, blurb }) => {

	return (

		<div className = 'ml5'>
			<p>Birthday : { birthday } Location : { location } Occupation : { occupation } About me : { blurb }  </p>
		</div>
	)
}

export default ProfileSection;