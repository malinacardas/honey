import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { inject } from '@ember/controller';

const Rider = EmberObject.extend({});

export default Controller.extend({
    indexController: inject('events.index'),
    websocketService: service('wsocket'),
    rebornService: service('reborn-service'),
    canStartRace: false,
    isWebSocketEnable: false,
    addedRiders: 0,
    raceStartedOver: true,
    isCountDownOn: false,
    countDown: null,
    showWinner: false,
    startOver: false,
    maxSpeed: 0,
    nameMaxSpeed: "",
    errorMessageRaceOnGoing: "There is an ongoing race.\n Another one can be started only after the current race is finished.",
    errorMessageEventClosed: "Race data can't be saved, as the event was closed.\n Re-open the event to start another race.",
    errorCodeServerResponse: 205,
    raceOnGoing: false,
    raceOnGoingError: false,
    eventClosedError: false,

    init() {
        this._super(...arguments);
        this.set('ridersList', A([null, null, null, null]));
        this.set("showDropdowns", true);
        this.set("raceMillis","00");
        this.set("raceSeconds","00");
        this.setMaxSpeed();
    },

    checkIndex: function(index) {
        if (this.ridersList[index])
            return true;
        return false;
    },

    riders: computed("model", "addedRiders", function() {
        let ret = A();
        for (let i = 1; i <= this.settings.noOfBikes; i++) {
            ret.push(Rider.create({
                i: i,
                rider: this.ridersList[i],
                showCard: this.checkIndex(i),
                progressValue: 0,
                maxSpeed: 0,
                avgSpeed: 0,
                speed: 0,
                playerMins: "00",
                playerSecs: "00",
                playerMillis: "00",
                playerDistance: 0
            }))
        }
        return ret;
    }),

    image: computed('model.event', function() {
        if (this.model.event.image != null) {
            return this.rebornService.fileDownload(this.model.event.image);
        } else {
            return "/assets/sv_files/logo.svg"
        }
    }),

    settings: computed('model', 'model.settings', function() {
        return this.get('model.settings');
    }),

    setMaxSpeed() {
        let self = this;
        this.rebornService.getMaxSpeed().then(function(response) {            
            if (response.maxSpeed != 0) {
                self.set("maxSpeed", response.maxSpeed)
                self.set("nameMaxSpeed", response.participantName)
            } else {
                self.set("maxSpeed", 0)
                self.set("nameMaxSpeed", null)
            }
        }, function() {
            self.set('eventClosedError', true);
        });
    },

    onProgress: function(data) {
        if (data != null) {
            if (data.serial != null) {

                if (data.serial["CD"] != null) {
                    this.set("isCountDownOn", true)

                    if (data.serial["CD"] == "0") {
                        this.set("countDown", "GO!");


                        let self = this

                        setTimeout(function() {
                            self.set("isCountDownOn", false)
                        }, 300)

                    } else {
                        this.set("countDown", data.serial["CD"])
                    }
                }

                if(data.serial["race"]){
                  this.set("raceMillis", data.serial["race"].millis.toString().padStart(2, "0"));
                  this.set("raceSeconds", data.serial["race"].seconds.toString().padStart(2, "0"));
                }else{
                  this.set("raceMillis","00");
                  this.set("raceSeconds", "00");
                }
                

                for (let i = 1; i <= this.settings.noOfBikes; i++) {
                    if (data.serial["player" + i] != null && this.get("riders")[i - 1] != null) {
                        let currentProgress = data.serial["player" + i].progress;   
                        let speed = data.serial["player" + i].speed.toFixed(1);
                        let maxSpeed = data.serial["player" + i].maxSpeed.toFixed(1);
                        let avgSpeed = data.serial["player" + i].avgSpeed.toFixed(1);

                        let time = data.serial["player" + i].time;
                        let minutes = Math.floor(time / 60000).toString().padStart(2, "0");
                        let seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, "0");
                        let miliseconds = Math.floor(((time % 60000) % 1000) / 10).toString().padStart(2, "0");

                        this.get("riders")[i - 1].set("progressValue", currentProgress);
                        this.get("riders")[i - 1].set("maxSpeed", maxSpeed);
                        this.get("riders")[i - 1].set("avgSpeed", avgSpeed);
                        this.get("riders")[i - 1].set("speed", speed);
                        this.get("riders")[i - 1].set("rot", data.serial["player" + i].rot);
                        this.get("riders")[i - 1].set("finished", data.serial["player" + i].finished);
                        this.get("riders")[i - 1].set("playerMins", minutes);
                        this.get("riders")[i - 1].set("playerSecs", seconds);
                        this.get("riders")[i - 1].set("playerMillis", miliseconds);
                        this.get("riders")[i - 1].set("time", time);
                        this.get("riders")[i - 1].set("playerDistance", data.serial["player" + i].distance);
                    }
                }
            }


            if (data.serial.race != null) {
                if (data.serial.race.isFinished) {
                    this.websocketService.onDisconnect();
                    this.set("raceFinished", true);
                    this.toggleProperty("showWinner");
                    this.set("winnerID", data.serial.race.winner);
                    this.set("winner", data.serial["player" + this.get("winnerID")]);
                    for (let i = 1; i <= this.settings.noOfBikes; i++) {
                      let self=this;

                      this.rebornService.postResult(this.get('riders')[i - 1].maxSpeed, this.get('riders')[i - 1].avgSpeed, this.get("riders")[i - 1].time, this.settings.raceType, this.settings.raceValue, this.get('riders')[i - 1].rider.id).then(
                      function(){}, function() {
                        self.set('raceOnGoingError', true);
                      });
                    }
                }
            }
        }
    },

    onStop: function() {

        this.set("raceMillis","00");
        this.set("raceSeconds","00");
        for (let i = 0; i < this.settings.noOfBikes; i++) {
            this.riders[i].set("progressValue", 0);
            this.riders[i].set("maxSpeed", 0);
            this.riders[i].set("avgSpeed", 0);
            this.riders[i].set("speed", 0);
            this.riders[i].set("rot", 0);
            this.riders[i].set("finished", 0);
            this.riders[i].set("playerDistance", 0)
            this.riders[i].set("playerMins", "00");
            this.riders[i].set("playerSecs", "00");
            this.riders[i].set("playerMillis", "00");
        }
    },

    updateSettings() {
      let self = this;
      this.rebornService.getSettings().then(function(settings) {
        self.set("model.settings", settings);
      });
    },

    setDefaultSettings(){
      let self = this;
      this.rebornService.putSettingsNoRoller(this.model.event.nrOfBikes, this.model.event.raceType, this.model.event.raceValue).then(function(){
        self.updateSettings();
      });
    },
    
    clearPopUp: function() {
        this.set("raceOnGoingError", false);
        this.set("eventClosedError", false);
    },

    clearAll: function() {
        this.set("raceOnGoing", false);
        this.set('showWinner', false);
        this.set("winnerID", null);
        this.set('startOver', true);
        this.set('ridersList', A([null, null, null, null]));
        this.set("addedRiders", 0);
        this.set('canStartRace', false);
        this.set("raceFinished", false);
        this.set("showDropdowns", true);
        this.setMaxSpeed();
        this.clearPopUp();
    },

    actions: {
        sendAddedRiders: function(player, playerID) {
            if (!this.ridersList.includes(player)) {
                this.set('canStartRace', true);
                this.set("addedRiders", this.get("addedRiders") + 1);
                if (this.ridersList[playerID] === null) {
                    this.ridersList[playerID] = player;
                } else {
                    this.ridersList[playerID] = player;
                    this.set("addedRiders", this.get("addedRiders") - 1);
                }
            }
        },

        startRace: function() {
            let self = this;
            this.set("raceOnGoing", true);
            this.rebornService.verifyOpenEvent(this.model.eventId).then(function() {
              self.rebornService.putSettingsNoRoller(self.get("addedRiders"), self.settings.raceType, self.settings.raceValue);
              let wsocket = self.websocketService.onConnect();
              wsocket.on('raceData', self.onProgress, self);
              self.set('startOver', false);
              self.set("raceFinished", false);
            }, function(response) {
                if (response.status === self.errorCodeServerResponse) {
                    self.set("raceOnGoingError", true)
                    self.set("raceOnGoing",false);
                } else {
                    self.set('eventClosedError', true);
                    self.set("raceOnGoing",false);
                }
            })
        },
        

        stopRace: function() {
            this.set('raceOnGoing', false);
            this.onStop();
            this.websocketService.onDisconnect();
        },

        startOver: function() {
            if (this.showWinner) {
                this.set('raceOnGoing', false);
                this.set('showWinner', false);
                this.set("winnerID", null);
                this.set('startOver', true);
                this.set('ridersList', A([null, null, null, null]));
                this.set("addedRiders", 0);
                this.set('canStartRace', false);
                this.set("raceFinished", false);
                this.setDefaultSettings();
                this.onStop();
                this.setMaxSpeed();
            }
        },

        closeAllDropdowns: function() {
            this.set("showDropdowns", false);
        },

        clickedDropdown: function() {
            this.set("showDropdowns", true);
        },

        keepItOpen: function() {
            this.set("showDropdowns", true);
        },

        setRaceOnGoingErrorToFalse: function() {
            this.set("raceOnGoingError", false);
        },

        clearPage() {
            this.clearAll();
        },

        clearPagePopUp() {
            this.clearPopUp()
        },
    }
});