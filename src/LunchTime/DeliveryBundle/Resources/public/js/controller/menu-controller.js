App.set('MenuController', Ember.ArrayProxy.create({
    activeDate: null,

    content: [],

    active: function () {
        var that = this;
        return this.content.find(function (menu) {
            var date = menu.get('dueDate');
            var activeDate = that.get('activeDate');
            return !(activeDate && activeDate.compareTo(date));
        });
    }.property('activeDate'),
    dateExists: function (date) {
        return this.some(function (menu) {
            return !menu.get('dueDate').compareTo(date);
        });
    },
    contentDidChange: function () {
        console.log('menu array has changed');
        //App.CalendarView.refresh();
    }
}));