//this is to suppress undefined variable highlights
//need to refactor it to closure modules
var LT = typeof window.LT !== 'undefined' ? window.LT : {};
LT.config = typeof LT.config !== 'undefined' ? LT.config : {};

LT.Menu = function (data) {
    var self = this;
    data = data || {};
    self.id = data.id || null;
    self.title = data.title || null;
};

LT.MenuItem = function (data) {
    var self = this;
    data = data || {};
    self.id = data.id || null;
    self.title = data.title || null;
    self.price = parseFloat(data.price) || null;
    self.menuId = data.menuId || null;

};

LT.OrderItem = function (data) {
    var self = this;
    data = data || {};
    self.menuItem = ko.observable(data.menuItem || null);
    self.amount = ko.observable(data.amount || null);
    self.title = function () {
        return this.menuItem().title;
    };
    self.price = function () {
        return this.menuItem().price * this.amount();
    };
    self.addOne = function () {
        return this.amount(this.amount() + 1);
    };
    self.removeOne = function () {
        return this.amount(this.amount() - 1);
    };
};

LT.viewModel = new (function(config) {
    var self = this;

    self.menus = ko.observableArray([
        new LT.Menu({id: 1, title: 'Yesterday'}),
        new LT.Menu({id: 2, title: 'Today'}),
        new LT.Menu({id: 3, title: 'Tomorrow'})
    ]);

    self.menuItems = ko.observableArray([
        new LT.MenuItem({id: 1, menuId: 1, title: 'Spagetti', price: 32800}),
        new LT.MenuItem({id: 2, menuId: 1, title: 'Makaroni', price: 32000}),
        new LT.MenuItem({id: 3, menuId: 2, title: 'Plov', price: 45000}),
        new LT.MenuItem({id: 4, menuId: 2, title: 'Sup', price: 8900}),
        new LT.MenuItem({id: 5, menuId: 3, title: 'Capuccino', price: 12000})
    ]);

    self.findMenu = function (id) {
        return ko.utils.arrayFirst(self.menus(), function (o) {
            return id == o.id;
        });
    };
    self.findMenuItem = function (id) {
        return ko.utils.arrayFirst(self.menuItems(), function (o) {
            return id == o.id;
        });
    };
    self.findMenuItems = function (menuId) {
        return ko.utils.arrayFilter(self.menuItems(), function (item) {
            return menuId == item.menuId;
        });
    };
    self.activeMenu = ko.observable();
    self.activeMenuItems = ko.observableArray();
    self.activateMenu = function (menu) {
        self.activeMenu(menu);
        self.activeMenuItems(self.findMenuItems(menu.id));
    };
    self.isActiveMenu = function (menu) {
        return menu.id == self.activeMenu().id;
    };

    //order
    self.addToOrder = function (menuItem) {

        var item = ko.utils.arrayFirst(self.orderItems(), function (o) {
            return menuItem.id == o.menuItem().id;
        });
        if (item) {
            item.addOne();
        } else {
            item = new LT.OrderItem({menuItem: menuItem, amount: 1});
            self.orderItems.push(item);
        }

    };

    self.removeFromOrder = function (item) {
        if (item.amount() > 1) {
            item.removeOne();
        } else {
            self.orderItems.remove(item);
        }
    };

    self.orderItems = ko.observableArray();

    self.orderTotal = ko.dependentObservable(function () {
        var total = 0;

        ko.utils.arrayForEach(self.orderItems(), function (item) {
            total += item.price();
        });

        return total;
    });

    //initial data
    self.activateMenu(self.findMenu(config.activeMenuId));
    self.addToOrder(self.findMenuItem(1));

})(LT.config);

ko.applyBindings(LT.viewModel);

