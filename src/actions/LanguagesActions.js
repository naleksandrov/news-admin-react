import dispatcher from '../dispatcher';

class LanguagesActions {
	static getAll() {
		dispatcher.dispatch({
			type: 'FETCH_ALL_LANGS',
		});
	}
}

export default LanguagesActions;