App.ActiveMenuView = Em.View.extend({
     menuBinding: 'App.ActiveMenuController.content'
});

App.MenuItemView = Em.View.extend({
    item: null,

    click: function () {
        var item = this.get('item');
        var order = App.getPath('ActiveOrderController.content');
        console.log('Menu Item clicked, id: ' + item.get('id'));

        order.get('items').pushObject(App.OrderItem.createRecord({
            menuItem: item,
            order: order
        }));

    }
});