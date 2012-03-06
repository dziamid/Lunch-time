App.CalendarView = Ember.View.extend({

    isDateEnabled: function (date) {
        //check if date in array
        return App.get('MenuController').dateExists(date);
        //return true;
    },
    didInsertElement: function () {
        var that = this;
        this.$('.picker').datepicker({
            beforeShowDay: function (date) {
                return [that.isDateEnabled(date), ''];
            },
            onSelect: function(dateText) {
                that.dateChanged((new Date(dateText)).clearTime());
            }
        }).bind('dateSelected', function () {
            console.log('date selected');
        });

    },

    dateChanged: function (date) {
        App.get('MenuController').set('activeDate', date);
        console.log('Date changed to' + date.toString());

    },

    refresh: function () {
        this.$('.picker').datepicker('refresh');
        console.log('datepicker refreshed');
    }.observes('App.MenuController.content.isLoaded')
});