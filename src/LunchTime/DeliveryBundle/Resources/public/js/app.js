window.App = Ember.Application.create();

App.store = DS.Store.create({
    adapter: DS.SymfonyAdapter.create()
});