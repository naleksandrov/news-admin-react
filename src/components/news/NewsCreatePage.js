import React, {Component} from 'react';
import $ from 'jquery';

import NewsActions from '../../actions/NewsActions';
import NewsStore from '../../stores/NewsStore';
import LanguagesActions from '../../actions/LanguagesActions';
import LanguagesStore from '../../stores/LanguagesStore';

import LanguageField from './LanguageField';
import CommonField from './CommonField';

class NewsCreatePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			languages: [],
			form: {
				source: '',
				date: '',
				title: [],
				short_description: [],
				description: []
			},
			message: '',
			error: false
		};

		this.handleLangFetching = this.handleLangFetching.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNewsCreated = this.handleNewsCreated.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		LanguagesStore.on(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
		NewsStore.on(NewsStore.eventTypes.NEWS_CREATED, this.handleNewsCreated);
	}

	componentDidMount() {
		LanguagesActions.getAll();
	}

	componentWillUnmount() {
		LanguagesStore.removeListener(LanguagesStore.eventTypes.LANGUAGES_FETCHED, this.handleLangFetching);
		NewsStore.removeListener(NewsStore.eventTypes.NEWS_CREATED, this.handleNewsCreated);
	}

	handleLangFetching(data) {
		if (data.success) {
			this.setState({
				languages: data.data
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

	handleInputChange(e) {
		let form = this.state.form;
		let target = e.target;
		let value = target.value;
		let name = target.name;

		console.log(target)

		/*form[name] = value;*/

		/*this.setState({
			form: form,
		});*/
	}

	handleSubmit(e) {
		e.preventDefault();

		/*let test = $(e.target).serialize();

		NewsActions.updateNews(test);*/
	}

	render() {

		let message;

		if (this.state.message.length) {
			let asd = this.state.error ? 'alert-danger' : 'alert-success';
			message = <div className={`alert ${asd}`}>
				<a className="close" data-dismiss="alert" aria-label="close">&times;</a>
				{this.state.message}
			</div>;
		}

		const languageFields = this.state.languages.map((val, i) => (
			<fieldset key={val.id}>
				<legend>Език {val.language}</legend>
				<LanguageField
					{...this.state.form[i]}
					number={i}
					onInputChange={this.handleInputChange}
				/>
			</fieldset>
		));

		return (
			<div>
				{message}
				<form onSubmit={this.handleSubmit}>
					<CommonField {...this.state.form[0]} onInputChange={this.handleInputChange} />
					{languageFields}
					<div className="text-center">
						<button type="submit" className="btn btn-primary form-submit">Запазване</button>
					</div>
				</form>
			</div>
		);
	}
}

export default NewsCreatePage;