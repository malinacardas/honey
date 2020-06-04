import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
    rebornS: service('reborn-service'),
    model(params){
        return RSVP.hash({
            // "user":this.rebornS.getUserById(params.id),
            // "idFromUser":this.rebornS.getIdFromUser(params.username),
            "passwords":this.rebornS.getPasswords(params.username).then(function(items){
                return items.map(function(event){
                    event["title"]=event["account"]
                    return event
                })
            })
        })
    }
    // model() {
    //     return RSVP.hash({
    //         "events": this.rebornS.getEvents().then(function(items) {
    //             return items.map(function(event) {
    //                 var date = new Date(event["startDate"])
    //                 var month = ("0" + (date.getMonth() + 1)).slice(-2);
    //                 var day = ("0" + date.getDate()).slice(-2);
    //                 var goodDate = [day, month, date.getFullYear()].join(".");
    //                 event["title"] = event["name"] + " " + goodDate;
    //                 if (event["is_open"]) {
    //                     if (event["title"].length > 52) {
    //                         event["title"] = event["name"].substring(0, 48);
    //                     }
    //                 } else {
    //                     if (event["title"].length > 15) {
    //                         event["title"] = event["name"].substring(0, 12);
    //                     }
    //                 }
    //                 return event
    //             })
    //         })
    //     })
    // },

    // setupController(controller, model) {
    //     this._super(controller, model)
    //     controller.set('model', model);
    //     this.get('controller').send('resetFlagsOnRacePagePopUp');
    // },

    // actions: {
    //     async editStatusReopen(id) {
    //         let self = this;
    //         await this.rebornS.setStatus(id).then(function () {
    //             self.refresh()
    //             self.get('controller').send('setEventStatusToTrue')
    //             self.get('controller').send('clearRacePage')
    //         }, function() {
    //             self.get('controller').send('setRaceOnGoingErrorToTrue')
    //         })
    //     },

    //     async editStatusClose(id) {
    //         let self = this;
    //         await this.rebornS.setStatus(id).then(function () {
    //             self.refresh()
    //             self.get('controller').send('setEventStatusToFalse')
    //             self.get('controller').send('clearRacePage')
    //         }, function() {
    //             self.get('controller').send('setRaceOnGoingErrorToTrue')
    //         })
    //     },
    // }
});