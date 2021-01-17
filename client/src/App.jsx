import React from 'react';
import Card from 'react-bootstrap/Card';
import quiz from '/components/quiz.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
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
            screen: 'start',
        }
        this.startClick = this.startClick.bind(this);
        this.startFunc = this.startFunc.bind(this);
        this.countryClick = this.countryClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.renderGridMember = this.renderGridMember.bind(this);
        this.renderFullGrid = this.renderFullGrid.bind(this);
        this.randomFlag = this.randomFlag.bind(this);

    }
    countryClick(country) {
        this.setState({
            currentCountry: country,
            currentImage: quiz[country].image,
            currentFlag: quiz[country].flag
        })
    }
    showCreate(e) {
        this.setState({
            screen: 'create'
        });
    }
    showLogin(e) {
        this.setState({
            screen: 'login'
        });
    }
    startClick() {
        this.setState({
            screen: 'grid',
        })
    }
    componentDidMount() {
        let ntryList = Object.keys(quiz);
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
    renderGridMember() {
        return (
            <div className="gridMember">
                <h3>hi</h3>
            </div>
        )
    }
    renderFullGrid(number) {
        for (let i = 0; i < number; i++) {
            this.renderGridMember()
        }
    }
    randomFlag() {
        let randomIndex = (Math.floor(Math.random() * 251));
        let randomCountry = this.state.countryList[randomIndex] || this.state.currentCountry;
        console.log(randomCountry);
        if (quiz[randomCountry]) {
            return quiz[randomCountry].flag
        } else {
            return this.state.currentFlag;
        }
    }
    startFunc() {
        if (this.state.screen === 'start') {
            return (
            <div>
                <img className="flier" src={this.randomFlag()}></img>
                <div className="midBar">
                    <div className="get-started-button">
                        <button className="midButt" onClick={this.startClick} id="start-text">Get Started!</button>
                    </div>
                    <div className="description-div">
                        <h1 className="hello">The Quistory app is an effort to encourage and nurture curiosity about the world around us. Please use it to foster your desire to know about any country in the world, and hopefully lead yourself down a few rabbit holes of history and world culture. Cheers to you and your pursuit of knowledge.<br></br>-------------------------------------------Richard Lee--------------------------------------------</h1>
                    </div>
                </div>
            </div>
            )
        } else if (this.state.screen === "grid") {
            return <div>
            <div className="midBar" id="interest-section">
                <div className="get-started-button" id="interest-text">
                    <h1 className="midButt" id="start-text">Which of these countries are you interested in?</h1>
                </div>
                <div className="countryGrid">
                    {
                        this.renderFullGrid(251)
                    }
                </div>
            </div>
        </div>
        } else if (this.state.screen === "login") {
            return <h1>login</h1>
        } else if (this.state.screen === "create") {
            return <h1>create</h1>
        }
    }
    render() {

        return (
                <div className="fullBody">
                    <div className="topBar">
                        <div className="banner" onClick={() => { window.location.reload(false) }}>
                            <Placeholder name={'Quistory'} />
                        </div>
                        <div className="header" onClick={() => { this.scrollToBottom() }}>
                            <Placeholder name={'Scroll down to visit ' + this.state.currentCountry + '!'} />
                        </div>
                        <div className="login">
                            <div>
                                <button className="create-button" onClick={e => {
                                    this.showCreate();
                                }}> Create an Account </button>
                            </div>
                            <div className="login-div">
                                <button className="login-button" onClick={e => {
                                    this.showLogin();
                                }}> Log In </button>
                            </div>
                        </div>
                    </div>
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
                </div >

        );
    }
}

export default App;