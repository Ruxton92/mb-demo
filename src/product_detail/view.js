import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';

import template from './template.hbs';
import ExteriorView from './exterior/view';
import InteriorView from './interior/view';
import ProductModel from './model';
import OfferDetailView from './offer_detail/view';
import EquipmentHighlightsView from './equipment_highlights/view';

import ModalService from '../modal/service';
import TestDriveModalView from '../modal/test_drive/view';

export default LayoutView.extend({
  template,
  className: 'mb-catalogue-page-wrapper',
  autoRender: false,

  regions: {
    exteriorRegion: '.mb-model-detail-exterior-region',
    interiorRegion: '.mb-model-detail-interior-region',
    catalogueRegion: ".mb-catalogue-region",
    navRegion: ".mb-nav-region",
    offerDetailRegion: ".mb-model-detail-offer-region",
    equipmentHighlightsRegion: ".mb-model-detail-edition-highlights-region"
  },

  initialize() {
    this.offerDetailView = new OfferDetailView({model: this.model});

    let equipDay = this.model.get('stageModules')[0].data[0].car.images360IntDayClosed;
    let slidesEquip = [];
    for (let i = 0; i < equipDay.length; i++) {
      slidesEquip.push({day: equipDay[i].md.url});
    }
    this.equipSlidesCollection = new Backbone.Collection(slidesEquip);
    this.equipmentHighlightsView = new EquipmentHighlightsView({collection: this.equipSlidesCollection});
    
    $(window).on("scroll", this.checkScroll);


    let extDay = this.model.get('design').exterior.images;
    let extNight = this.model.get('design').exterior.images;
    let slidesExt = [];
    for (let i = 0; i < extDay.length; i++) {
      slidesExt.push({day: extDay[i].hd.url, night: ''});
    }
    this.exteriorSlidesCollection = new Backbone.Collection(slidesExt);
    this.exteriorView = new ExteriorView({model: this.model, collection: this.exteriorSlidesCollection});

    let intDay = this.model.get('stageModules')[0].data[0].car.images360IntDayClosed;
    let intNight = this.model.get('stageModules')[0].data[0].car.images360IntNightClosed;
    let slidesInt = [];
    for (let i = 0; i < intDay.length; i++) {
      slidesInt.push({day: intDay[i].md.url, night: 'http://placehold.it/1305x734'});
    }
    this.interiorSlidesCollection = new Backbone.Collection(slidesInt);
    this.interiorView = new InteriorView({collection: this.interiorSlidesCollection});
  },

  events: {
    'click .mb-model-detail-scroll-to-top': 'scrollTop',
    'click .js-open-test-drive': 'openTestDrive',
  },

  scrollTop(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
  },

  checkScroll(e) {
    e.preventDefault();
    if ($('.mb-model-detail-exterior-region').length) {
      let exterior = $('.mb-model-detail-exterior-region').offset().top - $('.mb-model-detail-navigation').height();
      let total = $(window).scrollTop();
      if (total > exterior) {
        $('.mb-model-detail-navigation').addClass('sticky');
      } else {
        $('.mb-model-detail-navigation').removeClass('sticky');
      }
    }
  },

  openTestDrive(e) {
    e.preventDefault();
    var view = new TestDriveModalView();
    ModalService.request('open', view);
  },

  onShow() {
    this.exteriorRegion.show(this.exteriorView);

    this.interiorRegion.show(this.interiorView);

    this.offerDetailRegion.show(this.offerDetailView);

    this.equipmentHighlightsRegion.show(this.equipmentHighlightsView);
  },

});
