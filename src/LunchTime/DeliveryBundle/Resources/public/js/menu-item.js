
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

LT.MenuItem.prototype.toJSON = function () {
    var obj = ko.toJS(this);

    return {
        id: obj.id
    };
};
