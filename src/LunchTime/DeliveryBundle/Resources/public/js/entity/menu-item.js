
//MenuItem model
App.MenuItem = DS.Model.extend({
    title: DS.attr('string')
});

App.MenuItem.reopenClass({
    url: '/menu/item'
});