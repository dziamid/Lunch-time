window.App = Ember.Application.create({
    ready: function () {

        App.store = DS.Store.create({
            adapter: DS.SymfonyAdapter.create()
        });

        App.set('MenuList', App.store.findQuery(App.Menu, 'homepageList'));

        App.get('MenuController').set('content', App.get('MenuList'));

        var orders = App.store.findAll(App.Order);
        App.get('OrderController').set('content', orders);

    }
});


