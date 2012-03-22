window.App = Ember.Application.create({
    ready: function () {

        App.store = DS.Store.create({
            adapter: DS.SymfonyAdapter.create()
        });

        App.store.findAll(App.MenuItem);
        App.setPath('MenuController.content', App.store.findQuery(App.Menu, 'homepageList'));

        //App.store.findAll(App.OrderItem);
        //App.setPath('OrderController.content', App.store.findQuery(App.Order, 'homepageList'));
        //App.setPath('OrderController.active', App.store.createRecord(App.Order));
        //App.setPath('CalendarController.activeDate', Date.parse('2012-03-14'));
    }
});


