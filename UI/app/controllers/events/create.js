import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject } from '@ember/controller';

export default Controller.extend({
    nrOfBikes: 2,
    error: null,
    photo: null,
    hardwareConnStatus: "",
    RANDOM: "X",
    PERSONALIZED: null,
    WATT: null,
    time: null,
    distance: "X",
    type: "m",
    isEventNameValid: true,
    isRollerValid: true,
    isBikesValid: true,
    isValueValid: true,
    rebornS: service('reborn-service'),
    roller: 114.3,
    hideBikes: false,
    eventOpenError: false,
    errorMessageOpenEvent: "An event is already open. In order to create a new one, close the existing event from events dashboard ",
    showController: inject('events.show'),
    account:"",
    username:"",
    password:"",
    userId:1,

    savePassword(account,username,password,userId){
        let self=this;
        this.rebornS.postPassword(1,account,username,password).then(function(){
            self.set("account", null);
            self.set("username", null);
            self.set("password", null);
            self.transitionToRoute('events.index');
        })
    },
    saveEvent(eventName, image, racetype, nrOfBikes, value, roller) {
        let self = this;
        this.rebornS.postEvent(eventName, image, racetype, nrOfBikes, value).then(function (response) {
            self.rebornS.putSettings(nrOfBikes, roller, racetype, value).then(function() {
                self.rebornS.setStatus(response.id).then(function () {
                    self.get('showController').send('clearPage');
                    self.transitionToRoute('events.show', response.id);
                    self.set("nrOfBikes", 2);
                    self.set("error", null)
                    self.set("photo", null)
                    self.set("hardwareConnStatus", "")
                    self.set("KPH", "X")
                    self.set("MPH", null)
                    self.set("WATT", null)
                    self.set("time", null)
                    self.set("distance", "X")
                    self.set("type", "m")
                    self.set("isEventNameValid", true)
                    self.set("isRollerValid", true)
                    self.set("isBikesValid", true)
                    self.set("isValueValid", true)
                    self.set("roller", 114.3)
                    self.set("name", "")
                    self.set("raceValue", "")
                });
            });
        }, function() {
            self.set('eventOpenError', true);
        })
    },
    
    validateEventName(eventN) {

        if (eventN == null) {
            return false
        } else {
            let en = eventN.toString()
            let eventName = en.trim()
            if (eventName == "") {
                return false;
            }
        }
        return true
    },
    validateRoller(roller) {
        if (isNaN(roller) || roller == 0) {
            return false
        }
        return true
    },

    validateValue(value) {
        if (value == null || value == 0) {
            return false
        } else {
            let val = value.trim();
            if (!(val.match(/^[0-9]+$/))) {
                return false
            }
        }
        return true
    },

    actions: {
        setNrOfBikes(nrOfBikes) {
            this.set("nrOfBikes", nrOfBikes)
        },

        setKey(key) {
            let value = this.get(key);

            if (value == null) {
                this.set(key, "X")
            } else {
                this.set(key, null)
            }
        },

        setPlaceholder(value) {
            let t = this.get("type");

            if (t != value) {
                this.set("type", value);
            } else {
                if (value == "s") {
                    this.set("type", "m");
                } else {
                    this.set("type", "s");
                }
            }
        },

        async checkHard() {
            let self = this;
            await this.rebornS.getSettings().then(resp => {
                if (resp.hardwareConnStatus) {
                    self.set("hardwareConnStatus", "ON");
                } else {
                    self.set("hardwareConnStatus", "OFF");
                }
            })
        },

        upload(file) {
            this.set("photo", file);
        },

        createPassword: function(){
            let account=this.get("account")
            let username=this.get("username")
            let password=this.get("password")
            let idUser=this.get("idUser")
            console.log("adding new password",account,username,password)
            this.savePassword(account,username,password,idUser)
        },
        

        createEvent: function () {
            let eventName = this.get("name")
            let roller = this.get("roller");
            let value = this.get("raceValue")
            let type = this.get("distance")
            var racetype;
            this.set("isEventNameValid", this.validateEventName(eventName))
            this.set("isRollerValid", this.validateRoller(roller))
            this.set("isValueValid", this.validateValue(value))
            this.set("error", false)
            if (!this.get("isEventNameValid") || !this.get("isRollerValid") || !this.get("isValueValid")) {
                this.set("error", true)
            }

            if (type == "X") {
                racetype = "m"
            } else {
                racetype = "s"
            }
            if (!this.get("error")) {
                let file = this.get('photo');
                if (file != null) {
                    this.rebornS.fileUpload(file).then((file) => {
                        this.saveEvent(eventName, file.body.image_location, racetype, this.get("nrOfBikes"), value, roller)
                    });
                } else {
                    this.saveEvent(eventName, null, racetype, this.get("nrOfBikes"), value, roller)
                }
            }
        },

        hide(){
            this.set("hideBikes", true);
        },

        unhide(){
            this.set("hideBikes", false);
        },

        setEventOpenErrorToFalse() {
            this.set("eventOpenError", false);
        }
    },
});
