window.App = Ember.Application.create({
    ready: function () {

        App.store = DS.Store.create({
            adapter: DS.SymfonyAdapter.create()
        });

        App.setPath('MenuController.content', App.store.findQuery(App.Menu, 'homepageList'));
        App.setPath('OrderController.active', App.store.createRecord(App.Order));
        App.setPath('CalendarController.activeDate', Date.parse('2012-03-04'));
    }
});


