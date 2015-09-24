import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';

import template from './template.hbs';
import ExteriorView from './exterior/view';
import ProductModel from './model';
import OfferDetailView from './offer_detail/view';
import EquipmentHighlightsView from './equipment_highlights/view';

export default LayoutView.extend({
  template,

  regions: {
    exteriorRegion: '.mb-model-detail-exterior-region',
    catalogueRegion: ".mb-catalogue-region",
    navRegion: ".mb-nav-region",
    offerDetailRegion: ".mb-model-detail-offer-region",
    equipmentHighlightsRegion: ".mb-model-detail-edition-highlights"
  },

  initialize(data) {
    console.debug(this.model);
    this.exteriorView = new ExteriorView({model: this.model});
    this.offerDetailView = new OfferDetailView({model: this.model});

    // todo move after show, don't know showing place
    let example_collection_items = this.model.get('design').exterior.images;
    this.equipmentHighlightsView = new EquipmentHighlightsView({collection: new Backbone.Collection(example_collection_items)});
  },

  ui: {
  },

  events: {
  },

  onShow() {
    this.exteriorRegion.show(this.exteriorView);
    this.offerDetailRegion.show(this.offerDetailView);

    // todo move after show, don't know showing place
    this.equipmentHighlightsRegion.show(this.equipmentHighlightsView);
  },

  filterOpened() {
  },

  filterClosed() {
  }
});
