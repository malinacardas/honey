import Component from '@ember/component';

export default Component.extend({
    tagName: 'circle',
    cx: "50%",
    cy: "50%",
    r:0,
    attributeBindings: ['cx','cy','r','style'],

});
