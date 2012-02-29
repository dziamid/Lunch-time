window.App = Ember.Application.create();
DS.attr.transforms.date = {
    //overriden to use date.js
    from: function (serialized) {
        var type = typeof serialized;

        if (type === "string" || type === "number") {
            return Date.parse(serialized);
        } else if (serialized === null || serialized === undefined) {
            return serialized;
        } else {
            return null;
        }
    },
    to: function(date, format) {
        if (format === undefined) {
            format = 'yyyy-MM-dd hh:mm:ss';
        }
        if (date instanceof Date) {
            return Date.toString(format);
        } else if (date === undefined) {
            return undefined;
        } else {
            return null;
        }
    }
};

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
    dueDate: DS.attr('date', {key: 'due_date'}),
    dueDateString: function() {
        return this.get('dueDate').toString('yyyy-MM-dd hh:mm:ss');
    }.property('dueDate'),
    items: DS.hasMany('App.MenuItem', {
        embedded: true
    })
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

//model objects

App.Menus = App.store.findAll(App.Menu);

App.MenuController = Ember.ArrayProxy.create({
    contentBinding: 'App.Menus',

    dateExists: function (date) {
        return this.some(function (menu) {
            return !menu.get('dueDate').compareTo(date);
        });
    }
});

App.MenuView = Em.View.extend({
    menusBinding: 'App.MenuController'
});

App.CalendarView = Ember.View.extend({
    activeDate: null,

    isDateEnabled: function (date) {
        //check if date in array
        return App.MenuController.dateExists(date);
    },
    didInsertElement: function () {
        var that = this;
        this.$('.picker').datepicker({
            beforeShowDay: function (date) {
                return [that.isDateEnabled(date), ''];
            },
            onSelect: function(dateText) {
                that.set('activeDate', Date(dateText));
            }
        });
    },

    dateChanged: function () {
        console.log('change date');
    }.observes('activeDate')
});