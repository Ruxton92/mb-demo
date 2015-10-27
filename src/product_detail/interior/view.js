import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import itemTemplate from './slide_template.hbs';

import ModalService from '../../modal/service';

import InteriorModalView from '../../modal/interior/view';


let SlideView = ItemView.extend({
  template: itemTemplate,
  className: 'mb-interior-large-photo col-xs-12 col-sm-6 item',

  ui: {
  },

  events: {
  },

  initialize() {
  }

});


export default CompositeView.extend({
  template: template,
  className: 'mb-model-detail-interior-block row',
  childView: SlideView,
  childViewContainer: '.mb-interior-large-photo-block, .carousel-inner',

  ui: {
    'carousel': '.mb-carousel',
    'switchLight': '.js-switch-light',
    'openModal': '.js-interior-modal',
    'slides': '.mb-carousel .item',
    'progress': '.progress-bar',
  },

  events: {
    'click @ui.openModal': 'showInteriorModal',
  },

  initialize() {
  },

  onShow() {
    this.$el.find('.mb-interior-large-photo').slice(0,2).addClass('active');
    this.ui.carousel.carousel({
      interval: 2000,
      
    }).carousel('pause');
    this.ui.carousel.find('.item:first').addClass('active');
    this.slidesNum = this.collection.length;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
    this.ui.carousel.addClass('active');
  },

  showInteriorModal(e) {
    e.preventDefault();
    let view = new InteriorModalView({collection: this.collection});
    ModalService.request('open', view);
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

