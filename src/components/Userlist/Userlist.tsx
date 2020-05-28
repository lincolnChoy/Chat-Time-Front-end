import * as React from 'react';

import './Userlist.css';

import { connect } from 'react-redux';
import { getList } from 'src/store/actions/userlist';
import UserCard from './UserCard/UserCard';
import { LOAD_TARGET } from 'src/store/constants';
import { getMessages } from 'src/store/actions/messenger';
import { IGetMessageConfig, IListUser } from 'src/interfaces';

const mapStateToProps = (state: any) => {
    return {
        userList: state.list.list,
        authData: state.auth.authData
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getList: (username: string) => dispatch(getList(username)),
        setTarget: (target: any) => dispatch({ type: LOAD_TARGET, payload: target }),
        getMessages: (config: IGetMessageConfig) => (dispatch(getMessages(config)))
    }
}

class Userlist extends React.Component<any, any> {
    private interval: any;

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.getList(this.props.authData.username);
        this.interval = setInterval(() => {this.getList()}, 10000);
    }

    public getList = () => {
        this.props.getList(this.props.authData.username)
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }

    public setTarget = (target: any) => {
        this.props.setTarget(target);
        const authData: IGetMessageConfig = {
            sender: this.props.authData.username,
            password: this.props.authData.password,
            destination: target.username
        }
        this.props.getMessages(authData);
    }

    public render() {
        const userList = this.props.userList.map((user: IListUser) => {
            return (
                <UserCard 
                    user = {user}
                    setTarget = {this.setTarget}
                    key = {`${Math.random()} ${Math.random()}`}
                />
            )
        })
        return (
            <div className = "list-container">
                <h3>CONTACTS</h3>
                <hr/>
                <div className = "list-content">
                    {userList}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);