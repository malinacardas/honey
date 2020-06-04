import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | results-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set("results", []);
    this.set("event", {raceType: null, raceValue: null});
    await render(hbs`<ResultsTable @results={{results}} @event={{event}}/>`);

    assert.equal(this.element.textContent.includes("ALL"), true);
    assert.equal(this.element.textContent.includes("WOMEN"), true);
    assert.equal(this.element.textContent.includes("MEN"), true);
    assert.equal(this.element.textContent.includes("KIDS"), true);
    assert.equal(this.element.textContent.includes("CUSTOM RACE"), true);

    assert.equal(this.element.textContent.includes("Name"), true);
    assert.equal(this.element.textContent.includes("Age"), true);
    assert.equal(this.element.textContent.includes("Gender"), true);
    assert.equal(this.element.textContent.includes("AvgSpeed"), true);
    assert.equal(this.element.textContent.includes("MaxSpeed"), true);
    assert.equal(this.element.textContent.includes("Time"), true);

    assert.equal(this.element.textContent.includes("Distance"), true);
  })
   
});
