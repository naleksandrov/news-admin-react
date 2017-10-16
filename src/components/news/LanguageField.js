import React from 'react';

const LanguageField = (props) => (
	<div>
		<div className="form-group">
			<label className="form-label" htmlFor={`news-title${props.number}`}>Заглавие</label>
			<input type="text" className="form-control" id={`news-title${props.number}`} name="title"
			       value={props.title} onChange={props.onInputChange} data-id={props.number}
			/>
		</div>
		<div className="row">
			<div className="col-md-6 form-group">
				<label className="form-label" htmlFor={`news-short-description${props.number}`}>Кратко описание</label>
				<textarea className="form-control" id={`news-short-description${props.number}`} name="short_description"
				          value={props.short_description} onChange={props.onInputChange} data-id={props.number}
				/>
			</div>
			<div className="col-md-6 form-group">
				<label className="form-label" htmlFor={`news-description${props.number}`}>Дълго описание</label>
				<textarea className="form-control" id={`news-description${props.number}`} name="description"
				          value={props.description} onChange={props.onInputChange} data-id={props.number}
				/>
			</div>
		</div>
	</div>
);

export default LanguageField;