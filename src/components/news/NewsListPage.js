import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import Pagination from 'react-js-pagination';

import NewsActions from '../../actions/NewsActions';
import NewsStore from '../../stores/NewsStore';
import LanguagesActions from '../../actions/LanguagesActions';
import LanguagesStore from '../../stores/LanguagesStore';


class NewsListPage extends Component {
	constructor(props) {
		super(props);

		const query = queryString.parse(this.props.location.search);
		const page = Number(query.page) || 1;
		const language = Number(query.lang) || 1;

		this.state = {
			news: [],
			newsCount: 0,
			page: page,
			limit: 10,
			languages: [],
			currentLanguage: language
		};

		this.handleNewsFetching = this.handleNewsFetching.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleNewsCountFetching = this.handleNewsCountFetching.bind(this);
		this.handleLangFetching = this.handleLangFetching.bind(this);
		this.changeLanguage = this.changeLanguage.bind(this);

		NewsStore.on(NewsStore.eventTypes.NEWS_FETCHED, this.handleNewsFetching);
		NewsStore.on(NewsStore.eventTypes.NEWS_COUNT_FETCHED, this.handleNewsCountFetching);
		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
	}

	componentDidMount() {
		this.getNewsCount();
		LanguagesActions.getAll();
	}

	componentWillUnmount() {
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_FETCHED, this.handleNewsFetching);
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_COUNT_FETCHED, this.handleNewsCountFetching);
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
	}

	handleLangFetching(data) {
		if (data.success) {
			this.setState({
				languages: data.data
			});
		}
	}

	getAllNews() {
		let {page, limit, currentLanguage} = this.state;
		let data = {
			page,
			limit,
			currentLanguage
		};
		NewsActions.getAll(data);
	}

	getNewsCount() {
		let {currentLanguage} = this.state;

		NewsActions.getNewsCount(currentLanguage);
	}

	changeLanguage(e) {
		this.setState({
			currentLanguage: e.target.value
		}, () => {
			this.getAllNews();
		});
	}

	handleNewsFetching(data) {
		if (data.success) {
			this.setState({
				news: data.data
			});
		}
	}

	handleNewsCountFetching(data) {
		if (data.success) {
			this.setState({
				newsCount: data.data[0].count
			}, () => {
				this.getAllNews();
			});
		}
	}

	handlePageChange(page) {
		this.setState({
			page: page
		}, () => {
			this.props.history.push(`/admin/news/list?page=${page}&lang=${this.state.currentLanguage}`);
			this.getAllNews();
		});
	}

	handleNewsDelete(id) {
		console.log(id);
	}

	render() {
		let pagination;
		const news = this.state.news.map((news) => (
			<tr key={news.id}>
				<td>{news.id}</td>
				<td dangerouslySetInnerHTML={{__html: news.title}} />
				<td dangerouslySetInnerHTML={{__html: news.short_description}} />
				<td>{news.date}</td>
				<td>
					<Link to={`/admin/news/edit/${news.id}`} className="news-update">
						<i className="fa fa-pencil fa-lg" />
					</Link>
					<a className="news-delete" onClick={this.handleNewsDelete.bind(this, news.id)}>
						<i className="fa fa-trash fa-lg" />
					</a>
				</td>
			</tr>
		));

		if (this.state.newsCount) {
			pagination = (
				<Pagination
					innerClass="pagination"
					activePage={this.state.page}
					itemsCountPerPage={this.state.limit}
					totalItemsCount={this.state.newsCount}
					pageRangeDisplayed={this.state.limit}
					onChange={this.handlePageChange}
				/>
			);
		}

		const languages = this.state.languages.map((lang) => {
			return (
				<option key={lang.id} value={lang.id}>
					{lang.language}
				</option>
			);
		});

		return (
			<div>
				<div className="collapse">
					<div id="dialog" title="Изтриване">
						Сигурни ли сте че искате да изтриете тази новина
					</div>​
				</div>
				<div className="news-list">
					<div className="form-group clearfix">
						<Link to={'/admin/news/create'} className="btn btn-primary">
							Добавяне
						</Link>
						<div className="pull-right">
							<select className="form-control change-lang" onChange={this.changeLanguage} value={this.state.currentLanguage}>
								{languages}
							</select>
						</div>
					</div>
					<table className="table table-bordered table-striped">
						<thead>
							<tr>
								<th>id</th>
								<th>Новина</th>
								<th>Кратко описание</th>
								<th>Дата</th>
								<th>Действия</th>
							</tr>
						</thead>
						<tbody>
						{news}
						</tbody>
					</table>
					<nav className="pull-right">
						{pagination}
					</nav>
				</div>
			</div>
		);
	}
}

export default NewsListPage;