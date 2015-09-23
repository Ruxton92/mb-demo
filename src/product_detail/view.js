import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import ProductModel from './model';
import ExteriorView from './exterior/view';

export default LayoutView.extend({
  template: template,

  regions: {
    exteriorRegion: '.mb-model-detail-exterior-region',
  },

  initialize(data) {
    this.productID = parseInt(data.productID);
    console.debug(this.productID);
    this.model = new ProductModel();
    this.model.url = this.model.urlRoot + this.productID;
    this.model.fetch();
  },

  ui: {
  },

  events: {
  },

  onShow() {
    this.exteriorView = new ExteriorView({model: this.model});
    this.exteriorRegion.show(this.exteriorView);
  },

  filterOpened() {
  },

  filterClosed() {
  }
});
