import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
    this.route('index', { path: '/' });
    this.route('events', { path: '/user' }, function() {
        this.route('index', { path: '/' });
        this.route('create', { path: '/create' });
        this.route('show', { path: '/:id', page: { refreshModel: true }});
        this.route('edit', { path: '/:id/edit' });
        this.route('results', { path: '/:id/results' });
    });
    this.route('registration', { path: '/registration' });
});

export default Router;