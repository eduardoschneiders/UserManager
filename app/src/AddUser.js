import React, { Component } from 'react';
// import IconButton  from '@material-ui/core';
import { Button } from "@material-ui/core";

import './AddUser.css'
class AddUser extends Component {

  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();

    this.props.onAdd(
      this.nameInput.value,
      this.emailInput.value,
      this.externalCodeInput.value,
      this.roleInput.value,
      this.tagsInput.value
    );

    this.nameInput.value = '';
    this.emailInput.value = '';
    this.externalCodeInput.value = '';
    this.roleInput.value = '';
    this.tagsInput.value = '';
  }
	
  render() {
    return (
			<form className="AddUser" onSubmit={this.onSubmit}>
        <div className="header">Add user</div>
        <input
          placeholder="Name"
          ref={nameInput => this.nameInput = nameInput}
        />

        <input
          placeholder="Email"
          ref={emailInput => this.emailInput = emailInput}
        />

        <input
          placeholder="External code"
          ref={externalCodeInput => this.externalCodeInput = externalCodeInput}
        />

        <input
          placeholder="Role"
          ref={roleInput => this.roleInput = roleInput}
        />

        <input
          placeholder="Tags"
          ref={tagsInput => this.tagsInput = tagsInput}
        />

        <Button type="submit">
          Create
        </Button>
  		</form>  
  	);
	}
}

export default AddUser;
