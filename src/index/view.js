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

  onShow() {
  	this.ui.carousel.carousel({
	    interval: 5600,
	    pause: false
		});
    this.ui.carousel.addClass('active');
    $('.mb-model-navigation-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  },

  slideStart(e) {
    this.ui.carousel.removeClass('active');
  },

  slideEnd(e) {
    this.ui.carousel.addClass('active');
  },
});