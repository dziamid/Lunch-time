var Menu = function (data) {
    var self = this;

    data = data || {};
    self.title = ko.observable(data.title || null);

};

function MenuViewModel() {
    var self = this;

    self.menus = ko.observableArray([new Menu(), new Menu({title: 'Menu for today'})]);

    self.reloadMenus = function () {

    }
}

var menuVM = new MenuViewModel();
ko.applyBindings(menuVM);