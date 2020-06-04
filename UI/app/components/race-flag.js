import Component from '@ember/component';
import { computed } from '@ember/object';

function createAxisArray(times) {
  let arr = [];
  for (let i =0; i<times; i++){
      arr.push(i);
  }
  return arr;
}

export default Component.extend({
    tagName:"svg",
    xAxis: computed('xTimes', function() {
      return createAxisArray(this.get("xTimes"))
    }),
    
    yAxis: computed('yTimes', function() {
      return createAxisArray(this.get("yTimes"))
    }),

    setSize(){
      this.set("size", this.$().width() / this.yTimes) ;
    },
  

    didInsertElement(){
      let self =this;
      this.setSize();
      this.set("inserted",true);
      this.$(window).resize(function(){
        self.setSize();
      })
    },

    willDestroyElement() {
      this.$(window).off("resize")
      this._super(...arguments);
    }
});

