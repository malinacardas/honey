import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

    init() {
        this._super(...arguments);
        this.set("raceValueFlag", true);
    },

    event: computed('model', function() {
        return this.get('model.event');
    }),

    date: computed('model', function() {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var date = new Date(this.get('model.event.startDate'))
        var month = months[date.getMonth()];
        var day = ("0" + date.getDate()).slice(-2);
        var goodDate = [day, month, date.getFullYear()].join(" ");
        return goodDate
    })
});
