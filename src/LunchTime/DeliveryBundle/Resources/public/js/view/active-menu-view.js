App.ActiveMenuView = Em.View.extend({
     menuBinding: 'App.MenuController.active'
});

App.MenuItemView = Em.View.extend({
    click: function () {
        console.log('Item clicked');
        var orderItem = App.OrderItem.create({
            title: this.item.get('title')
        });
        App.getPath('OrderController.active.items').pushObject(orderItem);
    }
});