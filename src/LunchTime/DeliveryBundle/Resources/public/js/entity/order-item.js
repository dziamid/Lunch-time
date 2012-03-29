
App.OrderItem = App.Model.extend({
    amount: DS.attr('number', {defaultValue: 1}),
    order: DS.hasOne('App.Order', {key: 'order'}),
    menuItem: DS.hasOne('App.MenuItem', {key: 'menu_item'}),
    incAmount: function () {
        this.set('amount', this.get('amount') + 1);
    },
    decAmount: function () {
        this.set('amount', this.get('amount') - 1);
    }
});

App.OrderItem.reopenClass({
    url: '/order/item'
});