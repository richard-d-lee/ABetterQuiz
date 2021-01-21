import React, { useState } from 'react';

function ListMember(props) {
  return (
    <div className="list-member">
      <li className='list-member-text'>{props.country}</li>
      <button>Take the quiz!</button>
    </div>
  )
}

export default ListMember;