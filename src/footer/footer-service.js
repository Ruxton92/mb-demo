import Service from 'backbone.service';
import View from './footer-view';

const FooterService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.view = new View();
    this.container.show(this.view);
  },

  requests: {
    default: ''
  }
});

export default new FooterService();
