
App.OrderItem = DS.Model.extend({
    amount: DS.attr('number', {defaultValue: 1}),
    order: DS.hasOne('App.Order'),
    menuItem: DS.hasOne('App.MenuItem', {key: 'menu_item_id'})
});

App.OrderItem.reopenClass({
    url: '/order/item'
});