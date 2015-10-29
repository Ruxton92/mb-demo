import Router from '../../common/router';
import FooterService from '../../footer/footer-service';
import HeaderService from '../../header/header-service';
import Route from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'mydata': 'myData'
  },

  myData() {
    return new Route({
      container: this.container
    });
  }
});
