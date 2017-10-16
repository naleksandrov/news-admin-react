import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Auth from './Auth';

class LogoutPage extends Component {
	componentWillMount() {
		Auth.deauthenticateUser();
		Auth.removeUser();
	}

	render() {
		return <Redirect to={'/admin/users/login'} />;
	}
}

export default LogoutPage;