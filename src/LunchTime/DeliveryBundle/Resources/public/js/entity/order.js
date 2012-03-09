
App.Order = DS.Model.extend({
    items: DS.hasMany('App.OrderItem', {
        embedded: true
    }),
    menu: DS.hasOne('App.Menu', {key: 'menu_id'})
});

App.Order.reopenClass({
    url: '/order'
});