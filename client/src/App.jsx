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
            countryList: [],
            currentCountry: '',
            linkRef: '',
            currentImage: '',
            currentFlag: ''
        }
    }
    startClick() {
        console.log('hello');
    }
    componentDidMount() {
        let ntryList = Object.keys(quiz);
        this.setState({
            countryList: ntryList,
            currentCountry: ntryList[(Math.floor(Math.random() * 50))],
        }, () => {
            console.log(this.state.currentCountry);
            this.setState({
                linkRef: `https://www.google.com/search?q=${this.state.currentCountry}`,
                currentImage: quiz[this.state.currentCountry].image,
                currentFlag: quiz[this.state.currentCountry].flag
            })
        })
    }
    render() {

        return (
            <div>
                <div className="topBar">
                    <div className="banner">
                        <Placeholder name={'Quistory'} />
                    </div>
                    <div className="header">
                        <Placeholder name={'Scroll down to visit a random country!'}/>
                    </div>
                    <div className="login">
                        <Placeholder name={'login'} />
                    </div>
                </div>
                <div id="get-started-button" onClick={this.startClick}>
                    <h1 id="start-text">Get Started!</h1>
                </div>
                <div className="images">
                    <a href={this.state.linkRef}>
                        <img className="flag" src={this.state.currentFlag}></img>
                    </a>
                    <a href={this.state.linkRef}>
                        <img className="image" src={this.state.currentImage}></img>
                    </a>
                </div>
            </div>

        );
    }
}

export default App;