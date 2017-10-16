import React, {Component} from 'react';

import LanguageField from './LanguageField';
import CommonField from './CommonField';
import LanguagesStore from '../../stores/LanguagesStore';

const NewsUpdateForm = (props, asd) => {
	let lastModified = LanguagesStore.lastModified;

	const field = props.isCommon ?
			<CommonField {...props.form} onInputChange={props.handleInputChange} /> :
			<LanguageField number={props.number} {...props.form} onInputChange={props.handleInputChange} />;

	const showButton = JSON.stringify(props.formDefaults) === JSON.stringify(props.form) ? 'collapse' : '';
	const updating = props.isUpdating ? <span className="loader"/> : '';

	return (
		<form onSubmit={props.formSubmit} data-id={props.number}>
			{field}
			<div className={`text-center button-container ${showButton}`}>
				<button type="submit" className="btn btn-primary form-submit">Обновяване {updating}</button>
			</div>
		</form>
	);
};

export default NewsUpdateForm;