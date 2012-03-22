window.App = Ember.Application.create({
    ready: function () {

        App.store = DS.Store.create({
            adapter: DS.SymfonyAdapter.create(),
            revision: 3
        });

        App.store.findAll(App.MenuItem);

        var menus = App.store.findQuery(App.Menu, 'homepageList');
        App.get('MenuController').set('content', menus);
        App.store.registerModelArray(menus, App.Menu);

        App.set('MenuList', App.store.findAll(App.Menu));

        //App.store.findAll(App.OrderItem);
        //App.setPath('OrderController.content', App.store.findQuery(App.Order, 'homepageList'));
        //App.setPath('OrderController.active', App.store.createRecord(App.Order));
        //App.setPath('CalendarController.activeDate', Date.parse('2012-03-14'));
    }
});


