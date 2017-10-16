import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Auth from '../users/Auth';
import LoginForm from './LoginForm';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				username: '',
				password: ''
			},
			success: false,
			error: ''
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.handleUserForm = this.handleUserForm.bind(this);
		this.handleUserLogin = this.handleUserLogin.bind(this);

		UserStore.on(UserStore.eventTypes.LOGIN_USER, this.handleUserLogin);
	}

	onInputChange(e) {
		const target = e.target;
		const field = target.name;
		const value = target.value;

		const user = this.state.user;
		user[field] = value;

		this.setState({
			user
		});
	}

	handleUserLogin(data) {
		let state = {};

		if (data.success) {
			Auth.authenticateUser(data.token);
			Auth.saveUser({username: this.state.user.username});
			state = {success: true};
		} else {
			state = {error: data.message};
		}

		this.setState(state);
	}

	handleUserForm() {
		UserActions.login(this.state.user);
	}

	render() {
		let showError;
		if (this.state.error) {
			showError = (
				<div className="alert alert-danger">
					{this.state.error}
				</div>
			);
		}

		if (this.state.success) {
			 return <Redirect to={'/admin'} />
		}

		return (
			<div className="wrapper">
				{showError}
				<LoginForm
					user={this.state.user}
					error={this.state.error}
					onInputChange={this.onInputChange}
					onSave={this.handleUserForm}
				/>
			</div>
		)
	}
}

export default LoginPage;