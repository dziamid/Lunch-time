//this is to suppress undefined variable highlights
//need to refactor it to closure modules
var LT = typeof window.LT !== 'undefined' ? window.LT : {};
LT.config = typeof LT.config !== 'undefined' ? LT.config : {};
ko.forEach = ko.utils.arrayForEach;

LT.Menu = function (data) {
    var self = this;
    data = data || {};
    //id is required
    self.id = ko.observable(data.id);
    //date is required
    self.date = ko.observable(Date.parse(data.date));
    self.items = ko.observableArray([]);
    data.items = data.items || [];
    for (var i = 0; i < data.items.length; i++) {
        self.items.push(new LT.MenuItem(data.items[i]));
    }
    self.title = ko.computed(function () {
        return self.date().toString('MMMM d');
    });
};

LT.MenuItem = function (data) {
    var self = this;
    data = data || {};
    //id is required
    self.id = ko.observable(data.id);
    //title is required
    self.title = ko.observable(data.title);
    //price is required
    self.price = ko.observable(parseFloat(data.price));
};

LT.Order = function (data) {
    var self = this;
    data = data || {};
    self.id = ko.observable(data.id || null);
    //date is required
    self.date = ko.observable(Date.parse(data.date));
    self.items = ko.observableArray([]);
    data.items = data.items || [];
    for (var i = 0; i < data.items.length; i++) {
        self.items.push(new LT.OrderItem(data.items[i]));
    }
    self.totalPrice = ko.computed(function () {
        var total = 0;

        ko.utils.arrayForEach(self.items(), function (item) {
            total += item.price();
        });

        return total;
    });

    self.addMenuItem = function (menuItem) {

        var item = ko.utils.arrayFirst(self.items(), function (item) {
            return menuItem == item.menuItem();
        });

        if (item) {
            item.addOne();
        } else {
            item = new LT.OrderItem({menuItem: menuItem, amount: 1});
            self.items.push(item);
        }
    };

    self.removeItem = function (item) {
        if (item.amount() > 1) {
            item.removeOne();
        } else {
            self.items.remove(item);
        }
    };

};

LT.OrderItem = function (data) {
    var self = this;
    data = data || {};
    self.menuItem = ko.observable(data.menuItem || null);

    self.amount = ko.observable(data.amount || null);
    self.title = ko.computed(function () {
        return self.menuItem().title();
    });
    self.price = ko.computed(function () {
        return self.menuItem().price() * self.amount();
    });
    self.addOne = function () {
        return self.amount(self.amount() + 1);
    };
    self.removeOne = function () {
        return self.amount(self.amount() - 1);
    };
};


LT.Order.prototype.toJSON = function () {
    var obj = ko.toJS(this);

    return {
        id: obj.id,
        date: obj.date.toString('yyyy-MM-dd HH:mm:ss'),
        items: obj.items
    };
};

LT.OrderItem.prototype.toJSON = function () {
    var obj = ko.toJS(this);

    return {
        menu_item: obj.menuItem,
        amount: obj.amount
    };
};

LT.MenuItem.prototype.toJSON = function () {
    var obj = ko.toJS(this);

    return {
        id: obj.id
    };
};

LT.viewModel = new (function (config) {
    var self = this;

    self.menus = ko.observableArray([]);

    config.menus = config.menus || [];
    for (var i = 0; i < config.menus.length; i++) {
        self.menus.push(new LT.Menu(config.menus[i]));
    }

    //TODO: writable computed observable
    self.activeMenu = ko.observable(null);

    self.activateMenu = function (menu) {
        self.activeMenu(menu);
    };

    self.activeOrder = ko.observable(null);

    self.isActiveMenu = function (menu) {
        return menu == self.activeMenu();
    };

    /**
     * Adds a menu item to active order
     *
     * @param menuItem
     */
    self.addToActiveOrder = function (menuItem) {
        self.activeOrder().addMenuItem(menuItem);
    };

    self.removeFromOrder = function (item) {
        self.activeOrder().removeItem(item);
    };

    self.submitOrder = function () {
        var orderData = ko.toJSON(self.activeOrder());
        console.log(orderData);


        $.ajax({
            url: config.orderBaseUrl,
            data: orderData,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    console.log('Saved successfully');
                }
            }
        });
    };

    //initial data
    self.activeMenu(self.menus()[self.menus().length - 1]);
    self.activeOrder(new LT.Order({date: '2012-05-06'}));

})(LT.config);

ko.applyBindings(LT.viewModel);

