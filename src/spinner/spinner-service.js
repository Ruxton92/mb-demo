import Service from 'backbone.service';
import View from './spinner-view';

const SpinnerService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.view = new View();
    this.container.show(this.view);
  },

  requests: {
    default: '',
    showSpinner: 'showSpinner',
    hideSpinner: 'hideSpinner'
  },

  showSpinner() {
    this.view.$el.show();
  },

  hideSpinner() {
    this.view.$el.hide();
  }
});

export default new SpinnerService();
