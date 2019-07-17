import React from 'react';
import { connect } from 'react-redux';

import active from './dot.png';


const mapStateToProps = (state) => {

	return {
		group : state.createGroup.group
	}
}

const mapDispatchToProps = (dispatch) => {

	return {}
}

class UserCard extends React.Component {

	constructor() {

		super();

		this.state = {
			selected : false
		}
	}

	getLastOnline(lastSeen) {
		const timeNow = (new Date()).getTime();

		let lastOn = Math.floor((timeNow - (+lastSeen))/(60*1000));

		/* More than 3 days ago */
		if (lastOn >= 4320) {
			return '>3d';
		}
		/* More than 1 day ago */
		else if (lastOn >= 1440) {
			return `${Math.floor(lastOn/(60*24))}d`;
		}
		/* More than one hour */
		else if (lastOn >= 60) {
			return `${Math.floor(lastOn/60)}h`;
		}
		else if (lastOn <= 1) {
			return '1m';
		}
		else {
			return `${lastOn}m`;
		}
		
	}


	render() {

		const { user , setTarget, clearProfile, clearMessages, shouldCreate, addUser, group } = this.props;
		const { first, last, id, picture, lastSeen } = user;

		/* If the user has been nominated for group */
		let className = '';
		if (this.state.selected) {
			className = 'br3 ma2 pointer userCard bg-orange hover-bg-orange'
		}
		else {
			className = 'br3 ma2 pointer userCard'
		}

		const timeNow = (new Date()).getTime();

		let activity = '';
		/* If on within last minute */
		if (timeNow - lastSeen <=60000) {
			activity = <img src = { active } alt = '' height = '10px' width = '10px' />
		}
		else {
			const time = this.getLastOnline(lastSeen);
			activity = <p>{time}</p>
		}

		return (
			<div>
				<div onClick = { () => {
					if (!shouldCreate) {
						clearMessages();
						clearProfile();
						setTarget(first, last, id, picture, 0);
					}
					else {
						let tempGroup = group;
						if (!tempGroup.includes(id)) {
							tempGroup.push(id);
							addUser(tempGroup);
							this.setState({ selected : !this.state.selected });
							console.log(this.state.selected);
						}
						else {
							for (var i = 0; i < tempGroup.length; i++) { 
								if (tempGroup[i] === id) {
									tempGroup.splice(i, 1);
									addUser(tempGroup);
									this.setState({ selected : !this.state.selected }); 
								}
							}
						}
					}
				}}

				className = { className }
				style = {{ border : '1px solid transparent', display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
					<div className = 'listHead'>
						<img src = { picture } height = '40px' width = '40px' alt = '' />
					</div>
					<span className = 'ml3'>{ first } { last } </span>
					{ activity }
				</div>
			</div>
		)
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);