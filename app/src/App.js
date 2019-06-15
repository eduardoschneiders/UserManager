import React, { Component } from 'react';

import './App.css';

import AddUser from './AddUser.js';
import UsersList from './UsersList.js';

const users = []

localStorage.setItem('users', JSON.stringify(users));

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			users: JSON.parse(localStorage.getItem('users'))
		}

		this.onAdd = this.onAdd.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillMount(){
		fetch('http://localhost:5000')
	      	.then(data => data.json())
	      	.then((data) => { 
	      		this.setState({ users: data })
	      	}); 
	}

	getUsers(){
		return this.state.users;
	}

	onAdd(name, email, external_code, role, tags){
		const user = {
			name: name,
			email: email,
			external_code: external_code,
			role: role,
			tags: tags
		}

		fetch('http://localhost:5000/',
			  {
			  	method: "post",
			  	headers: { 'Content-Type':'application/json' },
			  	body: JSON.stringify(user)
			  }
			)
	      	.then(data => data.json())
	      	.then(data => { 
				const users = this.getUsers();
				users.push(data);
				this.setState(users);
	      	}); 
	}

	onEdit(id, external_code, name, email, role, tags){
		let users = this.getUsers();

		let user = users.find(user => {
			return (user.id === id);
		})

		user.external_code = external_code
		user.name = name
		user.email = email
		user.role = role
		user.tags = tags.split(',')


		fetch('http://localhost:5000/' + user.id,
			  {
			  	method: "put",
			  	headers: { 'Content-Type':'application/json' },
			  	body: JSON.stringify(user)
			  }
			)
	      	.then(data => { 
				this.setState(users);
	      	});

	}

	onDelete(id){
		const users = this.getUsers();
		const filteredusers = users.filter(user => {
			return user.id !== id
		});

		fetch('http://localhost:5000/' + id,
			  {
			  	method: "delete",
			  	headers: { 'Content-Type':'application/json' },
			  }
			)
	      	.then(data => { 
				this.setState({ users: filteredusers });
	      	});
	}

  render() {
    return (
    	<div className="App">
			<h1>Users Manager</h1>
			<AddUser
				onAdd={this.onAdd}
			/>

			<UsersList 
				users={this.state.users}
				onEdit={this.onEdit}
				onDelete={this.onDelete}
			/>
		</div>
    );
  }
}

export default App;
