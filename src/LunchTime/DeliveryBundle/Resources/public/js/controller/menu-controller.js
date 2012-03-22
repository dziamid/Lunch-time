App.set('MenuController', Ember.ArrayProxy.create({
    content: [],

    contentDates: [],

    dateExists: function (date) {
        //cache date list for performance
        //TODO: there should be an option to refresh cache when content.@each changes
        var self = this;
        if (this.contentDates.length == 0) {
            this.content.forEach(function (item) {
                self.contentDates.push(item.get('dueDate').valueOf());
            });
        }

        return $.inArray(date.valueOf(), this.contentDates) !== -1;
    }
}));

App.set('ActiveMenuController', Ember.Object.create({
    content: function () {
        var activeDate = App.get('CalendarController').get('activeDate');
        return App.get('MenuController').find(function (menu) {
            return menu.get('dueDate').equals(activeDate);
        });
    }.property('App.CalendarController.activeDate', 'App.MenuController.@each')
}));