import Service from 'backbone.service';
import View from './spinner-view';
import Radio from 'backbone.radio';

const SpinnerService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.view = new View();
    this.container.show(this.view);
    this.overlayChannel = Radio.channel('overlay');
  },

  requests: {
    default: '',
    showSpinner: 'showSpinner',
    hideSpinner: 'hideSpinner'
  },

  showSpinner() {
    this.view.$el.show();
    this.overlayChannel.trigger('overlay:show');
  },

  hideSpinner() {
    this.view.$el.hide();
    this.overlayChannel.trigger('overlay:hide');
  }
});

export default new SpinnerService();
