import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

import ModalService from '../../modal/service';
import SpinnerService from '../../spinner/spinner-service';

import SelectCarModalView from '../../modal/select_car/view';
import CatalogueCollection from './collection';


export default ItemView.extend({
  template: template,
  className: 'mb-compare-page-wrapper',

  ui: {
    'next': '.js-next',
    'carousel': '.mb-carousel',
    'progress': '.progress-bar',
    'slides': '.mb-carousel .item',
    'buttonNext': '.right',
    'buttonPrev': '.left',
    'selectCarButton': '.mb-compare-car-block-empty',
  },

  templateHelpers() {
    // return {
    //   'id': this.model.get('stageModules')[0].data[0].offerNumber,
    // }
  },

  initialize() {
    this.compareView = false;
  },

  events: {
    'mouseEnter @ui.carousel': 'carouselMouseEnter',
    'mouseLeave @ui.carousel': 'carouselMouseLeave',
    'click @ui.buttonPrev': 'carouselPrev',
    'click @ui.buttonNext': 'carouselNext',
    'click @ui.selectCarButton': 'openSelectCarModal',
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

  activateCompareView() {
    this.compareView = true;
  },

  deactivateCompareView() {
    this.compareView = false;
  },

  carouselMouseEnter(e) {
    e.preventDefault();
    console.debug('carouselMouseEnter');
    this.trigger('carousel:enter');
  },

  carouselMouseLeave(e) {
    e.preventDefault();
    console.debug('carouselMouseLeave');
    this.trigger('carousel:leave');
  },

  carouselPrev(e) {
    e.preventDefault();
    this.ui.carousel.carousel('prev');
  },

  carouselNext(e) {
    e.preventDefault();
    this.ui.carousel.carousel('next');
  },

  openSelectCarModal(e) {
    e.preventDefault();
    let catalogueCollection = new CatalogueCollection();
    this.listenTo(catalogueCollection, 'request', this.showSpinner);
    this.listenTo(catalogueCollection, 'sync', this.hideSpinner);
    catalogueCollection.fetch({
      'success': ()=> {
        let catalogueView = new SelectCarModalView({collection: catalogueCollection});
        ModalService.request('open', catalogueView);
      }
    });
  },

  showSpinner() {
    SpinnerService.request('showSpinner');
  },

  hideSpinner() {
    SpinnerService.request('hideSpinner');
  },
});
