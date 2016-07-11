'use strict';


import React from 'react';
import UserComponent from './userComponent';
const request = require('request');


class UsersListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: []
    };
  }

  componentDidMount() {
    request('https://api.github.com/users', (err, res) => {
      if (!err && res.statusCode === 200) {
        this.setState({
          usersList: res.slice(0)
        });
      }
      else {
        console.log(err);
      }
    });
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
    return this.state.usersList.map((user, index) => {
      return (
        <UserComponent
              key={ index }
              name={ user.name }
              age={ user.age } />
      );
    });
  }
};


export default UsersListComponent;
