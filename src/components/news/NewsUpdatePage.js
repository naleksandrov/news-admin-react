import React, {Component} from 'react';

import NewsActions from '../../actions/NewsActions';
import NewsStore from '../../stores/NewsStore';
import LanguagesActions from '../../actions/LanguagesActions';
import LanguagesStore from '../../stores/LanguagesStore';

import NewsUpdateForm from './NewsUpdateForm';

class NewsUpdatePage extends Component {
	constructor(props) {
		super(props);

		this.newsId = this.props.match.params.id;

		this.state = {
			updatingIndex: null,
			formDefaults: {
				source: '',
				date: '',
				news: []
			},
			form: {
				source: '',
				date: '',
				news: []
			},
			languages: [],
			message: '',
			error: false
		};

		this.handleLangFetching = this.handleLangFetching.bind(this);
		this.handleNewsCreated = this.handleNewsCreated.bind(this);
		this.handleNewsInfoFetched = this.handleNewsInfoFetched.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleNewsUpdated = this.handleNewsUpdated.bind(this);

		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
		NewsStore.on(NewsStore.eventTypes.NEWS_CREATED, this.handleNewsCreated);
		NewsStore.on(NewsStore.eventTypes.NEWS_INFO_FETCHED, this.handleNewsInfoFetched);

		NewsStore.on(NewsStore.eventTypes.NEWS_UPDATED, this.handleNewsUpdated);
	}

	componentDidMount() {
		LanguagesActions.getAll();
	}

	componentWillUnmount() {
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_CREATED, this.handleNewsCreated);
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_INFO_FETCHED, this.handleNewsInfoFetched);

		NewsStore.removeListener(NewsStore.eventTypes.NEWS_UPDATED, this.handleNewsUpdated);
	}



	handleNewsUpdated(data) {
		if (data.success) {
			this.setState({
				updatingIndex: null,
			});
		}
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		const id = target.getAttribute('data-id');
		let form = this.state.form;

		if (name === 'source' || name === 'date') {
			form[name] = value;
		} else {
			form.news[id][name] = value;
		}

		this.setState({form});
	}

	handleFormSubmit(e) {
		e.preventDefault();
		const target = e.target;
		const newsId = target.getAttribute('data-id');
		let form = {};

		if (newsId === this.newsId) {
			let {date, source} = this.state.form;
			let {news_id} = this.state.form.news[0];
			form = {date, source, news_id};
		} else {
			let {title, short_description, description, id} = this.state.form.news[newsId];
			form = {title, short_description, description, id};
		}

		this.setState({
			updatingIndex: newsId
		}, () => {
			NewsActions.updateNews(form);
		});
	}


	handleNewsInfoFetched(data) {
		if (data.success) {
			let obj = {
				source: data.data.source,
				date: data.data.date,
				news: []
			};

			data.data.news.map((val, i) => {
				obj.news.push(Object.assign({}, data.data.news[i]))
			});

			this.setState({
				formDefaults: obj,
				form: {
					source: data.data.source,
					date: data.data.date,
					news: data.data.news
				}
			});
		}
	}

	handleLangFetching(data) {
		if (data.success) {
			this.setState({
				languages: data.data
			}, () => {
				NewsActions.getNewsInfo(this.newsId);
			});
		}
	}

	handleNewsCreated(data) {
		let state = {
			message: data.message
		};

		if (!data.success) {
			state.error = true;
		}

		this.setState(state);

	}

	render() {
		let message, commonField, languageFields;

		if (this.state.message.length) {
			let asd = this.state.error ? 'alert-danger' : 'alert-success';
			message = (
				<div className={`alert ${asd}`}>
					<a className="close" data-dismiss="alert" aria-label="close">&times;</a>
					{this.state.message}
				</div>
			);
		}

		return (

			<div>
				{message}
				<div>
					{this.state.form.news.length ?
						<NewsUpdateForm
							isUpdating={this.state.updatingIndex === this.newsId}
							number={this.state.form.news[0].news_id}
							isCommon={true}
							formDefaults={{source: this.state.formDefaults.source, date: this.state.formDefaults.date}}
							form={{source: this.state.form.source, date: this.state.form.date}}
							handleInputChange={this.handleInputChange}
							formSubmit={this.handleFormSubmit}
						/> : null
					}

					{this.state.form.news.map((val, i) => (
						<fieldset key={val.id}>
							<legend>Език {this.state.languages[i].language}</legend>
							<NewsUpdateForm
								isUpdating={this.state.updatingIndex === i}
								number={i}
								isCommon={false}
								formDefaults={this.state.formDefaults.news[i]}
								form={this.state.form.news[i]}
								handleInputChange={this.handleInputChange}
								formSubmit={this.handleFormSubmit}
							/>
						</fieldset>
					))}
				</div>
			</div>
		);
	}
}

export default NewsUpdatePage;