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
            currentImage: ''
        }
    }
    componentDidMount() {
        let ntryList = Object.keys(quiz);
        this.setState({
            countryList: ntryList,
            currentCountry: ntryList[2],
        }, () => {
            console.log(this.state.currentCountry);
            this.setState({
                linkRef: `https://www.google.com/search?q=${this.state.currentCountry}`,
                currentImage: quiz[this.state.currentCountry].image,
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
                <div className="get-started-button">
                    <h1 className="start-text">Get Started!</h1>
                </div>
                <a href={this.state.linkRef}>
                    <img className="image" src={this.state.currentImage}></img>
                </a>
            </div>

        );
    }
}

export default App;