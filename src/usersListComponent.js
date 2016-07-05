'use strict';


import React from 'react';
import UserComponent from './userComponent';
require('es6-promise').polyfill();
require('isomorphic-fetch');


class UsersListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: []
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(res => {
        this.setState({
          usersList: res.slice(0)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.usersList.length) {
      return null;
    }

    return (
      <div className="users-list">
        { this._constructUsersList() }
      </div>
    );
  }

  _constructUsersList() {
    return this.state.usersList.map((user) => {
      return (
        <UserComponent
              name={ user.name }
              age={ user.age } />
      );
    });
  }
};


export default UsersListComponent;
