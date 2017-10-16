import React from 'react';
import {Switch, Route} from 'react-router-dom';

import PrivateRoute from '../common/PrivateRoute';
import LoginPage from '../users/LoginPage';
import LogoutPage from '../users/LogoutPage';
import HomePage from '../home/HomePage';
import NewsCreatePage from '../news/NewsCreatePage';
import NewsUpdatePage from '../news/NewsUpdatePage';
import NewsListPage from '../news/NewsListPage';

const NotFoundPage = () => (
		<div><h1>Not Found</h1></div>
);

const Routes = () => (
	<Switch>
		<PrivateRoute exact path="/admin" component={HomePage} />
		<PrivateRoute exact path="/admin/news/list" component={NewsListPage} />
		<PrivateRoute exact path="/admin/news/create" component={NewsCreatePage} />
		<PrivateRoute exact path="/admin/news/edit/:id" component={NewsUpdatePage} />
		<Route path="/admin/users/login" component={LoginPage} />
		<Route path="/admin/users/logout" component={LogoutPage} />
		<PrivateRoute path="*" component={NotFoundPage} />
	</Switch>
);

export default Routes;