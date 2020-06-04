import Component from '@ember/component';

export default Component.extend({

  actions: {
    setPlayerInGrid: function(player, playerID) {
      this.onSendRider(player, playerID);
    },

    clickedDropdown: function(rid){
      this.set("openDropdownId", rid);
      this.onClickDropdown();
    },

    keepItOpen: function(){
      this.onKeepItOpen();
    }
  },

  init(){
    this._super(...arguments);
    this.set("openDropdownId",0);
  }
 
});