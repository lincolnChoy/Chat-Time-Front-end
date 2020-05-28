import * as React from 'react';
import './MessageCard.css';
import { getColor } from 'src/utility/theme';

interface IProps {
    message: string;
    isSending: boolean;
    destination: number;
    sender: number;
    timestamp: string;
    isImage: number;
    targetPic: string;
    userPic: string;
    isConsecutive: boolean;
    theme: string;
}

class MessageCard extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { message, isImage, isSending, userPic, targetPic, isConsecutive, theme } = this.props;

        let finalMessage;

        /* If message is an image */
        if (isImage === 1) {
            finalMessage = 
                <div className = "msg-card-image">
                    <img src = { message } alt = "message image" width = "200px" />
                </div>
        }
    
        /* If message is simple text */
        else {
            if (isSending) {
                finalMessage = 
                    <div className = "msg-card" style = {{
                            color: getColor(theme, 'msgSenderColor'), 
                            backgroundColor: getColor(theme, 'msgSender')
                        }}>
                        { message }
                    </div>
            }
            else {
                finalMessage = 
                    <div className = "msg-card" style = {{color: getColor(theme, 'msgReceiverColor'), backgroundColor: getColor(theme, 'msgReceiver')}}>
                        { message }
                    </div>
            }
        }
    
        if (isSending) {
            let chatHead;

            if (!isConsecutive) {
                chatHead = 
                    <img src = {userPic}
                        alt = ''/>
            }
            return (
                <div className = "sending-container">
                    { finalMessage }
                    <div className = "chat-head-container">
                        { chatHead }
                    </div>
                </div>
            )
        }
        else {
            let chatHead;
            
            if (!isConsecutive) {
                chatHead = 
                    <img src = {targetPic}
                        alt = ''/>
            }
    
            return (
                <div className = "receiving-container">
                    <div className = "chat-head-container">
                        { chatHead }
                    </div>
                    { finalMessage }
                </div>
            )
        }
    }
}

export default MessageCard;