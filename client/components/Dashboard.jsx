import React, { useState } from 'react';
import ListMember from './ListMember.jsx'

function Dashboard(props) {
  return (
    <div className="full-dash">
      <div className="dashboard">
        <center>
          <h1 className="quiz-header">Your Quizzes</h1>
        </center>
        <ul className="quiz-list">
          {props.countries.map((listCountry) => {
            return (
              <ListMember delete={props.delete} takeQuiz={props.takeQuiz} country={listCountry} />
            )
          })}
        </ul>
        <div><center><button onClick={props.grid}>Add More Countries!</button></center></div>
      </div>
      <div className="dash-grid">
        <div className="art-achieve">
          <h1 className="feature">achievements</h1>
          <h1 className="feature">artifacts</h1>
        </div>
        <div className="lead-profile">
          <h1 className="feature">leaderboard</h1>
          <h1 className="feature">puzzle</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;