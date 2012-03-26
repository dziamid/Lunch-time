
//Menu model
App.Menu = App.Model.extend({
    dueDate: DS.attr('date', {key: 'due_date'}),
    dueDateString: function() {
        return this.get('dueDate').toString('d MMMM');
    }.property('dueDate'),
    items: DS.hasMany('App.MenuItem')
});

App.Menu.reopenClass({
    url: '/menu'
});