
App.store = DS.Store.create({
    adapter: DS.SymfonyAdapter.create()
});

//model objects

App.Menus = App.store.findAll(App.Menu);

App.MenuController = Ember.ArrayProxy.create({
    activeDate: null,

    contentBinding: 'App.Menus',
    active: function () {
        var that = this;
        return this.content.find(function (menu) {
            var date = menu.get('dueDate');
            var activeDate = that.get('activeDate');
            return !activeDate.compareTo(date);
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
});

App.MenuView = Em.View.extend({
     activeMenuBinding: 'App.MenuController.active'
});

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
    }.observes('App.Menus.@each')
});