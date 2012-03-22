App.set('CalendarController', Ember.Object.create({

    activeDate: Date.today(),

    isDateEnabled: function (date) {
        //check if date in array
        return App.get('MenuController').dateExists(date) || date.equals(Date.today());
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