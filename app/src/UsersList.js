import React, { Component } from 'react';
import UserRow from './UserRow.js';

// import { Button } from "@material-ui/core";

class UsersList extends Component {


  render() {
    return (
      <div className="UsersList">
        <div className="header">
          <div className="externalCode">Code</div>
          <div className="name">Name</div>
          <div className="email">Email</div>
          <div className="button">Edit</div>
          <div className="button">Delete</div>
          <div className="clear"></div>
        </div>
          {
            this.props.users.map(user => {
              return (
                <UserRow
                  key = {user.id}
                  id = {user.id}
                  name = {user.name}
                  email = {user.email}
                  external_code = {user.external_code}
                  role = {user.role}
                  tags = {user.tags}
                  onEdit = {this.props.onEdit}
                  onDelete = {this.props.onDelete}
                />
              );
            })
          }
        </div>
  	);
	}
}

export default UsersList;
