App.set('MenuController', Ember.ArrayProxy.create({
    activeDate: (new Date()).clearTime(),
    availiableDates: [],
    content: [],

    active: function () {
        var that = this;
        return this.content.find(function (menu) {
            var date = menu.get('dueDate');
            var activeDate = that.get('activeDate');
            return !(activeDate && activeDate.compareTo(date));
        });
    }.property('activeDate', 'content.@each'),
    dateExists: function (date) {
        //cache date list for performance
        var self = this;
        if (this.availiableDates.length == 0) {
            this.content.forEach(function(item) {
                self.availiableDates.push(item.get('dueDate').valueOf());
            });
        }
        var dateString = date.valueOf();
        var result = $.inArray(dateString, this.availiableDates) !== -1;
        return result;
    }
}));