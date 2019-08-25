import * as React from 'react';
import { connect } from 'react-redux';

import attach from '../../assets/attach.png';
import { ISendMessageConfig, IAuthData } from 'src/interfaces';
import { sendMessage } from 'src/store/actions/messenger';
import { getColor } from 'src/utility/theme';

interface IProps {
    authData: IAuthData;
    target: any;
    theme: string;
    sendMessageAction: (config: ISendMessageConfig) => {};
    unlock: () => {};
    }

interface IState {
    input: string
}

const mapStateToProps = (state: any) => {
    return {
        authData: state.auth.authData,
        target: state.messenger.target,
        theme: state.theme.theme
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessageAction: (config: ISendMessageConfig) => (dispatch(sendMessage(config)))
    }
}



class MessageInput extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            input: ""
        }
        this.uploadAndSend = this.uploadAndSend.bind(this);
    }

    public onUpdateInput = (event: any) => {
        this.setState({input: event.target.value});
    }

    public onKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            this.onSend();
        }
    }

    public onSend = () => {
        if (this.state.input.trim() !== "") {

            const config: ISendMessageConfig = {
                sender: this.props.authData.username,
                password: this.props.authData.password,
                destination: this.props.target.username,
                message: this.state.input,
                isImage: 0
            }
            this.props.sendMessageAction(config);
            this.props.unlock();

            this.setState({ input: ""});
        }
    }

    
    public uploadAndSend = (event: any) => {

		/* Grab the file and read as a base64 string */
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		
		const { sendMessageAction, target, authData } = this.props;

		/* When b64 string is ready, send it to the back-end */
		reader.onload = () => {
            if (reader.result) {
                const fileData = reader.result.toString();
                
                const config: ISendMessageConfig = {
                    sender: authData.username,
                    password: authData.password,
                    destination: target.username,
                    message: fileData,
                    isImage: 1
                }
                sendMessageAction(config);
            }
		}
	}



    public render() {
        return (
        <div className = "message-input-container">
                        
            <input 
                className = "message-input"
                style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}}
                placeholder = "Type something."
                value = {this.state.input}
                onChange = {this.onUpdateInput}
                onKeyDown = {this.onKeyDown}
                type = "text" />

            <div className = "image-upload">
                <label htmlFor = "file">
                    <img className = "attach" src = {attach} alt = 'attach icon' width = "40px" />
                </label>
                <input 
                    id = "file" 
                    type = "file"
                    accept="image/png, image/jpeg"
                    onChange = {this.uploadAndSend}
                />
            </div>
            <button className = "send-button" style = {{color: getColor(this.props.theme, 'color'), borderColor: getColor(this.props.theme, 'color')}}onClick = {this.onSend}>Send</button>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);