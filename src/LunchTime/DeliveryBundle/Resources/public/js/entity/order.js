
App.Order = DS.Model.extend({
    items: DS.hasMany('App.OrderItem', {
        embedded: true
    }),
    menu: DS.hasOne('App.Menu')
});

App.Order.reopenClass({
    url: '/order'
});