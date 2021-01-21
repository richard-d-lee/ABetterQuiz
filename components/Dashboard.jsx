import React, { useState } from 'react';
import ListMember from './ListMember.jsx'

function Dashboard(props) {
  return (
    <div className="dashboard">
      <center>
      <h1 className="quiz-header">Your Quizzes</h1>
      </center>
      <ul className="quiz-list">
        {props.countries.map((listCountry) => {
          return <ListMember country={listCountry} />
        })}
      </ul>
    </div>
  )
}

export default Dashboard;