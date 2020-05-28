import * as React from 'react';

import './UserCard.css';
import { IListUser } from 'src/interfaces';

interface IProps {
    user: IListUser,
    setTarget: any
}

class UserCard extends React.Component<IProps,any> {

    constructor(props: any) {
        super(props);
    }

    public setTarget = () => {
        this.props.setTarget(this.props.user);
    }

    public wasRecentlyOnline = (lastSeen: number) => {
		const timeNow = (new Date()).getTime();
		return (timeNow - (lastSeen) <= 55*1000);
	}

	public getLastOnline = (lastSeen: number) => {
		const timeNow = (new Date()).getTime();

		const lastOn = Math.floor((timeNow - (lastSeen))/(60*1000));

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

    public getActivity = () => {
        if (this.wasRecentlyOnline(+this.props.user.lastSeen)) {
            return <div className="activity-indicator" />
        }
        else {
            return this.getLastOnline(+this.props.user.lastSeen);
        }
    }

    public render() {
        const activity = this.getActivity();

        return (
            <div className = "user-card-container" onClick = {this.setTarget}>
                <div className = "dp">
                    <img src = {this.props.user.picture} height = "50px" alt='display picture'/>
                </div>
                <span>{this.props.user.first} {this.props.user.last}</span>
                <div>{activity}</div>
            </div>
        )
    }
}

export default UserCard;