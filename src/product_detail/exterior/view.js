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
    'progress': '.progress-bar',
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
      interval: 2000,
    }).carousel('pause');
    this.$el.find('.item:first').addClass('active');
    this.slidesNum = this.collection.length;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
    this.ui.carousel.addClass('active');
    $(window).on("scroll", this.checkScroll);
  },

  showExteriorModal(e) {
    e.preventDefault();
    
    let extDay = this.model.get('stageModules')[0].data[0].car.images360ExtDayClosed;
    let extNight = this.model.get('stageModules')[0].data[0].car.images360ExtNightClosed;
    let slidesExt = [];
    for (let i = 0; i < extDay.length; i++) {
      slidesExt.push({day: extDay[i].md.url, night: 'http://placehold.it/1305x734'});
    }
    this.exteriorSlidesCollection = new Backbone.Collection(slidesExt);
    let view = new ExteriorModalView({collection: this.exteriorSlidesCollection});
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

  checkScroll(e) {
    e.preventDefault();
    if ($('.mb-model-detail-exterior-region').length) {
      let exterior = $('.mb-model-detail-exterior-region').offset().top;
      let height = $('.mb-model-detail-navigation').height();
      let total = $(window).scrollTop();
      let topBorder = exterior - height;
      let bottomBorder = exterior + height * 2;
      if ((total > topBorder) && (total < bottomBorder)) {
        $('.mb-carousel').carousel('cycle');
      } else {
        $('.mb-carousel').carousel('pause');
      }
    }
    
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

