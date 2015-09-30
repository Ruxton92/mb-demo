import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

import CatalogueView from '../catalogue/view';
import NavigationView from './navigation/view';

import CatalogueCollection from './collection';


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
    let catalogueCollection = new CatalogueCollection();
    catalogueCollection.fetch({
      'success': ()=> {
        this.catalogueView = new CatalogueView({collection: catalogueCollection});
        this.catalogueRegion.show(this.catalogueView);
      }
    });
  },

  onShow() {

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
