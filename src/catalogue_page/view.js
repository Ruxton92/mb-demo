import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

import CatalogueView from '../catalogue/view';
import NavigationView from './navigation/view';


export default LayoutView.extend({
  template: template,
  className: 'mb-catalogue-page-wrapper',

  regions: {
    catalogueRegion: ".mb-catalogue-region",
    navRegion: ".mb-nav-region"
  },

  ui: {
  },

  events: {
  },

  initialize() {
  },

  onShow() {
    this.catalogueView = new CatalogueView();
    this.catalogueRegion.show(this.catalogueView);

    this.navView = new NavigationView();
    this.navRegion.show(this.navView);

    this.listenTo(this.navView, 'filter:opened', this.filterOpened);
    this.listenTo(this.navView, 'filter:closed', this.filterClosed);
  },

  filterOpened() {
    this.catalogueView.filterOpened();
  },

  filterClosed() {
    this.catalogueView.filterClosed();
  }
});
