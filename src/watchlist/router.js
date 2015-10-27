import Router from '../common/router';
import FooterService from '../footer/footer-service';
import HeaderService from '../header/header-service';
import WatchlistRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'watchlist': 'watchlist'
  },

  watchlist() {
    return new WatchlistRoute({
      container: this.container
    });
  }
});
