App.CalendarView = Ember.View.extend({
    controllerBinding: 'App.CalendarController',

    didInsertElement: function () {
        var that = this;
        this.$('.picker').datepicker({
            beforeShowDay: function (date) {
                return [that.get('controller').isDateEnabled(date), ''];
            },
            onSelect: function(dateString) {
                that.get('controller').changeDate(Date.parse(dateString));
            },
            defaultDate: this.get('controller').get('activeDate')
        });

    },

    refresh: function () {
        this.$('.picker').datepicker('refresh');
        //console.log('datepicker refreshed');
    }.observes('App.MenuController.content.isLoaded'),

    onChangeDate: function () {
        var date = this.get('controller').get('activeDate');
        this.$('.picker').datepicker('setDate', date);
        //console.log('Date changed to' + date.toString());

    }.observes('controller.activeDate')
});