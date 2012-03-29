App.ActiveOrderView = Em.View.extend({
    orderBinding: 'App.ActiveOrderController.content',
    commit: function () {
        App.store.commit();
    }
});

App.OrderItemView = Em.View.extend({
    item: null,

    remove: function () {
        var item = this.get('item');
        var order = item.get('order');
        order.removeItem(item);
    }
});