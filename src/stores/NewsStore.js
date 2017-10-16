import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import NewsData from '../data/NewsData';

class NewsStore extends EventEmitter {
	constructor(props) {
		super(props);

		this.lastModified = {};
	}
	getAll(data) {
		NewsData.getAll(data.page, data.limit, data.currentLanguage).then((result) => {
			this.emit(this.eventTypes.NEWS_FETCHED, result);
		});
	}

	getNewsDetails(data) {
		NewsData.getNewsDetails(data.newsId, data.currentLanguage).then((result) => {
			this.emit(this.eventTypes.NEWS_DETAILS_FETCHED, result);
		});
	}

	getNewsCount(langId) {
		NewsData.getNewsCount(langId).then((result) => {
			this.emit(this.eventTypes.NEWS_COUNT_FETCHED, result);
		});
	}

	getNewsInfo(newsId) {
		NewsData.getNewsInfo(newsId).then((result) => {
			this.emit(this.eventTypes.NEWS_INFO_FETCHED, result);
		});
	}

	createNews(data) {
		NewsData.createNews(data).then((result) => {
			this.emit(this.eventTypes.NEWS_CREATED, result);
		});
	}

	updateNews(data) {
		NewsData.updateNews(data).then((result) => {
			this.lastModified = data;
			this.emit(this.eventTypes.NEWS_UPDATED, result);
		});
	}

	handleAction(action) {
		switch (action.type) {
			case 'GET_ALL_NEWS':
				this.getAll(action.data);
				break;
			case 'GET_NEWS_DETAILS':
				this.getNewsDetails(action.data);
				break;
			case 'GET_NEWS_INFO':
				this.getNewsInfo(action.newsId);
				break;
			case 'GET_NEWS_COUNT':
				this.getNewsCount(action.data);
				break;
			case 'CREATE_NEWS':
				this.createNews(action.data);
				break;
			case 'UPDATE_NEWS':
				this.updateNews(action.data);
				break;
			default:
				break;
		}
	}
}

let newsStore = new NewsStore();

newsStore.eventTypes = {
	NEWS_FETCHED: 'news_fetched',
	NEWS_DETAILS_FETCHED: 'news_details_fetched',
	NEWS_COUNT_FETCHED: 'news_count_fetched',
	NEWS_CREATED: 'news_created',
	NEWS_UPDATED: 'news_updated',
	NEWS_INFO_FETCHED: 'news_info_fetched',
};

dispatcher.register(newsStore.handleAction.bind(newsStore));
export default newsStore;