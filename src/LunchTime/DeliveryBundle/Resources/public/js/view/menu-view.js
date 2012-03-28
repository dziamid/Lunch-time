App.MenuView = Em.View.extend({
     menuBinding: 'App.ActiveMenuController.content'
});

App.MenuItemView = Em.View.extend({
    item: null,

    click: function () {
        var menuItem = this.get('item');
        var order = App.getPath('ActiveOrderController.content');
        order.addItem(menuItem);

    }
});