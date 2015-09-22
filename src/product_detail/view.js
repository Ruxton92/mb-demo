import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import ProductModel from './model'

export default LayoutView.extend({
  template: template,
  className: 'mb-catalogue-page-wrapper',

  regions: {
    catalogueRegion: ".mb-catalogue-region",
    navRegion: ".mb-nav-region"
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
  },

  filterOpened() {
  },

  filterClosed() {
  }
});
