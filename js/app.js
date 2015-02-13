import '6to5/polyfill';
import '6to5/runtime';
import React from 'react';
import Router from 'react-router';
import Routes from './routes';

Router.run(Routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('todoapp'));
});
