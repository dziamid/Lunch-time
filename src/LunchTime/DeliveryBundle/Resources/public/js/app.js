window.App = Ember.Application.create();

App.SymfonyAdapter = DS.RESTAdapter.extend({

    findAll: function (store, type) {
        var url = this.rootForType(type);

        this.ajax(url, "GET", {
            success: function (json) {
                store.loadMany(type, json);
            }
        });
    },

    rootForType: function (type) {
        var base = this.getBaseUrl();
        var url;
        if (type.url) {
            url = type.url;
        } else {
            // use the last part of the name as the URL
            var parts = type.toString().split(".");
            var name = parts[parts.length - 1];
            url = name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
            url = "/" + url;
        }

        return base + url;
    },

    /**
     * Returns a base url without the trailing slash, optionally with symfony controller
     * if it defined in the window.location.href
     *
     * e.g. http://mydomain.com or http://mydomain.com/app_dev.php
     */
    getBaseUrl: function () {
        var controller = 'app_dev.php';
        var loc = window.location;
        var url = loc.protocol + "//" + loc.host;

        if (loc.pathname.indexOf(controller) != -1) {
            url = url + "/" + controller;
        }
        return  url;
    }

});

App.store = DS.Store.create({
    adapter: App.SymfonyAdapter.create()
});

//MODEL

//Menu model
App.Menu = DS.Model.extend({
    due_date: DS.attr('date')
});
App.Menu.reopenClass({
    url: '/menu'
});

//MenuItem model
App.MenuItem = DS.Model.extend({
    title: DS.attr('string')
});

App.MenuItem.reopenClass({
    url: '/menu/item'
});


App.MenuItemsController = Ember.ArrayProxy.create({
    content: App.store.findAll(App.MenuItem)
});

App.MenuController = Ember.ArrayProxy.create({
    content: App.store.findAll(App.Menu)
});

App.MenuView = Em.View.extend({
    menusBinding: 'App.MenuController',
    itemsBinding: 'App.MenuItemsController'
});