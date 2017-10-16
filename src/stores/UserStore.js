import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

import UserData from '../data/UserData';

class UserStore extends EventEmitter {
	changeSelected(id) {
		this.selected = id;
		this.countryCode = this.languages[id - 1].country_code;
		this.emit(this.eventTypes.LANGUAGE_CHANGED);
	}

	loginUser(user) {
		UserData.login(user).then(result => {
			this.emit(this.eventTypes.LOGIN_USER, result);
		});
	}

	handleAction(action) {
		switch (action.type) {
			case 'LOGIN_USER':
				this.loginUser(action.user);
				break;
			default:
				break;
		}
	}
}

let userStore = new UserStore();

userStore.eventTypes = {
	LOGIN_USER: 'login_user',
};

dispatcher.register(userStore.handleAction.bind(userStore));
export default userStore;