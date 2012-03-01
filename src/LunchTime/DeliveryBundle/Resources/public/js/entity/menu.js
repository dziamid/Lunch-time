
//Menu model
App.Menu = DS.Model.extend({
    dueDate: DS.attr('date', {key: 'due_date'}),
    dueDateString: function() {
        return this.get('dueDate').toString('d MMMM');
    }.property('dueDate'),
    items: DS.hasMany('App.MenuItem', {
        embedded: true
    })
});

App.Menu.reopenClass({
    url: '/menu'
});