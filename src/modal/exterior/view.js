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
    'switchLight': '.js-switch-light',
    'progress': '.progress-bar',
    'slides': '.mb-carousel .item'
  },

  events: {
    'click @ui.switchLight': 'switchLight',
    "slide.bs.carousel @ui.carousel": "slideStart",
    "slid.bs.carousel @ui.carousel": "slideEnd",
    "mouseenter @ui.carousel": 'pauseStart',
    "mouseleave @ui.carousel": 'pauseEnd',
  },

  initialize() {
    this.lightOn = true;
  },

  onModalShow() {
    this.ui.carousel.carousel({
      interval: false
    });
    this.$el.find('.item:first').addClass('active');
    this.slidesNum = this.collection.length;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
    this.ui.carousel.addClass('active');
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

  slideStart(e) {
    if (this.currentSlide == this.slidesNum) this.currentSlide = 1;
    else  {
      if(e.direction == 'left') {
        this.currentSlide += 1;
      }
      else {
        this.currentSlide -= 1;
      }
    }
    this.ui.progress.css('width', this.interval * (this.currentSlide) + '%');
  },
});