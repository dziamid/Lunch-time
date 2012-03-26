App.ActiveMenuView = Em.View.extend({
     menuBinding: 'App.ActiveMenuController.content'
});

App.MenuItemView = Em.View.extend({
    item: null,

    click: function () {
        var item = this.get('item');

        console.log('Menu Item clicked, id: ' + item.get('id'));

        var newItem = App.OrderItem.createRecord({
            menuItem: item
        });
        App.getPath('ActiveOrderController.content.items').pushObject(newItem);

    }
});