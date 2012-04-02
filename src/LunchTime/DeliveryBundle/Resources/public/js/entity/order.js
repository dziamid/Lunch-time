App.Order = App.Model.extend({
    dueDate: DS.attr('date', {key: 'due_date'}),
    dueDateString: function () {
        return this.get('dueDate').toString('d MMMM');
    }.property('dueDate'),
    items: DS.hasMany('App.OrderItem'),
    addItem: function (menuItem) {
        var newItem = this.get('items').findProperty('menuItem', menuItem);
        if (newItem === undefined) {
            newItem = App.OrderItem.createRecord({
                menuItem: menuItem,
                order: this
            });
            this.get('items').pushObject(newItem);
        } else {
            newItem.incAmount();
        }

    },
    removeItem: function (item) {
        if (item.get('amount') > 1) {
            item.decAmount();
        } else {
            this.get('items').removeObject(item);
            item.deleteRecord();
        }
    }
});

App.Order.reopenClass({
    url: '/order'
});