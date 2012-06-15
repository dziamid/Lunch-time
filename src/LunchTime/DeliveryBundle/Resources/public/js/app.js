
function Menu(id, title) {
    return {
        id: id,
        title: title
    };
}

function MenuItem(id, menuId, title, price) {
    return {
        id: id,
        title: title,
        price: parseFloat(price),
        menuId: menuId
    };
}

function OrderItem(menuItem, amount) {
    return {
        menuItem: ko.observable(menuItem),
        amount: ko.observable(amount),
        title: function () {
            return this.menuItem().title;
        },
        price: function () {
            return this.menuItem().price * this.amount();
        },
        addOne: function () {
            return this.amount(this.amount() + 1);
        },
        removeOne: function () {
            return this.amount(this.amount() - 1);
        }
    };
}

function MenuVM(activeMenuId) {
    var self = this;

    self.menus = ko.observableArray([
        new Menu(1, 'Yesterday'),
        new Menu(2, 'Today'),
        new Menu(3, 'Tomorrow')
    ]);

    self.menuItems = ko.observableArray([
        new MenuItem(1, 1, 'Spagetti', 32800),
        new MenuItem(2, 1, 'Makaroni', 18100),
        new MenuItem(3, 2, 'Plov', 20500),
        new MenuItem(4, 2, 'Super sup', 5450),
        new MenuItem(5, 3, 'Govno sup', 1300)
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
    self.activateMenu = function(menu) {
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
            item = new OrderItem(menuItem, 1);
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

        ko.utils.arrayForEach(self.orderItems(), function(item) {
            total += item.price();
        });

        return total;
    });

    //initial data
    self.activateMenu(self.findMenu(activeMenuId));
    self.addToOrder(self.findMenuItem(1));

};

var viewModel = new MenuVM(2);
ko.applyBindings(viewModel);

