import Component from '@ember/component';
import { computed } from '@ember/object';
import { capitalize } from '@ember/string';

export default Component.extend({

  init(){
    this._super(...arguments);
  },

  playersListA: computed("searchValue", function(){
    const searchValue = this.get("searchValue");
    if(searchValue == "" || !searchValue){
      return this.get("playersA");
    }
    var sv = searchValue.trim();
    return this.get("playersA").filter(function(item){
      var nm = item.name;
      return nm.includes(capitalize(sv));
    });

  }),

  actions: {
    setPlayer(player,id) {
      //trigger action on parent component 
      this.onConfirmPlayer(player, id);
    },

    showList: function() {
      this.onClickDropdown(this.get("riderInfo.i"));
    },

    empty: function() {
      // Used to stop event propagation
    }
  }
});
