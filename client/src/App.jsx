import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import quiz from '/client/components/quiz.js';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Placeholder from '/client/components/Placeholder.jsx';
import Form from 'react-bootstrap/Form'
import Dashboard from '/client/components/Dashboard.jsx';
import Quiz from '/client/components/Quiz.jsx';


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
            registerUser: '',
            registerPass: '',
            registerPassTwo: '',
            loginUser: '',
            loginPass: '',
            logged: false,
            tracker: 0,
            score: 0,
            answerList: [],
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
        this.submitCountries = this.submitCountries.bind(this);
        this.countryListText = this.countryListText.bind(this);
        this.onSubmitCountries = this.onSubmitCountries.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.takeQuiz = this.takeQuiz.bind(this);
        this.returnToDash = this.returnToDash.bind(this);
        this.deleteListMember = this.deleteListMember.bind(this);
        this.returnToGrid = this.returnToGrid.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.answerClicker = this.answerClicker.bind(this);
    }
    countryClick(country) {
        this.setState({
            currentCountry: country,
            currentImage: quiz[country].image,
            currentFlag: quiz[country].flag
        })
    }
    answerClicker(e) {
        let clicked = e.target.innerText;
        let tracker = this.state.tracker;
        let score = this.state.score;
        tracker++;
        if (clicked === quiz[this.state.currentCountry].answers[this.state.tracker][0]) {
            score++
            this.setState({tracker: tracker, score: score})
        } else {
            this.setState({tracker: tracker})
        }
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
        if (!this.state.clickedCountries.includes(countryName) && countryName.length < 100) {
            countryList.push(countryName)
            this.setState({ clickedCountries: countryList }, () => {
                console.log(this.state.clickedCountries);
            })
        } else if (countryName.length < 100) {
            let index = this.state.clickedCountries.indexOf(countryName);
            countryList.splice(index, 1);
            this.setState({ clickedCountries: countryList }, () => {
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
                let oneText = country.slice(0, 21);
                let splitText = oneText.split('');
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
    countryListText() {
        let finalStr = '';
        for (let i = 0; i < this.state.clickedCountries.length; i++) {
            if (i === this.state.clickedCountries.length - 1) {
                finalStr += this.state.clickedCountries[i]
            } else {
                finalStr += this.state.clickedCountries[i] + ', '
            }
        }
        return finalStr;
    }
    onSubmitCountries() {
        if (this.state.logged === true) {
            axios.post('/clicked', {userName: this.state.loginUser, clicked: this.state.clickedCountries})
            .then((data) => {
                this.setState({ screen: "clicked" })
            })
        } else {
            this.setState({ screen: "clicked" })
        }
    }
    nextQuestion() {
        let oldTracker = this.state.tracker;
        oldTracker++;
        if (oldTracker <= 10) {
            this.setState({tracker: oldTracker})
        }
    }
    submitCountries() {
        if (this.state.clickedCountries.length > 0) {
            return (
                <div>
                    <h1 className="midTextTwo" id="selected-country-list"><center>
                        {this.countryListText()}
                    </center>
                    </h1>
                    <button className="submitCountries" onClick={this.onSubmitCountries}>Submit</button>
                </div>)
        } else return (
            <center>
                <h1 className="midTextTwo" id="start-text">Which of these countries and territories are you interested in?</h1>
            </center>
        )
    }
    loginUser() {
        axios.post('/login', { userName: this.state.loginUser, password: this.state.loginPass }).then((data) => {
            if (data.data === 'existError') {
                alert('Login Error! Please make sure the UserName and password match.')
            } else {
                this.setState({ screen: 'clicked', logged: true, clickedCountries: data.data});
            }
        })
    }
    registerUser() {
        axios.post('/create', { userName: this.state.registerUser, password: this.state.registerPass, passTwo: this.state.registerPassTwo, clicked: this.state.clickedCountries }).then((data) => {
            console.log(data);
            if (data.data === 'userError') {
                alert('That UserName already exists! Please try a different one.')
            }
            if (data.data === 'created') {
                alert('Account created! Please log in to continue.');
                window.location.reload(false);
            }
            if (data.data === 'passMatchError') {
                alert('Registration Error! Please make sure your passwords match.');
            }
            if (data.data === 'passLengthError') {
                alert('Registration Error! Your password must be at least eight characters long.');
            }
        })
    }
    returnToDash() {
        this.setState({ screen: 'clicked' })
    }
    returnToGrid() {
        this.setState({ screen: 'grid' })
    }
    renderLogin() {
        if (this.state.logged === false) {
            return (
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
            )
        } else {
            return (
                <div className="login">
                    <div>
                        <h1>
                            Logged in as {this.state.loginUser}
                        </h1>
                    </div>
                </div>
            )
        }
    }
    deleteListMember(country) {
        let newIndex = this.state.clickedCountries.indexOf(country);
        let newArr = this.state.clickedCountries;
        newArr.splice(newIndex, 1)
        this.setState({ clickedCountries: newArr }, () => {
            if (this.state.logged === true) {
                axios.post('/clicked', {userName: this.state.loginUser, clicked: this.state.clickedCountries})
            }
        })
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
                            <center>
                                <h1 className="hello">Quistory is a tool for anoyone who is curious about the world around us. Please use it to foster your desire to know about any country or territory in the world, and hopefully lead yourself down a few rabbit holes of history and world culture. Cheers to your curiosity.<br></br><br></br>-------------------------------------------Richard Lee--------------------------------------------</h1>
                            </center>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.screen === "grid") {
            return <div>
                <div className="midText">
                    <div>
                        <div className="interest-text">
                            {this.submitCountries()}
                        </div>
                    </div>
                    <div className="countryGrid">
                        {
                            this.renderFullGrid(251)
                        }
                    </div>
                </div>
            </div>
        } else if (this.state.screen === "login") {
            return (
                <div className="login-screen">
                    <div className="form">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>username</Form.Label>
                                <Form.Control placeholder="UserName" onChange={(e) => { this.setState({ loginUser: e.target.value }) }} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" onChange={(e) => { this.setState({ loginPass: e.target.value }) }} placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                            </Form.Group>
                            <Button variant="primary" onClick={this.loginUser}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="why-register">
                        <center>
                            <h4 className="log-encourage">Log in to access exclusive features such as artifacts, puzzle pieces, achievements, leaderboards, and more!</h4>
                        </center>
                    </div>
                </div>
            )
        } else if (this.state.screen === "create") {
            return (
                <div className="login-screen">
                    <div className="form">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>username</Form.Label>
                                <Form.Control onChange={(e) => { this.setState({ registerUser: e.target.value }) }} placeholder="UserName" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" onChange={(e) => { this.setState({ registerPass: e.target.value }) }} placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>re-enter password</Form.Label>
                                <Form.Control type="password" onChange={(e) => { this.setState({ registerPassTwo: e.target.value }) }} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" onClick={this.registerUser}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="why-register">
                        <center>
                            <h4 className="log-encourage">Log in to access exclusive features such as artifacts, puzzle pieces, achievements, leaderboards, and more!</h4>
                        </center>
                    </div>
                </div>
            )
        } else if (this.state.screen === "clicked") {
            return (
                <Dashboard grid={this.returnToGrid} delete={this.deleteListMember} takeQuiz={this.takeQuiz} countries={this.state.clickedCountries} className="dashboard"></Dashboard>
            )
        } else if (this.state.screen === "logged") {
            return <h1>You are now logged in!</h1>
        } else if (this.state.screen === "quiz") {
            return (
                <div className="full-quiz-div">
                    <Quiz ansCli={this.answerClicker} score={this.state.score} return={this.returnToDash} tracker={this.state.tracker} next={this.nextQuestion} country={this.state.currentCountry} quiz={quiz[this.state.currentCountry]}/>
                </div>
            )
        }
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
    takeQuiz(e) {
        let newCountry = e.nativeEvent.path[2].firstChild.children[1].innerText;
        this.setState({ currentCountry: newCountry, currentFlag: quiz[newCountry].flag, currentImage: quiz[newCountry].image, screen: 'quiz' }, () => {
            console.log('set');
        })
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
                    {this.renderLogin()}
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