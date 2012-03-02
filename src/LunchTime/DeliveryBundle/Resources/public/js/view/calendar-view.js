App.CalendarView = Ember.View.extend({

    isDateEnabled: function (date) {
        //check if date in array
        return App.MenuController.dateExists(date);
        //return true;
    },
    didInsertElement: function () {
        var that = this;
        this.$('.picker').datepicker({
            beforeShowDay: function (date) {
                return [that.isDateEnabled(date), ''];
            },
            //TODO: this event is before the date is selected
            onSelect: function(dateText) {
                that.dateChanged((new Date(dateText)).clearTime());
            }
        }).bind('dateSelected', function () {
            console.log('date selected');
        });

    },

    dateChanged: function (date) {
        App.MenuController.set('activeDate', date);
        //console.log('Date changed to' + date.toString());

    },
    //TODO: this fires for every model item being loaded
    //need to do it only once, at the end of the run loop
    refresh: function () {
        this.$('.picker').datepicker('refresh');
        //console.log('datepicker refreshed');
    }.observes('App.MenuController.content.@each')
});