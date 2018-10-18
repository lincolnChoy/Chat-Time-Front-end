import React from 'react';
import './profile.css';
import { connect } from 'react-redux';

import { changeRoute } from '../../actions';
import { HOME } from '../../constants';


const mapStateToProps = (state) => {

	return {
		profile : state.loadTarget.profile,
		target : state.loadTarget.target
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {
		changeRoute : (route) => dispatch(changeRoute(route))
	}
}


class TargetProfile extends React.Component {


	render() {

		const { profile, target, changeRoute } = this.props;
		const { birthday, location, occupation, blurb, picture } = profile;


		return (
			<div>
				<div style = {{ display : 'flex', justifyContent : 'flex-end' }}>
					<input onClick = { () => { changeRoute(HOME);}} 
						className = 'mt3 mr3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib br3' type = 'submit' value = 'Go back' />
				</div>
				<div style = {{ display : 'flex', justifyContent : 'center' }}>
					<div className = 'pa3 w-80' style = {{ display : 'flex', justifyContent : 'space-around' }}>
						<div className = 'ma5'>
							<img 
							className = 'br3 dp' style = {{ border : '1px solid black'}} 
							src = { picture }
							alt = 'user avatar' height = '200px'/>
							<h2>{ target.first + ' ' + target.last }</h2>
						</div>
						<div className = 'ma5'>

							<label className = 'ma3 fw6 lh-copy f4'>Occupation</label>
							{ occupation }
							<br/>

							<label className = 'ma3 fw6 lh-copy f4'>Location</label>
							{ location }
							<br/>

							<label className = 'ma3 fw6 lh-copy f4'>Birthday</label>
							{ birthday }
							<br/>

							<label className = 'ma3 fw6 lh-copy f4'>Blurb</label>
							{ blurb }
							<br/>
						</div>
					</div>
				</div>
			</div>
		)	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TargetProfile);