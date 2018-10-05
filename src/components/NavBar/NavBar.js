import React from 'react';
import './navBar.css';
import notification from './notification.png';


const NavBar = () => {

	return (

		<div className = 'navBar' style = {{ display : 'flex', justifyContent : 'flex-end'}}>
			<div className = 'w-30 mr5' style = {{ display : 'flex', justifyContent : 'space-between'}}>	
				<img className = 'pointer grow' src = { notification } alt = 'noti' height = '50px'/>
				<p className = 'pointer grow'>My Profile</p>
			</div>
		</div>
	)
}

export default NavBar;