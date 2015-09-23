import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import ExteriorView from './exterior/view';
import ProductModel from './model';

import OfferDetailView from './offer_detail/view';

export default LayoutView.extend({
  template: template,

  regions: {
    exteriorRegion: '.mb-model-detail-exterior-region',
    catalogueRegion: ".mb-catalogue-region",
    navRegion: ".mb-nav-region",
    offerDetail: ".mb-model-detail-offer-region",
  },

  initialize(data) {
    this.exteriorView = new ExteriorView({model: this.model});
  },

  ui: {
  },

  events: {
  },

  onShow() {
    console.debug(this.model);
    console.debug(this.model.attributes);
    this.exteriorRegion.show(this.exteriorView);
    this.offerDetail.show(new OfferDetailView({model: this.model}));
  },

  filterOpened() {
  },

  filterClosed() {
  }
});
