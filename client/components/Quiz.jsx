import React, { useState } from 'react';

//make it stateful?

function Quiz(props) {
  console.log('tracker, ', props.tracker)
  let questions = props.quiz.questions;
  let answers = props.quiz.answers;
  if (questions[props.tracker] === undefined && props.tracker !== 10) {
    return <div><h1>This quiz has not been built yet!</h1></div>
  }
  let answerRandomizer = (array) => {
    let newArr = array.slice();
    let size = 4;
    let finalArr = [];
    while (size > 0) {
      let index = Math.floor(Math.random() * size)
      finalArr.push(newArr[index]);
      newArr.splice(index, 1);
      size--;
    }
    return finalArr;
  }
  let questionMaker = (tracker) => {
    if (questions[props.tracker].length > 60) {
      return <h4>{questions[props.tracker]}</h4>
    } else {
      return <h3>{questions[props.tracker]}</h3>
    }
  }
  if (props.tracker === 10) {
    if (props.score < 3) {
      return <div className="score"><h1>Oh no! You only scored {props.score} out of 10!</h1></div>
    } else if (props.score > 7) {
      return <div className="score"><h1>Great job! You scored {props.score} out of 10!</h1></div>
    } else if (props.score === 10) {
      return <div className="score"><h1>Perfect! You scored {props.score} out of 10!</h1></div>
    } else return <div className="score"><h1>{props.score} out of 10!</h1></div>
  } else return (
    <div className="quizPage">
      <div className="quiz">
        <h4 className="question">
          <center>
            {questionMaker()}
          </center>
        </h4>
        <center>
          <div className="all-answers">
            {answerRandomizer(answers[props.tracker]).map((answer) => {
              if (answer.length > 40) {
                return (<h4 className="answers" onClick={props.ansCli}><center>{answer}</center></h4>)
              } else {
                return (<h3 className="answers" onClick={props.ansCli}><center>{answer}</center></h3>)
              }
            })}
          </div>
        </center>
      </div>
      <div className="all-features">
        <div className="art-achieve">
          <center>
            <h1 className="quiz-feature" onClick={props.return}>return to your quizzes</h1>
          </center>
          <center>
            <h1 className="quiz-feature" onClick={props.next}>your previous answers</h1>
          </center>
          </div>
          <div className="lead-profile">
          <center>
            <h1 className="quiz-feature">artifacts from {props.country}</h1>
          </center>
          <center>
            <h1 className="quiz-feature">achievements related to {props.country}</h1>
          </center>
        </div>
      </div>
    </div>
  )
}

export default Quiz;