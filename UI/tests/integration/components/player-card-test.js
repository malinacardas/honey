import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | player-card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<PlayerCard />`);

    assert.notEqual(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <PlayerCard>
        template block text
      </PlayerCard>
    `);

    assert.notEqual(this.element.textContent.trim(), 'template block text');
  });
});
