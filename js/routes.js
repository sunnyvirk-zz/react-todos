import React from 'react';
import Router from 'react-router';
import TodoApp from './components/TodoApp';
import TodoMain from './components/TodoMain';

let { Route, Redirect } = Router;

let routes = (
	<Route handler={TodoApp} path="/">
		<Route name="TodoMain" path="/:path" handler={TodoMain} />
		<Redirect from="/" to="TodoMain" params={{path: 'all'}} />
	</Route>
);

export default routes;
