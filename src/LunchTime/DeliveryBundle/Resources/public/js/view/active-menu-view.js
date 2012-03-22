App.ActiveMenuView = Em.View.extend({
     menuBinding: 'App.ActiveMenuController.content'
});

App.MenuItemView = Em.View.extend({
    click: function () {
        console.log('Item clicked');
//        App.store.createRecord(App.MenuItem, {
//            title: this.item.get('title'),
//            menu: this.item.get('menu'),
//            amount: 100
//        });
        var newMenu = App.store.createRecord(App.Menu, {
            dueDate: Date.parse('2012-03-20')
        });

        console.log(newMenu.get('clientId'));
    }
});