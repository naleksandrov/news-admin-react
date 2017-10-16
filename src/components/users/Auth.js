class Auth {
	static authenticateUser(token) {
		window.localStorage.setItem('token', token);
	}

	static deauthenticateUser() {
		window.localStorage.removeItem('token');
	}

	static isUserAuthenticated() {
		return window.localStorage.getItem('token') !== null;
	}

	static getToken() {
		return window.localStorage.getItem('token');
	}

	static saveUser(user) {
		window.localStorage.setItem('user', JSON.stringify(user));
	}

	static getUser() {
		const user = window.localStorage.getItem('user');
		return JSON.parse(user);
	}

	static removeUser() {
		window.localStorage.removeItem('user');
	}
}

export default Auth;