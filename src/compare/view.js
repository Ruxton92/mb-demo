import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import CarView from './car_view/view'


export default LayoutView.extend({
  template: template,
  className: 'mb-compare-page-wrapper',

  regions: {
    leftCar: '.mb-compare-car-block-left',
    rightCar: '.mb-compare-car-block-right'
  },

  ui: {
    'pageWrapper': '.index__billboard',
    'compareButton': '.mb-compare-car-photos-button',
    'compareButtonClose': '.mb-compare-car-photos-button-close',
    'leftCar': '.mb-compare-car-block-left',
    'rightCar': '.mb-compare-car-block-right',
    'carousel': '.mb-compare-gallery .carousel',
    'movePhotoButtons': '.mb-compare-photos-control',
    'comparePhotoOverlay': '.mb-compare-gallery-model-1',
    'comparePhotoDraggable': '.mb-compare-photos-draggable',
  },

  events: {
    "click @ui.compareButton": 'activateCompareView',
    "click @ui.compareButtonClose": 'closeActivateCompareView',
    'click @ui.movePhotoButtons': 'movePhoto',   
    'mousedown @ui.comparePhotoDraggable': 'startDrag',   
    'mouseup @ui.pageWrapper': 'stopDrag',   
    'mousemove @ui.pageWrapper': 'onDrag',
    'slid.bs.carousel @ui.carousel': 'slid',  
  },

  templateHelpers() {
    let comparePhotos = [];
    if (this.model1.get('stageModules').length) {
      for (let i = 0; i < this.model1.get('stageModules')[0].data[0].car.images360ExtDayClosed.length; i++) {
        comparePhotos.push({
          'model1': this.model1.get('stageModules')[0].data[0].car.images360ExtDayClosed[i],
          'model2': this.model2.get('stageModules')[0].data[0].car.images360ExtDayClosed[i],
        });
      }
    }
    return {
      'comparePhotos': comparePhotos
    }
  },

  initialize(data) {
    this.model1 = data.model1;
    this.model2 = data.model2;
    this.model1.set('model', 'model1');
    this.model2.set('model', 'model2');
  },

  onShow() {
    this.leftCarView = new CarView({model: this.model1});
    this.rightCarView = new CarView({model: this.model2});
    this.leftCar.show(this.leftCarView);
    this.rightCar.show(this.rightCarView);

    this.listenTo(this.leftCarView, 'carousel:enter', this.carouselMouseEnter);
    this.listenTo(this.leftCarView, 'carousel:leave', this.carouselMouseLeave);
    this.listenTo(this.leftCarView, 'car:selected', this.carSelected);

    this.listenTo(this.rightCarView, 'carousel:enter', this.carouselMouseEnter);
    this.listenTo(this.rightCarView, 'carousel:leave', this.carouselMouseLeave);
    this.listenTo(this.rightCarView, 'car:selected', this.carSelected);
  },

  activateCompareView(e) {
    e.preventDefault();
    this.ui.leftCar.addClass('active-compare-view');
    this.ui.rightCar.addClass('active-compare-view');
    this.leftCarView.activateCompareView();
    this.rightCarView.activateCompareView();
    this.ui.carousel.parent().removeClass('hide');
    this.ui.carousel.find('.item:first').addClass('active');
    this.ui.carousel.find('.mb-compare-gallery-model-1 img').css('min-width', this.ui.carousel.find('.mb-compare-gallery-model-2').css('width'));
    this.ui.compareButton.addClass('hide')
    this.ui.compareButtonClose.removeClass('hide')
  },

  closeActivateCompareView(e) {
    e.preventDefault();
    this.ui.leftCar.removeClass('active-compare-view');
    this.ui.rightCar.removeClass('active-compare-view');
    this.leftCarView.deactivateCompareView();
    this.rightCarView.deactivateCompareView();
    this.ui.carousel.parent().addClass('hide');
    this.ui.carousel.find('.item').removeClass('active');
    this.ui.compareButtonClose.addClass('hide')
    this.ui.compareButton.removeClass('hide')
  },

  movePhoto(e) {
    e.preventDefault();
    let $currentCompare = this.ui.carousel.find('.item.active').find('.mb-compare-gallery-model-1');
    let currentCompareWidth = $currentCompare.width();
    if ($(e.currentTarget).hasClass('left')) {
      this.ui.comparePhotoOverlay.width(currentCompareWidth - 10);
    }
    else {
      this.ui.comparePhotoOverlay.width(currentCompareWidth + 10);
    }
  },

  startDrag(e) {
    e.preventDefault();
    if (!this.dragging) {
      this.dragging = true;
      this.cursorPos = e.clientX;
      this.$currentCompare = this.ui.carousel.find('.item.active').find('.mb-compare-gallery-model-1');
      this.currentCompareWidth = this.$currentCompare.width();
      this.currentCompareWidth = this.$currentCompare.width();
    }
  },

  stopDrag(e) {
    e.preventDefault();
    if (this.dragging) {
      this.dragging = false;
    }
  },

  onDrag(e) {
    e.preventDefault();
    if (this.dragging) {
      this.newCursorPos = e.clientX;
      this.ui.comparePhotoOverlay.width(this.currentCompareWidth + (this.newCursorPos - this.cursorPos));
    }
  },

  slid(e) {
    e.preventDefault();
    this.ui.carousel.find('.mb-compare-gallery-model-1 img').css('min-width', this.ui.carousel.find('.active .mb-compare-gallery-model-2').css('width'));
  },

  carouselMouseEnter() {
    this.ui.compareButton.addClass('active');
  },

  carouselMouseLeave() {
    this.ui.compareButton.removeClass('active');
  },

  carSelected(data) {
    // console.debug(data);
    // let carModel= new ProductModel();
    // carModel.url = carModel.urlRoot + 10211219410;
    // carModel.fetch({
    //   'success': ()=> {
    //     this.rightCarView = new CarView({model: carModel});
    //     this.render();
    //   }
    // });
  }

});
