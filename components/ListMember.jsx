import React, { useState } from 'react';

function ListMember(props) {
  return (
    <div className="full-list-div">
      <div className="list-left">
        <center>
          <h5 className="delete-item">x</h5>
        </center>
        <li className='list-member-text'>{props.country}</li>
      </div>
      <div className="list-member">
        <h5 className="list-score">0/10</h5>
        <button className="quiz-button" onClick={props.takeQuiz}>Take the quiz!</button>
      </div>
    </div>
  )
}

export default ListMember;