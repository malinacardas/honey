import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'rect',
    width:0,
    height:0,
    x:"49%",
    y:"1.4%",
    transform: "rotate(0)",
    attributeBindings: ['x','y','transform'],
    
    angle:computed('progress', function(){
        return this.progress*3.6 ;
    }),

    didRender: function(){
        this.set("transform",`rotate(${this.angle})`)
    }

});

