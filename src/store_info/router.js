import Router from '../common/router';
import FooterService from '../footer/footer-service';
import HeaderService from '../header/header-service';
import StoreInfoRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'storeinfo': 'storeInfo'
  },

  storeInfo() {
    return new StoreInfoRoute({
      container: this.container
    });
  }
});
