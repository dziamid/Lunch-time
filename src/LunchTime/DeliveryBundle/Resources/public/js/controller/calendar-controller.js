App.set('CalendarController', Ember.Object.create({

    activeDate: Date.parse('2000-01-01'),

    isDateEnabled: function (date) {
        //check if date in array
        return App.get('MenuController').dateExists(date);
        //return true;
    },

    /**
     * Changes active date
     *
     * @param date Date
     */
    changeDate: function (date) {
        this.set('activeDate', date);


    }

}));