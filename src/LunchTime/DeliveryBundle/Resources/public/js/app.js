//this is to suppress undefined variable highlights
//need to refactor it to closure modules
var LT = typeof window.LT !== 'undefined' ? window.LT : {};
LT.config = typeof LT.config !== 'undefined' ? LT.config : {};
ko.forEach = ko.utils.arrayForEach;

LT.Menu = function (data) {
    var self = this;
    data = data || {};
    self.id = data.id || null;
    self.date = ko.observable(data.date || null);
    self.items = ko.observableArray([]);
    data.items = data.items || [];
    for (var i = 0; i < data.items.length; i++) {
        self.items.push(new LT.MenuItem(data.items[i]));
    }
    self.title = ko.computed(function () {
        return self.date();
    });
};

LT.MenuItem = function (data) {
    var self = this;
    data = data || {};
    self.id = data.id || null;
    self.title = data.title || null;
    self.price = parseFloat(data.price) || null;

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

    self.menus = ko.observableArray([]);

    config.menus = config.menus || [];
    for (var i = 0; i < config.menus.length; i++) {
        self.menus.push(new LT.Menu(config.menus[i]));
    }

//    ko.utils.arrayForEach(config.menus, function (data) {
//        self.menus.push(new LT.Menu(data));
//    });

    //TODO: writable computed observable
    self.activeMenu = ko.observable(null);
    self.activateMenu = function (menu) {
        self.activeMenu(menu);
    };

    //TODO: ko.computed
    self.isActiveMenu = function (menu) {
        return menu == self.activeMenu();
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
    self.activateMenu(self.menus()[0]);

})(LT.config);

ko.applyBindings(LT.viewModel);

