window.App = Ember.Application.create({
    ready: function () {

        var menus = App.store.findAll(App.Menu);
        App.get('MenuController').set('content', menus);

        var orders = App.store.findAll(App.Order);
        App.get('OrderController').set('content', orders);

    }
});

App.store = DS.Store.create({
    adapter: DS.SymfonyAdapter.create()
});