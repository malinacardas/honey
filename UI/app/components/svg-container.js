import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'svg',
    progresThreshold: 40,
    increment:0.6,
    highThresh:400,
    lowerThresh:20,
    speed:6.5,
    calculateGradientPosition(progres){
        if(progres > this.progresThreshold){
            return this.lowerThresh;
        }
        return this.lowerThresh + (this.highThresh - this.lowerThresh) * Math.pow(1 - progres/this.progresThreshold,this.speed)
    },
    gradient1: computed('progress1', function() {
        return this.calculateGradientPosition(this.progress1);
     }),

    gradient2: computed('progress2', function() {
        return this.calculateGradientPosition(this.progress2);
    }),
    gradient3: computed('progress3', function() {
        return this.calculateGradientPosition(this.progress3);
    }),
    gradient4: computed('progress4', function() {
        return this.calculateGradientPosition(this.progress4);
    }),
});
