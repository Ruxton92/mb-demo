import Router from '../common/router';
import FooterService from '../footer/footer-service';
import HeaderService from '../header/header-service';
import ModelsRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'models': 'models'
  },

  models() {
    return new ModelsRoute({
      container: this.container
    });
  }
});
