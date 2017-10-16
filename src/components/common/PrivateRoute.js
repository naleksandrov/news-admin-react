import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import Auth from '../users/Auth';

const PrivateRoute = ({component: Component, ...res}) => {
	return <Route {...res} render={props => Auth.isUserAuthenticated() ? <Component {...props} /> :
		<Redirect to={{pathname: '/admin/users/login', state: { from: props.location }}} />} />
};

export default PrivateRoute;
