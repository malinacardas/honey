import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
    rebornService: service('reborn-service'),
    event: computed('model', function() {
        return this.get('model.event');
    }),

    // event: computed('model.event', function() {
    //     return this.get('model.event');
    // }),

    // settings: computed('model', function() {
    //     return this.get('model.settings');
    // }),

    async editPassword(id, account, username, password) {
        this.putPassword(id, account, username, password)
        }
    ,

    async putPassword(id, account, username, password){
        await this.rebornService.putPassword(5, account, username, password);
        this.transitionToRoute('events.index');
    },

    actions: {
        editPassword(id,account, username, password) {
            this.editPassword(id, account, username, password);
        },
    }
})
