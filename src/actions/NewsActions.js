import dispatcher from '../dispatcher';

class NewsActions {
	static getAll(data) {
		dispatcher.dispatch({
			type: 'GET_ALL_NEWS',
			data
		});
	}

	static getNewsDetails(data) {
		dispatcher.dispatch({
			type: 'GET_NEWS_DETAILS',
			data
		});
	}

	static getNewsInfo(newsId) {
		dispatcher.dispatch({
			type: 'GET_NEWS_INFO',
			newsId
		});
	}

	static getNewsCount(langId) {
		dispatcher.dispatch({
			type: 'GET_NEWS_COUNT',
			langId
		});
	}

	static createNews(data) {
		dispatcher.dispatch({
			type: 'CREATE_NEWS',
			data
		});
	}

	static updateNews(data) {
		dispatcher.dispatch({
			type: 'UPDATE_NEWS',
			data
		});
	}
}

export default NewsActions;