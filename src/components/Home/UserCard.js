import React from 'react';
import { connect } from 'react-redux';


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
		const { first, last, id, picture } = user;

		let className = '';
		if (this.state.selected) {
			className = 'br3 ma2 pointer userCard bg-orange hover-bg-orange'
		}
		else {
			className = 'br3 ma2 pointer userCard'
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
				style = {{ border : '1px solid transparent', display : 'flex', alignItems : 'center' }}>
					<div className = 'listHead'>
						<img src = { picture } height = '40px' width = '40px' alt = '' />
					</div>
					<span className = 'ml3'>{ first } { last } </span>
				</div>
			</div>
		)
	} 
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);