import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:events/edit');
    assert.ok(route);
  });
});
