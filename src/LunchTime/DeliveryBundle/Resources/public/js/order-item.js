
LT.OrderItem = function (data) {
    var self = this;
    data = data || {};

    var menuItem = data.menuItem || LT.MenuItemRepository.create(data.menu_item);
    //menuItem is required
    self.menuItem = ko.observable(menuItem);

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


LT.OrderItem.prototype.toJSON = function () {
    var obj = ko.toJS(this);

    return {
        menu_item: obj.menuItem,
        amount: obj.amount
    };
};