import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';

import TodoListStore from '../stores/store';

let {RouteHandler} = Router;

export default React.createClass({

    mixins: [Reflux.connect(TodoListStore, "list")],

    render() {

        return (
            <div>
                <TodoHeader />
                <RouteHandler list={this.state.list} {...this.props} />
                <TodoFooter list={this.state.list}  />
            </div>
        );
    }
});
