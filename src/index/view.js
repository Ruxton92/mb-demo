import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

import CatalogueView from '../catalogue/view';

import IndexModel from './model';


export default LayoutView.extend({
  template: template,
  className: 'index',

  regions: {
    catalogueRegion: ".mb-catalogue-region"
  },

  ui: {
  	'carousel': '.mb-carousel',
  	'progress': '.progress-bar',
    'slides': '.mb-carousel .item'
  },

  events: {
    "slide.bs.carousel @ui.carousel": "slideStart",
    "slid.bs.carousel @ui.carousel": "slideEnd",
    "mouseenter @ui.carousel": 'pauseStart',
    "mouseleave @ui.carousel": 'pauseEnd',
  },

  initialize() {
  },

  onShow() {
    let catalogueCollection = new Backbone.Collection(this.model.get('catalogue').items);
    this.catalogueView = new CatalogueView({collection: catalogueCollection});
    this.catalogueRegion.show(this.catalogueView);

    this.slidesNum = this.ui.slides.length;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
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
    if (this.currentSlide == this.slidesNum) this.currentSlide = 1;
    else this.currentSlide += 1;
    this.ui.progress.css('width', this.interval * (this.currentSlide) + '%');
  },

  slideEnd(e) {
  },
});
