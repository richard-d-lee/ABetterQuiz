import React, { useState } from 'react';

function Quiz(props) {
  return (
    <div className="quizPage">
      <div className="quiz"></div>
      <div className="all-features">
        <div className="art-achieve">
          <center>
            <h1 className="quiz-feature">return to your quizzes</h1>
          </center>
          <center>
            <h1 className="quiz-feature">your previous answers</h1>
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