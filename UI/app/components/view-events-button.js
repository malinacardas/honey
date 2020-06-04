import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router: service(),
    rebornService: service('reborn-service'),

    actions: {
        viewEvents() {
            let self = this;
            self.get('router').transitionTo('events.index');
            // this.rebornService.getSettings().then(function(response) {
            //     if (!response.raceOnGoing) {
            //         self.get('router').transitionTo('events.index');
            //     }
        }
    }
});
