import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | race-track', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RaceTrack />`);

    assert.notEqual(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <RaceTrack>
      
      </RaceTrack>
    `);

    assert.notEqual(this.element.textContent.trim(), '');
  });
});
