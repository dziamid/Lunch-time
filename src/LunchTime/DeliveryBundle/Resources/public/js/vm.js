//this is to suppress undefined variable highlights
//need to refactor it to closure modules
var LT = typeof window.LT !== 'undefined' ? window.LT : {};
LT.config = typeof LT.config !== 'undefined' ? LT.config : {};

LT.viewModel = new (function (config) {
    var self = this;
    var i;
    self.menus = ko.observableArray([]);
    config.menus = config.menus || [];
    for (i = 0; i < config.menus.length; i++) {
        self.menus.push(new LT.Menu(config.menus[i]));
    }

    self.orders = ko.observableArray([]);
    config.orders = config.orders || [];
    for (i = 0; i < config.orders.length; i++) {
        self.orders.push(new LT.Order(config.orders[i]));
    }

    self.activeMenu = ko.observable(null);
    self.activeOrder = ko.observable(null);

    self.activateMenu = function (menu) {
        self.activeMenu(menu);
        var order = ko.utils.arrayFirst(self.orders(), function (order) {
            return order.date().equals(menu.date());
        });
        if (!order) {
            order = new LT.Order({date: menu.date().toString('yyyy-MM-dd HH:mm:ss')});
            self.orders.push(order);
        }
        self.activeOrder(order);
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
        self.activeOrder().addItem(menuItem);
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
                    var order = new LT.Order(data.order);
                    self.activeOrder(order);
                }
            }
        });
    };

    //initial data
    self.activateMenu(self.menus()[self.menus().length - 1]);
    //self.activeOrder(new LT.Order({date: '2012-05-06'}));

})(LT.config);

ko.applyBindings(LT.viewModel);

