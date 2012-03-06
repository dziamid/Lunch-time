DS.SymfonyAdapter = DS.RESTAdapter.extend({

    findAll: function (store, type) {
        var url = this.rootForType(type);

        this.ajax(url, "GET", {
            success: function (json) {
                store.loadMany(type, json);

            }
        });
    },

    findQuery: function (store, type, query, modelArray) {
        var url = this.rootForType(type);

        this.ajax(url, "GET", {
            data: query,
            success: function (json) {
                modelArray.load(json);
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