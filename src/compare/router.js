import Router from '../common/router';
import FooterService from '../footer/footer-service';
import HeaderService from '../header/header-service';
import CompareRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'compare': 'compare'
  },

  compare() {
    return new CompareRoute({
      container: this.container
    });
  }
});
