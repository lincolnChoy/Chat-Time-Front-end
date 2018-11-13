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
		/* If on within last 5 minutes */
		if (timeNow - lastSeen <= 30000) {
			activity = <img src = { active } alt = '' height = '10px' width = '10px' />
		}
		else {
			activity = <img src = '' alt = '' height = '10px' width = '10px' />
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