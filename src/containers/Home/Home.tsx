import * as React from 'react';
import Userlist from 'src/components/Userlist/Userlist';
import Messenger from 'src/components/Messenger/Messenger';

import './Home.css';
import Header from 'src/components/Header/Header';


class Home extends React.Component<{},{}> {
    
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className = "home-container">
                <Header />

                <div className = "main-content-container">
                    <Messenger />
                    <Userlist />
                </div>
            </div>

        )
    }
}

export default Home;