import React from 'react';
import Router from 'react-router';
import TodoActions from '../actions/actions';
import TodoItem from './TodoItem';
import _ from 'underscore';

export default React.createClass({

	mixins: [Router.State],

	propTypes: {
		list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},

	toggleAll(evt) {
		TodoActions.toggleAllItems(evt.target.checked);
	},

    render() {
    	let filteredList;
    	switch(this.getParams().path){
    		case 'all':
    			filteredList = this.props.list;
    			break;
    		case 'completed':
    			filteredList = _.filter(this.props.list, function(item){ return item.isComplete; });
    			break;
    		case 'active':
    			filteredList = _.filter(this.props.list, function(item){ return !item.isComplete; });
    	}

    	let classes = React.addons.classSet({
    		"hidden": this.props.list.length < 1
    	});

        return (
			<section id="main" className={classes}>
				<input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<ul id="todo-list">
					{ 
						filteredList.map(function(item){
							return <TodoItem label={item.label} isComplete={item.isComplete} key={item.key} id={item.key} />; 
						})
					}
				</ul>
			</section>
        );
    }
});
