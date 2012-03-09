
//MenuItem model
App.MenuItem = DS.Model.extend({
    title: DS.attr('string'),
    menu: DS.hasOne('App.Menu', {key: 'menu_id'})
});

App.MenuItem.reopenClass({
    url: '/menu/item'
});