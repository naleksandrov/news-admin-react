import dispatcher from '../dispatcher';

class UserActions {
	static login(user) {
		dispatcher.dispatch({
			type: 'LOGIN_USER',
			user
		});
	}
}

export default UserActions;