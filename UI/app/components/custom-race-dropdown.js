import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({

  rebornService: service('reborn-service'),
  minRaceValue:0,
  maxRaceValue:10000,

  raceTypes: computed('settings.raceType', function(){
    if(this.get("settings.raceType") === 'm')
      return ['m','s'];
    return ['s','m'];
  }),

  init(){
    this._super(...arguments);
    this.set("isDropdownOpen", false);
  },

  updateSettings(){
    this.rebornService.putSettingsNoRoller(this.settings.noOfBikes, this.settings.raceType, this.settings.raceValue);
  },

  validateNewRaceValue(){
    return this.settings.raceValue > this.minRaceValue && this.settings.raceValue < this.maxRaceValue;
  },

  resetToDefaultSettings(){
    this.set("settings.raceValue", this.get("event.raceValue"));
    this.set("settings.raceType", this.get("event.raceType"));
    this.rebornService.putSettingsNoRoller(this.settings.noOfBikes, this.settings.raceType, this.settings.raceValue);
  },


  actions:{
    
    setRace(raceType){
      if(this.validateNewRaceValue()){
        this.set("settings.raceType", raceType);
        this.updateSettings();
      }else{
        this.resetToDefaultSettings();
      }
      this.set("isDropdownOpen", false);
    },

    showDropdown(){
      this.set("isDropdownOpen", true);
    },

    setOnlyRaceValue() {
      this.set("isDropdownOpen", false);
      if(this.validateNewRaceValue()){
        this.updateSettings();
      }else{
        this.resetToDefaultSettings();
      }

      document.getElementById("race-value-input").blur();
    }
  }

});
