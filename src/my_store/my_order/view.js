import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';


export default LayoutView.extend({
  template: template,
  className: 'mb-my-offers-page-wrapper mb-checkout-page-wrapper',

  regions: {
  },

  templateHelpers() {
    return {
      'id': this.model.get('stageModules')[0].data[0].offerNumber,
    }
  },

  ui: {
    'next': '.js-next',
    'carousel': '.mb-carousel',
    'progress': '.progress-bar',
    'slides': '.mb-carousel .item',
    'buttonNext': '.right',
    'buttonPrev': '.left',
    'selectCarButton': '.mb-compare-car-block-empty',
    'resetButton': '.mb-reset-button',
  },

  events: {
    'mouseenter @ui.carousel': 'carouselMouseEnter',
    'mouseleave @ui.carousel': 'carouselMouseLeave',
    "slide.bs.carousel @ui.carousel": "slideStart",
  },

  onShow() {
    this.ui.carousel.carousel({
      interval: false
    });
    this.slidesNum = 2;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
  },

  slideStart(e) {
    if(e.direction == 'left') {
      if (this.currentSlide == this.slidesNum) this.currentSlide = 1;
      else this.currentSlide += 1;
    }
    else {
      if (this.currentSlide == 1) this.currentSlide = this.slidesNum;
      else this.currentSlide -= 1;
    }
    this.ui.progress.css('width', this.interval * (this.currentSlide) + '%');
  },

});
