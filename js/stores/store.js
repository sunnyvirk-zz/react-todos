import Reflux from 'reflux';
import _ from 'underscore';
import TodoActions from '../actions/actions';

let todoCounter = 0;
let localStorageKey = "todos";

let getItemByKey = (list,itemKey) => {
    return _.find(list, function(item) {
        return item.key === itemKey;
    });
};

export default Reflux.createStore({

    listenables: [TodoActions],

    onAddItem(label) {
        this.updateList([{
        	key: todoCounter++,
        	created: new Date(),
        	isComplete: false,
        	label: label
        }].concat(this.list));
    },

    onRemoveItem(itemKey) {
        this.updateList(_.filter(this.list,function(item){
            return item.key!==itemKey;
        }));
    },

    onToggleItem(itemKey) {
        var foundItem = getItemByKey(this.list,itemKey);
        if (foundItem) {
            foundItem.isComplete = !foundItem.isComplete;
            this.updateList(this.list);
        }
    },

    onEditItem(itemKey, newLabel) {
        var foundItem = getItemByKey(this.list,itemKey);
        if (!foundItem) {
            return;
        }
        foundItem.label = newLabel;
        this.updateList(this.list);
    },

    onToggleAllItems(checked) {
        this.updateList(_.map(this.list, function(item) {
            item.isComplete = checked;
            return item;
        }));
    },

    updateList(list){
        localStorage.setItem(localStorageKey, JSON.stringify(list));
        this.list = list;
        this.trigger(list);
    },

    onClearCompleted() {
        this.updateList(_.filter(this.list, function(item) {
            return !item.isComplete;
        }));
    },

	getInitialState() {
		let loadedList = localStorage.getItem(localStorageKey);

		if (!loadedList) {
			this.list = [{
				key: todoCounter++,
				created: new Date(),
				isComplete: false,
				label: 'Rule the web'
			}];
		} else {
			this.list = _.map(JSON.parse(loadedList), function(item) {
				item.key = todoCounter++;
				return item;
			});
		}
		return this.list;
	}

});
