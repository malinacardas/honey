import Component from '@ember/component';

export default Component.extend({

    init() {
        this._super(...arguments);
        this.set('showFirstTable', true);
        this.set('raceTypeSet', this.event.raceType);

        this.filterAll();
        this.filterCustom();
    },

    filterAll(){
        var resultsFiltered = this.results.filter(res =>
            res.raceType == this.event.raceType &&
            res.raceValue == this.event.raceValue)
        this.setresults(resultsFiltered, this.event)
    },

    filterCustom(){
        var resultsFiltered = this.results.filter(res =>
            res.raceType != this.event.raceType || res.raceValue != this.event.raceValue
        )
        this.set('customRace', resultsFiltered);
    },

    setresults(resultsFiltered, event) {
        if (event.raceType == "m")
            this.set('raceTypeSet', "m");
        else
            this.set('raceTypeSet', "s");
        this.set('filtered', resultsFiltered);
    },

    actions: {
        women() {
            const resultsFiltered = this.results.filter(res =>
                res.raceType == this.event.raceType &&
                res.raceValue == this.event.raceValue &&
                res.age >= 18 &&
                res.gender == 'F')
            this.set('showFirstTable', true);
            this.setresults(resultsFiltered, this.event)
        },

        men() {
            const resultsFiltered = this.results.filter(res =>
                res.raceType == this.event.raceType &&
                res.raceValue == this.event.raceValue &&
                res.age >= 18 &&
                res.gender == 'M')
            this.set('showFirstTable', true);
            this.setresults(resultsFiltered, this.event)
        },

        kids() {
            const resultsFiltered = this.results.filter(res =>
                res.raceType == this.event.raceType &&
                res.raceValue == this.event.raceValue &&
                res.age < 18)
            this.set('showFirstTable', true);
            this.setresults(resultsFiltered, this.event)
        },

        customRace() {
            this.filterCustom();
            this.set('showFirstTable', false);
        },

        all() {
            this.filterAll();
            this.set('showFirstTable', true);
        }
    }
});
