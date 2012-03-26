
//MenuItem model
App.MenuItem = App.Model.extend({
    title: DS.attr('string'),
    menu: DS.hasOne('App.Menu', {key: 'menu'})
});

App.MenuItem.reopenClass({
    url: '/menu/item'
});