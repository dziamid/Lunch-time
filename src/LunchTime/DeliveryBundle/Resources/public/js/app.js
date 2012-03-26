window.App = Ember.Application.create({
    ready: function () {

        App.store = DS.Store.create({
            adapter: DS.SymfonyAdapter.create(),
            revision: 3
        });

        //TODO: preload only items for loaded menus, or load them alltogether (embedded)
        App.store.findAll(App.MenuItem);
        App.setPath('MenuController.content', App.store.findQuery(App.Menu, 'homepageList'));

        App.store.findAll(App.OrderItem);
        App.setPath('OrderController.content', App.store.findQuery(App.Order, 'homepageList'));

    }
});

App.Model = DS.Model.extend({
    namingConvention: {
        keyToJSONKey: function (key) {
            return Ember.String.decamelize(key);
        },

        foreignKey: function (key) {
            //don't add _id
            return Ember.String.decamelize(key);
        }
    }
});

