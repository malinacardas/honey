import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Component.extend({

  init(){
    this._super(...arguments);
    this.set('pAvailable', A());
    this.set('pNAvailable', A());
    this.set("dropdownShown", false);
    this.separatePlayers();
    var currentRider = this.get('rider');
    if(currentRider){
      let name = currentRider.name;
      this.set('riderNameS',this.shortenedName(name));
    }
  },

   dropdownShownP: computed("dropdownShown", "showDropdowns", function(){
      if(!this.get("showDropdowns")){
        return false;
      }else{
        return this.get("dropdownShown");
      }
   }),

   didUpdateAttrs(){
     if(!this.get("showDropdowns")){
       this.set("dropdownShown", false);
     }
   },

  actions:{
    setPlayerInButton: function(player, plID){
      this.onSendPlayerToGrid(player, plID);
      this.set("dropdownShown", false);
    },

    clickedDropdown: function(rid){
      this.toggleProperty("dropdownShown");
      this.onClickDropdown(rid);
    },

    closePlayerCard: function(id) {
      this.onSendCardId(id);
    },

    keepItOpen: function(){
      this.set("dropdownShown", true);
      this.onKeepItOpen();
    }
  },

    separatePlayers: function() {
        let playersAll = this.get('players');
        let unav = this.get('selectedPlayers');
        if (playersAll != null && unav != null) {
            for (let i = 0; i < playersAll.length; i++) {
                if (!unav.includes(playersAll[i])) {
                    this.pAvailable.pushObject(playersAll[i]);
                }
            }
            for (let i = 1; i < 5; i++) {
                if (unav[i] != null)
                    this.pNAvailable.pushObject(unav[i]);
            }
        }
        this.pAvailable.reverse();
    },

    shortenedName: function(name) {
        var res = name.split(" ");
        let lastName = res[res.length - 1];
        var newN = res[0] + " " + lastName[0];
        return newN;
    },

});
