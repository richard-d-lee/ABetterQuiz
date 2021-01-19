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
            clickedCountries: [],
        }
        this.startClick = this.startClick.bind(this);
        this.startFunc = this.startFunc.bind(this);
        this.countryClick = this.countryClick.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.renderGridMember = this.renderGridMember.bind(this);
        this.renderFullGrid = this.renderFullGrid.bind(this);
        this.gridClicker = this.gridClicker.bind(this);

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
    gridClicker(e) {
        let countryList = this.state.clickedCountries;
        let originalRef = e.target.parentElement.innerText;
        let countryName = e.target.parentElement.innerText;
        if (countryName.length > 21) {
            countryName = countryName.split('');
            if (countryName[21] !== '-') {
                countryName.splice(21, 1, ' ');
                countryName = countryName.join('');
            } else {
                countryName.splice(21, 2);
                countryName = countryName.join('');
            }
        }
        console.log('----', countryName)
        if (!this.state.clickedCountries.includes(countryName)) {
            countryList.push(countryName)
            this.setState({clickedCountries: countryList}, () => {
                console.log(this.state.clickedCountries);
            })
        } else {
            let index = this.state.clickedCountries.indexOf(countryName);
            countryList.splice(index, 1);
            this.setState({clickedCountries: countryList}, () => {
                console.log(this.state.clickedCountries);
            })
        }
    }
    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    renderGridMember(country) {
        if (this.state.clickedCountries.includes(country)) {
            if (country.length > 21) {
                let oneText = country.slice(0,21);
                let splitText = oneText.split('');
                console.log('uuuuuuuuuuuuu', splitText);
                if (country[21] === ' ') {
                    return (
                        <div className="clickedMember" onClick={this.gridClicker}>
                            <img className="gridImage" src={quiz[country].flag}></img>
                            <h3 className="oneText">{country.slice(0, 21)}</h3>
                            <h3 className="twoText">{country.slice(21)}</h3>
                        </div>
                    )
                } else return (
                    <div className="clickedMember" onClick={this.gridClicker}>
                        <img className="gridImage" src={quiz[country].flag}></img>
                        <h3 className="oneText">{country.slice(0, 21)}-</h3>
                        <h3 className="twoText">{country.slice(21)}</h3>
                    </div>
                )
            }
            else return (
                <div className="clickedMember" onClick={this.gridClicker}>
                    <img className="gridImage" src={quiz[country].flag}></img>
                    <h3 className="gridText">{country}</h3>
                </div>
            )
        } else if (country.length > 21) {
            let splitCountry = country.split('');
            if (splitCountry[21] === ' ') {
                return (
                    <div className="gridMember" onClick={this.gridClicker}>
                        <img className="gridImage" src={quiz[country].flag}></img>
                        <h3 className="oneText">{country.slice(0, 21)}</h3>
                        <h3 className="twoText">{country.slice(21)}</h3>
                    </div>
                )
            } else return (
                <div className="gridMember" onClick={this.gridClicker}>
                    <img className="gridImage" src={quiz[country].flag}></img>
                    <h3 className="oneText">{country.slice(0, 21)}-</h3>
                    <h3 className="twoText">{country.slice(21)}</h3>
                </div>
            )
        }
        else return (
            <div className="gridMember" onClick={this.gridClicker}>
                <img className="gridImage" src={quiz[country].flag}></img>
                <h3 className="gridText">{country}</h3>
            </div>
        )
    }
    renderFullGrid(number, fullGrid = []) {
        for (let i = 0; i < number; i++) {
            fullGrid.push(this.renderGridMember(this.state.countryList[i]))
        }
        return (<div className="fullGrid">
            {fullGrid}
        </div>
        );
    }

    startFunc() {
        if (this.state.screen === 'start') {
            return (
            <div>
                <img className="flier" src={this.state.currentFlag}></img>
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
            <div className="midText">
                <div className="interest-text">
                    <h1 className="midTextTwo" id="start-text">Which of these countries are you interested in?</h1>
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