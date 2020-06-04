import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'path',
    cx: "-50%",
    cy: "-50%", //center of circle
    rx:0, //radius
    t1:4.7, // start
    delta:1.6, //end of trail
    omega : 6.28, // rotation
    d: "",
    transform:computed('progress', function(){
        return `scale(-1, 1) rotate(${-this.progress*3.6})`;
    }),
    attributeBindings: ['transform','d'],



    matrixTimes:function([[a,b], [c,d]], [x,y]){
    
       return [ a * x + b * y, c * x + d * y];
    },
    
    rotateMatrix: function(x){ 
        return [[Math.cos(x),-Math.sin(x)], [Math.sin(x), Math.cos(x)]];
    },
    
    vecAdd: function([a1, a2], [b1, b2]){
        return [a1 + b1, a2 + b2];
    },
    renderPath(){
        var halfWidth = this.$().parents('svg').width()/2;
        this.set("cx",halfWidth);
        this.set("cy",halfWidth);
        this.set("rx",halfWidth/(100/this.position));
        this.set("d", this.svgEllipseArc(this.cx,this.cy,this.rx,this.t1,this.delta,this.omega));
    },
    svgEllipseArc:  function(cx,cy, rx, t1, Δ, φ){
        Δ = Δ % (2*Math.PI);
        const rotMatrix = this.rotateMatrix (φ);
        const [sX, sY] = ( this.vecAdd ( this.matrixTimes ( rotMatrix, [rx * Math.cos(t1), rx * Math.sin(t1)] ), [cx,cy] ) );
        const [eX, eY] = ( this.vecAdd ( this.matrixTimes ( rotMatrix, [rx * Math.cos(t1+Δ), rx * Math.sin(t1+Δ)] ), [cx,cy] ) );
        const fA = ( (  Δ > Math.PI) ? 1 : 0 );
        const fS = ( (  Δ > 0 ) ? 1 : 0 );
        return "M " + sX + " " + sY + " A " + [ rx , rx , φ / (2*Math.PI) *360, fA, fS, eX, eY ].join(" ")
        },
    didInsertElement(){
        this.renderPath();
        let self = this;
        this.$(window).resize(function(){
            self.renderPath()
        })
     
    },
    
    willDestroyElement() {
        this.$(window).off("resize")
        this._super(...arguments);
      },


});
