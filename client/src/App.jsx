import React from 'react';
import Card from 'react-bootstrap/Card';
import quiz from '/components/quiz.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Placeholder from '/components/Placeholder.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countryList: [],
            currentCountry: '',
            linkRef: '',
            currentImage: '',
            currentFlag: '',
            started: false
        }
        this.startClick = this.startClick.bind(this);
        this.startFunc = this.startFunc.bind(this);
        this.countryClick = this.countryClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }
    countryClick(country) {
        console.log('entering countryClick', country)
        this.setState({
            currentCountry: country,
            currentImage: quiz[country].image,
            currentFlag: quiz[country].flag
        })
    }
    startClick() {
        this.setState({ started: true })
    }
    componentDidMount() {
        let ntryList = Object.keys(quiz);
        console.log(ntryList.length)
        this.setState({
            countryList: ntryList,
            currentCountry: ntryList[(Math.floor(Math.random() * 251))],
        }, () => {
            this.setState({
                linkRef: `https://www.google.com/search?q=${this.state.currentCountry}`,
                currentImage: quiz[this.state.currentCountry].image,
                currentFlag: quiz[this.state.currentCountry].flag
            })
        })
    }
    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    startFunc() {
        if (this.state.started === false) {
            return (<div id="get-started-button">
                <h1 onClick={this.startClick} id="start-text">Get Started!</h1>
            </div>)
        } else {
            return <h1>butter</h1>
        }
    }
    render() {

        return (
            <div>
                <div className="topBar">
                    <div className="banner" onClick={() => {window.location.reload(false)}}>
                        <Placeholder name={'Quistory'} />
                    </div>
                    <div className="header" onClick={() => {this.scrollToBottom()}}>
                        <Placeholder name={'Scroll down to visit a random country!'} />
                    </div>
                    <div className="login">
                        <Placeholder name={'login'} />
                    </div>
                </div>
                <Dropdown className="countryDrop" variant="primary">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Country
                        </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.state.countryList.map((country) => {
                            return <Dropdown.Item onClick={() => { this.countryClick(country) }}>{country}</Dropdown.Item>
                        }
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                {
                    this.startFunc()
                }
                <div className="images">
                    <a href={this.state.linkRef} target="_blank">
                        <img className="flag" src={this.state.currentFlag}></img>
                    </a>
                    <a href={this.state.linkRef} target="_blank">
                        <img className="image" ref={(el) => { this.messagesEnd = el; }} src={this.state.currentImage}></img>
                    </a>
                </div>
            </div>

        );
    }
}

export default App;