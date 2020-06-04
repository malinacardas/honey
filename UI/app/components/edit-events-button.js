import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router: service(),
    rebornService: service('reborn-service'),

    actions: {
        editEvent(id) {
            let self = this;
            this.rebornService.getSettings().then(function(response) {
                if (!response.raceOnGoing) {
                    self.get('router').transitionTo('events.edit', id);
                }
            })
        }
    }
});