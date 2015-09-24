import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import compositeTemplate from './template.hbs';
import itemTemplate from './slide_template.hbs';


let SlideView = ItemView.extend({
  template: itemTemplate,
  className: 'item',

  ui: {
  },

  events: {
  },

  initialize() {
  }

});


export default CompositeView.extend({
  template: compositeTemplate,
  className: 'mb-fullscreen-modal-content',
  childView: SlideView,
  childViewContainer: '.carousel-inner',

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
  },

  ui: {
    'carousel': '.mb-carousel',
    'switchLight': '.js-switch-light'
  },

  events: {
    'click @ui.switchLight': 'switchLight'
  },

  initialize() {
    this.lightOn = true;
  },

  onModalShow() {
    this.ui.carousel.carousel({
      interval: false
    });
    this.$el.find('.item:first').addClass('active');
  },

  switchLight() {
    if (this.lightOn) {
      this.$el.find('.car-day').addClass('hidden');
      this.$el.find('.car-night').removeClass('hidden');
      this.lightOn = false;
    } else {
      this.$el.find('.car-day').removeClass('hidden');
      this.$el.find('.car-night').addClass('hidden');
      this.lightOn = true;
    }
  }
});