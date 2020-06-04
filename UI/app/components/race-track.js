import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    laneIndexes: computed("nrOfBikes", function() {
        if (this.nrOfBikes == 4) {
            return [1, 2, 3, 4]
        } else if (this.nrOfBikes == 2) {
            return [1, 2]
        } else if (this.nrOfBikes == 3) {
            return [1, 2, 3]
        } else {
            return [1]
        }
    }),

    websocket: service('wsocket'),

    actions: {
        disconnect: function() {
            this.websocket.onDisconnect()
        },
        startClick: function() {
            let buttons = document.getElementsByClassName("player-button");
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].id == "blank-rider-button") {
                    buttons[i].style.display = "none";
                }
            }
            this.onStartRace();

            let dropdowns = document.getElementsByClassName("drop-btn");
            for (let i = 0; i < dropdowns.length; i++) {
                dropdowns[i].style.display = "none";
            }
        },
        stopRace: function() {
            this.websocket.onDisconnect();
            this.onStopRace();
        },
    }
});