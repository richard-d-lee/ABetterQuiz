import React from 'react';
import Card from 'react-bootstrap/Card';
import quiz from '/components/quiz.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Placeholder from '/components/Placeholder.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        return (
            <div>
                <div className="topBar">
                    <div className="banner">
                        <Placeholder name={'banner'} />
                    </div>
                    <div className="login">
                        <Placeholder name={'login'} />
                    </div>
                </div>
                <div className="get-started-button">
                    <h1>Get Started!</h1>
                </div>
            </div>

        );
    }
}

export default App;