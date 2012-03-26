App.set('OrderController', Ember.ArrayProxy.create({
    content: []
}));

App.set('ActiveOrderController', Ember.Object.create({
    content: function () {
        //find the first order in array
        return App.get('OrderController').find(function () {
            return true;
        });
    }.property('App.OrderController.@each')
}));