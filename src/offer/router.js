import Router from '../common/router';
import OfferRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  routes: {
    'offer': 'offer'
  },

  offer() {
    return new OfferRoute({
      container: this.container
    });
  }
});
