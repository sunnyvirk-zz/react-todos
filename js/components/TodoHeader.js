import React from 'react';
import TodoActions from '../actions/actions';

export default React.createClass({

	handleValueChange(evt) {
		let text = evt.target.value;
		if (evt.which === 13 && text) {
			TodoActions.addItem(text);
			evt.target.value = '';
		} else if (evt.which === 27) {
			evt.target.value = '';
		}
	},

	render() {
		return (
			<header id="header">
				<h1>todos</h1>
				<input id="new-todo" placeholder="What needs to be done?" autoFocus onKeyUp={this.handleValueChange} />
			</header>
		);
	}

});
