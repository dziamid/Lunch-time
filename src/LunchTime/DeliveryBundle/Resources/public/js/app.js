var App = Em.Application.create();
App.store = DS.Store.create({
    adapter: DS.RESTAdapter.create({ bulkCommit: false })
});

App.Menu = DS.Model.extend({
    dueDate: DS.attr('date'),
    items: DS.hasMany('App.MenuItem')
});

App.MenuItem = DS.Model.extend({
    title: DS.attr('string')
});

var menus = App.store.findAll(App.Menu);
var items = App.store.findAll(App.MenuItem);

App.MyView = Em.View.extend({
  menus: menus
});
