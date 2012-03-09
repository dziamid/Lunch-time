App.set('OrderController', Ember.ArrayProxy.create({
    content: [],

    active: function () {
        return this.content.find(function (order) {
            //find first
            return true;
        });
    }.property('content.@each')
}));