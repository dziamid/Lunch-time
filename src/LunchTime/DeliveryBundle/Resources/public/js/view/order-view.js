App.ActiveOrderView = Em.View.extend({
    orderBinding: 'App.ActiveOrderController.content',
    commit: function () {
        App.store.commit();
    }
});

