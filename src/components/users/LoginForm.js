import React from 'react';

const LoginForm = (props) => (
	<form className="form-signin" method="POST" autoComplete="off">
		<h2 className="form-signin-heading">Please login</h2>
		<input
			type="text"
			className="form-control"
			name="username"
			value={props.user.username}
			placeholder="Username"
			autoComplete="off"
			onChange={props.onInputChange}
		/>
		<input
			type="password"
			className="form-control"
			name="password"
			value={props.user.password}
			placeholder="Password"
			autoComplete="off"
			onChange={props.onInputChange}
		/>
		<button type="button" className="btn btn-lg btn-primary btn-block" onClick={props.onSave}>Login</button>
	</form>
);

export default LoginForm;