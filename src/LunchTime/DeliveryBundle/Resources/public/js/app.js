window.App = Ember.Application.create({
    ready: function () {

        App.store = DS.Store.create({
            adapter: DS.SymfonyAdapter.create()
        });

        App.setPath('MenuController.content', App.store.findQuery(App.Menu, 'homepageList'));
        //App.setPath('OrderController.content',App.store.findAll(App.Order));
        App.setPath('OrderController.active', App.store.createRecord(App.Order));
    }
});


