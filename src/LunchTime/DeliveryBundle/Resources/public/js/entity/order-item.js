
App.OrderItem = DS.Model.extend({
    amount: DS.attr('integer'),
    order: DS.hasOne('App.Order'),
    menuItem: DS.hasOne('App.MenuItem')
});

App.OrderItem.reopenClass({
    url: '/order/item'
});