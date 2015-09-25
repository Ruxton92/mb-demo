import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';

import template from './template.hbs';
import ExteriorView from './exterior/view';
import InteriorView from './interior/view';
import ProductModel from './model';
import OfferDetailView from './offer_detail/view';
import EquipmentHighlightsView from './equipment_highlights/view';

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
    equipmentHighlightsRegion: ".mb-model-detail-edition-highlights"
  },

  initialize() {
    this.offerDetailView = new OfferDetailView({model: this.model});


    let example_collection_items = this.model.get('design').exterior.images;
    example_collection_items.push({});
    this.equipmentHighlightsView = new EquipmentHighlightsView({collection: new Backbone.Collection(example_collection_items)});
    $(window).on("scroll", this.checkScroll);

    let extDay = this.model.get('stageModules')[0].data[0].car.images360ExtDayClosed;
    let extNight = this.model.get('stageModules')[0].data[0].car.images360ExtNightClosed;
    let slides = [];
    for (let i = 0; i < extDay.length; i++) {
      slides.push({day: extDay[i].md.url, night: 'http://placehold.it/1305x734'});
    }
    this.exteriorSlidesCollection = new Backbone.Collection(slides);
    this.exteriorView = new ExteriorView({collection: this.exteriorSlidesCollection});

    let intDay = this.model.get('stageModules')[0].data[0].car.images360IntDayClosed;
    extNight = this.model.get('stageModules')[0].data[0].car.images360IntNightClosed;
    slides = [];
    for (let i = 0; i < intDay.length; i++) {
      slides.push({day: intDay[i].md.url, night: 'http://placehold.it/1305x734'});
    }
    this.interiorSlidesCollection = new Backbone.Collection(slides);
    this.interiorView = new InteriorView({collection: this.interiorSlidesCollection});
  },

  events: {
    'click .mb-model-detail-scroll-to-top': 'scrollTop',
  },

  scrollTop(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
  },

  checkScroll(e) {
    let exterior = $('.mb-model-detail-exterior-region').offset().top - $('.mb-model-detail-navigation').height();
    let total = $(window).scrollTop();
    if (total > exterior) {
      $('.mb-model-detail-navigation').addClass('sticky');
    } else {
      $('.mb-model-detail-navigation').removeClass('sticky');
    }
  },

  onShow() {
    this.exteriorRegion.show(this.exteriorView);

    this.interiorRegion.show(this.interiorView);

    this.offerDetailRegion.show(this.offerDetailView);

    this.equipmentHighlightsRegion.show(this.equipmentHighlightsView);
  },

});
