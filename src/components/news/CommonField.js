import React from 'react';

const CommonField = (props) => (
	<div className="row">
		<div className="col-sm-6 form-group">
			<label className="form-label" htmlFor="news-source">Източник</label>
			<input type="text" className="form-control" id="news-source" name="source" value={props.source} onChange={props.onInputChange} data-id={0} />
		</div>
		<div className="col-sm-6 form-group">
			<label className="form-label" htmlFor="news-date">Дата</label>
			<input type="text" className="form-control" id="news-date" name="date" value={props.date} onChange={props.onInputChange} data-id={0} />
		</div>
	</div>
);

export default CommonField;