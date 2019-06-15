import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import './UserRow.css';

class UserRow extends Component {
	constructor(props){
		super(props);

		this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      editMode: false
    }
	}

  onEdit(){
    this.setState({ editMode: true })
  }

  onEditSubmit(event){
    event.preventDefault();
    this.setState({ editMode: false })
    this.props.onEdit(
      this.props.id,
      this.external_codeInput.value,
      this.nameInput.value,
      this.emailInput.value,
      this.roleInput.value,
      this.tagsInput.value,
    );
  }
  
  onDelete(){
    this.props.onDelete(this.props.id)
  }

  render() {
  	const { name, email, external_code, role, tags } = this.props;

    return (
      <div>
        {
          this.state.editMode ? (
            <div>
              <form onSubmit={this.onEditSubmit}>
                <h3>Edit item</h3>
                <input
                  placeholder="External code"
                  ref={external_codeInput => this.external_codeInput = external_codeInput}
                  defaultValue={external_code}
                />

                <input
                  placeholder="Name"
                  ref={nameInput => this.nameInput = nameInput}
                  defaultValue={name}
                />
                
                <input
                  placeholder="Email"
                  ref={emailInput => this.emailInput = emailInput}
                  defaultValue={email}
                />

                <input
                  placeholder="Role"
                  ref={roleInput => this.roleInput = roleInput}
                  defaultValue={role}
                />

                <input
                  placeholder="Tags"
                  ref={tagsInput => this.tagsInput = tagsInput}
                  defaultValue={tags.join(', ')}
                />

                <Button>Save</Button>
                <hr />
              </form>  
            </div>
          ) : (
            <div className="mainRow">
              <div className="externalCode">{external_code}</div>
              <div className="name">{name}</div>
              <div className="email">{email}</div>
              <div className="button"><Button onClick={this.onEdit}>Edit</Button></div>
              <div className="button"><Button onClick={this.onDelete}>Delete</Button></div>
              <div className="clear"></div>
            </div>
          )
        }
			</div>
    );
	}
}

export default UserRow;
