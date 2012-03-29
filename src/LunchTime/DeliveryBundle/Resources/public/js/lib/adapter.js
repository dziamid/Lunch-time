(function (exports) {
    /*global jQuery*/
    var get = Ember.get, set = Ember.set, getPath = Ember.getPath;

    DS.SymfonyAdapter = DS.RESTAdapter.extend({

        findAll: function (store, type) {
            var url = this.getUrl(type);

            this.ajax(url, "GET", {
                success: function (json) {
                    store.loadMany(type, json);

                }
            });
        },

        findMany: function (store, type, ids) {
            var url = this.getUrl(type);

            this.ajax(url, "GET", {
                data: { ids: ids },
                success: function (json) {
                    store.loadMany(type, ids, json);
                }
            });
        },

        find: function (store, type, id) {
            var url = this.getUrl(type) + "/" + id;

            this.ajax(url, "GET", {
                success: function (json) {
                    store.load(type, json);
                }
            });
        },

        findQuery: function (store, type, query, modelArray) {
            var url = this.getUrl(type);

            this.ajax(url, "GET", {
                data: query,
                success: function (json) {
                    modelArray.load(json);
                }
            });
        },

        createRecord: function (store, type, model) {
            //delegate to createRecords, there's no need to implement both
            var data = [];
            data.push(model);
            this.createRecords(data);
        },

        createRecords: function (store, type, models) {
            var url = this.getUrl(type);
            var data = models.map(function (model) {
                return model.toJSON();
            });

            this.ajax(url, "POST", {
                data: data,

                success: function (json) {
                    this.sideload(store, type, json);
                    store.didCreateRecords(type, models, json);
                }
            });
        },

        updateRecord: function (store, type, model) {
            //delegate to createRecords, there's no need to implement both
            var data = [];
            data.push(model);
            this.updateRecords(data);
        },

        updateRecords: function (store, type, models) {
            var url = this.getUrl(type);

            var data = models.map(function (model) {
                return model.toJSON();
            });

            this.ajax(url, "PUT", {
                data: data,
                success: function (json) {
                    this.sideload(store, type, json);
                    store.didUpdateRecords(models, json);
                }
            });
        },

        deleteRecord: function (store, type, model) {
            //delegate to createRecords, there's no need to implement both
            var data = [];
            data.push(model);
            this.deleteRecords(data);
        },

        deleteRecords: function (store, type, models) {
            var url = this.getUrl(type);

            var data = models.map(function (model) {
                return get(model, 'id');
            });

            this.ajax(url, "DELETE", {
                data: data,
                success: function (json) {
                    if (json) {
                        this.sideload(store, type, json);
                    }
                    store.didDeleteRecords(models);
                }
            });
        },

        getUrl: function (type) {
            return this.getBaseUrl() + type.url;
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
        },

        sideload: function (store, type, json) {
            json.forEach(function (item) {
                store.load(type, item);
            });
        }


    });

})({});