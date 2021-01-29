import React, { useState } from 'react';

function Quiz(props) {
  console.log('tracker, ', props.tracker)
  let questions = props.quiz.questions;
  let answers = props.quiz.answers;
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
  return (
    <div className="quizPage">
      <div className="quiz">
        <h4 className="question">
          <center>
            {questions[props.tracker]}
          </center>
        </h4>
        <h4>quiztime</h4>
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