import React from 'react/addons';
import Router from 'react-router';
import _ from 'underscore';

import TodoActions from '../actions/actions';

let {Link} = Router;

export default React.createClass({

	propTypes: {
		list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},

	render() {
		let nbrcompleted = _.filter(this.props.list, "isComplete").length,
			nbrtotal = this.props.list.length,
			nbrincomplete = nbrtotal - nbrcompleted,
			clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
			footerClass = React.addons.classSet({hidden: !nbrtotal }),
			completedLabel = "Clear completed (" + nbrcompleted + ")",
			itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";

		return (
			<footer id="footer" className={footerClass}>
				<span id="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
				<ul id="filters">
					<li>
						<Link activeClassName="selected" to="TodoMain" params={{path: "all"}}>All</Link>
					</li>
					<li>
						<Link activeClassName="selected" to="TodoMain" params={{path: "active"}}>Active</Link>
					</li>
					<li>
						<Link activeClassName="selected" to="TodoMain" params={{path: "completed"}}>Completed</Link>
					</li>
				</ul>
				<button id="clear-completed" className={clearButtonClass} onClick={TodoActions.clearCompleted}>{completedLabel}</button>
			</footer>
		);
	}

});
