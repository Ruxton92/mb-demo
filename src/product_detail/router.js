import Router from '../common/router';
import FooterService from '../footer/footer-service';
import HeaderService from '../header/header-service';
import ProductDetailRoute from './route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  onBeforeEnter() {
    FooterService.request();
    HeaderService.request();
  },

  routes: {
    'product/:id': 'productDetail'
  },

  productDetail(id) {
    return new ProductDetailRoute({
      container: this.container,
      productID: id
    });
  }
});
