import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'index',

  ui: {
  	'carousel': '.mb-carousel',
  	'progress': '.progress-bar',
  },

  events: {
    "slide.bs.carousel @ui.carousel": "slideStart",
    "slid.bs.carousel @ui.carousel": "slideEnd",
    "mouseenter @ui.carousel": 'pauseStart',
    "mouseleave @ui.carousel": 'pauseEnd',
  },

  onRender() {
  	this.ui.carousel.carousel({
	    interval: 5600,
	    pause: false
		});
    this.ui.carousel.addClass('active');
  },

  slideStart(e) {
    this.ui.carousel.removeClass('active');
  },

  slideEnd(e) {
    this.ui.carousel.addClass('active');
  },
});