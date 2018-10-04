import React from 'react';
import { connect } from 'react-redux';


import Scroll from '../Scroll/Scroll';
import { getList } from '../../actions';


const mapStateToProps = (state) => {

	return {
		email : state.loadUser.user.email,
		pw : state.loadUser.user.pw,
		list : state.callAPI.resp
	}

}

const mapDispatchToProps = (dispatch) => {

	return {
		getList : (email, pw) => dispatch(getList(email,pw))
	}
}


class UserList extends React.Component {


	componentDidUpdate() {

		console.log(this.props.list);
	}

	componentDidMount() {

		const { getList, email, pw } = this.props;
		getList(email, pw);
	}


	render() {

		return (
			<div className = 'ma2 w-20'>
				<p className = 'f4 ph5 pv3 bg-white br3 tc'>Online Users</p>
					<Scroll>
						<div className = 'tc'>
							<p>User 1</p>
							<p>User 2</p>
						</div>
					</Scroll>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);