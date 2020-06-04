import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:events/create');
    assert.ok(route);
  });
});
