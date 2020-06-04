import DS from 'ember-data';
import ENV from 'ui/config/environment';

export default DS.JSONAPIAdapter.extend({
    host: ENV.APP.host + ":" + ENV.APP.port,
});