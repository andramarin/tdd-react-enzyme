'use strict';


import React from 'react';
import UserComponent from './userComponent';
import request from 'superagent';


class UsersListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: []
    };
  }

  componentDidMount() {
    request
      .get('https://api.github.com/users')
      .end((err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        this.setState({
          usersList: res.body.slice(0)
        });
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
