import Router from '../common/router';
import CatalogueRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  routes: {
    'catalogue': 'catalogue'
  },

  catalogue() {
    return new CatalogueRoute({
      container: this.container
    });
  }
});
