import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { sort } from '@ember/object/computed';
import { get } from '@ember/object';
import { inject } from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
    showController: inject('events.show'),
    createController: inject('events.create'),
    eventStatus: false,
    rebornS: service('reborn-service'),
    raceOnGoingError: false,
    errorMessageOpenEvent: "There is an ongoing race. Try to close the event after the race is finished.", 
    closeEventPopup: false,
    popUpMessageCloseEvent: "ARE YOU SURE?",   

    sortedEvents: sort('model.events.@each.startDate', function(firstEvent, secondEvent) {
        var event1 = moment(get(firstEvent, 'startDate')),
            event2 = moment(get(secondEvent, 'startDate'))
    
        if (!this.eventStatus) { 
            if (firstEvent.is_open || secondEvent.is_open) {
                this.set('eventStatus', true)
            }
        }
    
        if(event1 !== event2) {
          return event2 - event1;
        }
    }),

    passwords: computed('model', function() {
        return this.get('model.passwords');
    }),

    actions: {
        deleteEvent(id){
            let self=this;
            this.rebornS.deletePassword(id).then(function(){
                self.transitionToRoute('events.index');
            })
        },

        results(id) {
            this.transitionToRoute('events.results', id);
        },

        startrace(event) {
            let self = this;
            this.rebornS.putSettingsNoRoller(event.nrOfBikes, event.raceType, event.raceValue).then(function() {
                self.get("showController").send("clearPagePopUp");
                self.transitionToRoute('events.show', event.id);
            })   
        },
        
        setRaceOnGoingErrorToFalse() {
            this.set('raceOnGoingError', false);
        },

        setRaceOnGoingErrorToTrue() {
            this.set('raceOnGoingError', true);
        },

        setShowCloseEventPopupFalse() {
            this.set('closeEventPopup', false);
        },

        setShowCloseEventPopupTrue() {
            this.set('closeEventPopup', true);
        },

        setEventStatusToTrue() {
            this.set('eventStatus', true);
        },

        setEventStatusToFalse() {
            this.set('eventStatus', false);
        },

        editStatusConfirmed(id) {
            this.send("editStatusClose", id)
        },

        clearRacePage() {
            this.get("showController").send("clearPage");
        },

        transitionToCreateEvent() {
            this.transitionToRoute('events.create');
            this.get('createController').send('setEventOpenErrorToFalse')
        },

        transitionToEditEvent(id) {
            this.transitionToRoute('events.edit', id );
            console.log("id",id)
            console.log("account",event.account)
            console.log("username",event.username)
            this.get('createController').send('setEventOpenErrorToFalse')
        },

        resetFlagsOnRacePagePopUp() {
            let self = this;
            this.rebornS.getEvent().then(function() {
                self.set('eventStatus', true)
            }, function() {
                self.set('eventStatus', false)
            })
        }
    }
});