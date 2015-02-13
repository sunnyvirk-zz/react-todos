import React from 'react/addons';
import TodoActions from '../actions/actions';

export default React.createClass({
	propTypes: {
        label: React.PropTypes.string.isRequired,
        isComplete: React.PropTypes.bool.isRequired,
        key: React.PropTypes.number,
        id: React.PropTypes.number
    },

	mixins: [React.addons.LinkedStateMixin],

    getInitialState() {
        return {};
    },

    handleToggle() {
    	TodoActions.toggleItem(this.props.id);
    },

    handleDestroy() {
        TodoActions.removeItem(this.props.id);
    },

    handleEditStart(evt) {
        evt.preventDefault();
        this.setState({
            isEditing: true,
            editValue: this.props.label
        }, function() {
            this.refs.editInput.getDOMNode().focus();
        });
    },

    handleValueChange(evt) {
        let text = this.state.editValue;
        if (evt.which === 13 && text) {
            this.refs.editInput.getDOMNode().blur();
        }
        else if (evt.which === 27) {
            this.setState({ isEditing: false },function(){
                this.refs.editInput.getDOMNode().blur();
            });
        }
    },

    handleBlur() {
        let text = this.state.editValue;
        if (this.state.isEditing && text) {
            TodoActions.editItem(this.props.id, text);
        }
        this.setState({isEditing:false});
    },

	render() {
		let classes = React.addons.classSet({
            'completed': this.props.isComplete,
            'editing': this.state.isEditing
        });

        return (
            <li className={classes}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={!!this.props.isComplete} onChange={this.handleToggle} />
                    <label onDoubleClick={this.handleEditStart}>{this.props.label}</label>
                    <button className="destroy" onClick={this.handleDestroy}></button>
                </div>
                <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handleValueChange} onBlur={this.handleBlur} />
            </li>
        );
	}

});
