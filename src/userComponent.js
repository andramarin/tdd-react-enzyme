'use strict';


import React from 'react';


const UserComponent = (props) => {
  return (
    <div className="user">
      <p className="user__name">Name: { props.name }</p>
      <p className="user__age">Age: { props.age }</p>
    </div>
  );
};


export default UserComponent;
