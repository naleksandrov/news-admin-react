import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

import LanguagesData from '../data/LanguagesData';

class LanguagesStore extends EventEmitter {
	constructor(props) {
		super(props);

		this.languages = [];
	}

	getAll() {
		return this.languages;
	}

	fetchAll() {
		LanguagesData.getAll().then(result => {
			this.languages = result.data;
			this.emit(this.eventTypes.LANGUAGES_FETCHED, result);
		});
	}

	handleAction(action) {
		switch (action.type) {
			case 'FETCH_ALL_LANGS':
				this.fetchAll();
				break;
			default:
				break;
		}
	}
}

let languagesStore = new LanguagesStore();

languagesStore.eventTypes = {
	LANGUAGES_FETCHED: 'languages_fetched',
};

dispatcher.register(languagesStore.handleAction.bind(languagesStore));
export default languagesStore;