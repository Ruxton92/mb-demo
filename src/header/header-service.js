import Service from 'backbone.service';
import View from './header-view';

const HeaderService = Service.extend({
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

export default new HeaderService();
