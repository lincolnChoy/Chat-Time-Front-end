import React from 'react';
import './profile.css';
import {
	DOMAIN 
} from '../../constants';
const ProfileSection = ({ picture, name, birthday, location, occupation, blurb }) => {

	return (

		<div className = 'ma2 w-90 h-50 br3 profileBox'>
			<div className = 'bg-white tc dp'>
				<img 
					className = 'mt2 br3' style = {{ border : '1px solid black'}} 
					src = { DOMAIN + picture }
					alt = { DOMAIN + 'anon.jpg' } height = '200px'/>
			</div>
			<div className = 'underline'>
				<p className = 'mv2 tc'>Name : { name } </p>
				<p className = 'mt3 mb2 ml2'>Birthday : { birthday } </p>
				<p className = 'mv2 mr2 tr'>Location : { location } </p>
				<p className = 'mv2 ml2'>Occupation : { occupation } </p>
				<p className = 'tc'>About me : { blurb } </p>
			</div>
		</div>
	)
}

export default ProfileSection;