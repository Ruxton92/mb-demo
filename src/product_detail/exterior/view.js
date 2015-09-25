import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import itemTemplate from './slide_template.hbs';

import ModalService from '../../modal/service';

import ExteriorModalView from '../../modal/exterior/view';


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
  template: template,
  className: 'mb-model-detail-exterior-block',
  childView: SlideView,
  childViewContainer: '.carousel-inner',

  ui: {
    'carousel': '.mb-carousel',
    'switchLight': '.js-switch-light',
    'slides': '.mb-carousel .item'
  },

  events: {
    'click .js-exterior-modal': 'showExteriorModal',
    'click @ui.switchLight': 'switchLight',
    "slide.bs.carousel @ui.carousel": "slideStart",
    "slid.bs.carousel @ui.carousel": "slideEnd",
    "mouseenter @ui.carousel": 'pauseStart',
    "mouseleave @ui.carousel": 'pauseEnd',
  },

  initialize() {
    this.lightOn = true;
  },

  onShow() {
    this.ui.carousel.carousel({
      interval: 100,
    });
    this.$el.find('.item:first').addClass('active');
    this.ui.carousel.addClass('active');
  },

  showExteriorModal(e) {
    e.preventDefault();

    let view = new ExteriorModalView({collection: this.collection});
    ModalService.request('open', view);
  },

  switchLight() {
    if (this.lightOn) {
      this.$el.find('.car-day').addClass('hidden');
      this.$el.find('.car-night').removeClass('hidden');
      this.lightOn = false;
      this.$el.addClass('night-mode');
    } else {
      this.$el.find('.car-day').removeClass('hidden');
      this.$el.find('.car-night').addClass('hidden');
      this.lightOn = true;
      this.$el.removeClass('night-mode');
    }
  },
});

