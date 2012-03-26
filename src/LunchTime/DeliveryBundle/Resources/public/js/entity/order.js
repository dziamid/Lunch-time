
App.Order = App.Model.extend({
    dueDate: DS.attr('date', {key: 'due_date'}),
    dueDateString: function() {
        return this.get('dueDate').toString('d MMMM');
    }.property('dueDate'),
    items: DS.hasMany('App.OrderItem')
});

App.Order.reopenClass({
    url: '/order'
});