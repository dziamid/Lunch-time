App.set('MenuController', Ember.ArrayProxy.create({
    content: [],

    _cachedDates: [],

    active: function () {
        var activeDate = App.getPath('CalendarController.activeDate');
        return this.content.find(function (menu) {
            return menu.get('dueDate').equals(activeDate);
        });
    }.property('App.CalendarController.activeDate', 'content.@each'),

    dateExists: function (date) {
        //cache date list for performance
        //TODO: there should be an option to refresh cache when content.@each changes
        var self = this;
        if (this._cachedDates.length == 0) {
            this.content.forEach(function(item) {
                self._cachedDates.push(item.get('dueDate').valueOf());
            });
        }
        var dateString = date.valueOf();
        var result = $.inArray(dateString, this._cachedDates) !== -1;
        return result;
    }
}));