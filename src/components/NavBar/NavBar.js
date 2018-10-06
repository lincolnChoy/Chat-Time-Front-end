import React from 'react';
import { connect } from 'react-redux';

import { changeRoute } from '../../actions';
import { PROFILE } from '../../constants';

import './navBar.css';
import notification from './notification.png';


const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {

	return {
		changeRoute : (route) => dispatch(changeRoute(route))
	}
}

class NavBar extends React.Component {

	render() {

		const { changeRoute } = this.props;

		return (

			<div className = 'navBar' style = {{ display : 'flex', justifyContent : 'flex-end'}}>
				<div className = 'w-30 mr5' style = {{ display : 'flex', justifyContent : 'space-between'}}>	
					<img className = 'pointer grow' src = { notification } alt = 'noti' height = '50px'/>
					<p onClick = { 
							() => {
								changeRoute(PROFILE);
							}
						}
						className = 'pointer grow'>My Profile</p>
				</div>
			</div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);