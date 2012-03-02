App.OrderController = Ember.ArrayProxy.create({
    content: App.store.findAll(App.Order)
});