import Service from '@ember/service';
import { inject as service } from '@ember/service';
import ENV from 'ui/config/environment';

export default Service.extend({
    socketIOService: service('socket-io'),
    namespace: 'racedata',

    onDisconnect() {
        this.socketIOService.closeSocketFor(`${ENV.APP.host}:${ENV.APP.port}/${this.namespace}`);
    },

    onConnect() {
      return this.socketIOService.socketFor(`${ENV.APP.host}:${ENV.APP.port}/${this.namespace}`);
    },

    actions: {
        connect: function() {
            this.onConnect()
        },
        disconnect: function() {
            this.onDisconnect()
        }
    }
});