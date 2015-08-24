import Router from '../common/router';
import AboutRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  routes: {
    'about': 'about'
  },

  about() {
    return new AboutRoute({
      container: this.container
    });
  }
});
