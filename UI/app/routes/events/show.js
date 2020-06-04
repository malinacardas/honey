import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
    rebornService: service('reborn-service'),

    model(params) {
        return RSVP.hash({
            "settings": this.rebornService.getSettings(),
            "event": this.rebornService.getEventById(params.id),
            "participants": this.rebornService.getParticipants(params.id),
            "eventId": params.id
        });
    },
});