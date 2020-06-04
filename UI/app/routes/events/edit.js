import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  rebornService: service('reborn-service'),

  model(params) {
    return RSVP.hash({
      "event":this.rebornService.getPassword(params.id),
    })
  }
});
