import Router from '../common/router';
import ContactRoute from './route';
import FooterService from '../footer/footer-service';
import HeaderService from '../header/header-service';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'contact': 'contact'
  },

  contact() {
    return new ContactRoute({
      container: this.container
    });
  }
});
