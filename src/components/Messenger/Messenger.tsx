import * as React from 'react';
import { connect } from 'react-redux';

import './Messenger.css';
import MessageCard from './MessageCard/MessageCard';

import MessageInput from './MessageInput';
import { LOAD_ROUTE, SET_PROFILE_TARGET } from 'src/store/constants';
import { getColor } from 'src/utility/theme';
import { IGetMessageConfig, IAuthData } from 'src/interfaces';
import { getMessages } from 'src/store/actions/messenger';

interface IProps {
    user: any,
    target: any,
    messages: any,
    fetchResp: any,
    sendResp: any,
    theme: string,
    authData: IAuthData,
    viewProfile: () => {},
    loadTarget: (target: string) => {},
    getMessages: (config: IGetMessageConfig) => {}
}

interface IState {
    messagesLoaded: boolean
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        authData: state.auth.authData,
        target: state.messenger.target,
        messages: state.messenger.fetch.messages,
        fetchResp: state.messenger.fetch,
        sendResp: state.messenger.send,
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        viewProfile: () => dispatch({ type: LOAD_ROUTE, payload: "PROFILE"}),
        loadTarget: (target: string) => dispatch({ type: SET_PROFILE_TARGET, payload: target }),
        getMessages: (config: IGetMessageConfig) => dispatch(getMessages(config))
    }
}

class Messenger extends React.Component<IProps, IState> {

    public interval: any;

    constructor(props: any) {
        super(props);
        this.state = {
            messagesLoaded: false
        }
    }

    public componentDidMount = () => {
        this.interval = setInterval(()=>{this.getMessages()}, 5000);
    }

    public getMessages = () => {
        if (this.props.target) {
            const authData: IGetMessageConfig = {
                sender: this.props.authData.username,
                password: this.props.authData.password,
                destination: this.props.target.username
            }
            this.props.getMessages(authData);
            this.removeMessageLock();
        }
    }

    public componentWillUnmount = () => {
        clearInterval(this.interval);
    }


    public componentDidUpdate = () => {

        if (this.state.messagesLoaded === false) {
            if (this.props.fetchResp.code === 0) {
                this.setState({ messagesLoaded: true });
                this.scrollToBottom();
            }
        }
    }

    public removeMessageLock = () => {
        this.setState({messagesLoaded: false});
    }

    public scrollToBottom = () => {
        setTimeout(() => {
            if (this.props.target !== null) {
                const elem = document.getElementById('message-container');
                if (elem) {
                    elem.scrollTop = elem.scrollHeight;
                }
            }
        }, 0);
    }


    public viewProfile = () => {
        this.props.loadTarget(this.props.target.username);
        this.props.viewProfile();
    }
    
    public render() {

        const { messages } = this.props;

        let messageList: any[] = [];
        let isInvalid: boolean = false;
        if (messages) {
            messageList = messages.map((message: any, i: number) => {

                /* Should only display avatar if message is not consecutive */
                let isConsecutive = false;
                if (i > 0) {
                    if (messages[i-1].sender === messages[i].sender) {
                        isConsecutive = true;
                    }
                }
                
                /* Error check */
                if (message.sender !== this.props.target.username && message.destination !== this.props.target.username) {
                    isInvalid=true;
                }
                return (
                    <MessageCard 
                        message = {message.message}
                        isSending = {message.sender === this.props.user.username}
                        destination = {message.destination}
                        sender = {message.sender}
                        timestamp = {message.timestamp}
                        isImage = {message.isImage}
                        targetPic = {this.props.target.picture}
                        userPic = {this.props.user.picture}
                        isConsecutive = {isConsecutive}
                        theme = {this.props.theme}
                        key = {`${Math.random()} ${Math.random()}`}
                    />
                )
            })
        }

        if (isInvalid) {
            messageList = [];
        }

        return (
                (this.props.target !== null) ?
                <div className = "messenger-container">
                    <div className = "messenger-body" style={{borderColor: getColor(this.props.theme, 'border')}}>
                        <div className = "name-container" onClick = {this.viewProfile} style = {{backgroundColor: getColor(this.props.theme, 'name-header')}}>
                            {this.props.target.first}
                        </div>
                        <div id = "message-container" className = "messages-container">
                            {(messageList.length > 0) ?
                                messageList
                                :
                                <p style = {{textAlign: 'center'}}>This is the beginning of your chat history with {this.props.target.first} {this.props.target.last}</p>
                            }
                        </div>
                    </div>
                    {/* Message field/input and send button */}
                    <MessageInput unlock = {this.removeMessageLock}/>
                </div>
                :
                null
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);