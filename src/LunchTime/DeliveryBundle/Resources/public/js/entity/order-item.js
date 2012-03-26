
App.OrderItem = App.Model.extend({
    amount: DS.attr('number', {defaultValue: 1}),
    order: DS.hasOne('App.Order', {key: 'order'}),
    menuItem: DS.hasOne('App.MenuItem', {key: 'menu_item'})
});

App.OrderItem.reopenClass({
    url: '/order/item'
});