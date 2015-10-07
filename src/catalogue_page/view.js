import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import SpinnerService from '../spinner/spinner-service';

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

  ui: {},

  events: {},

  initialize() {
    let catalogueCollection = new CatalogueCollection();
    this.listenTo(catalogueCollection, 'request', this.showSpinner);
    this.listenTo(catalogueCollection, 'sync', this.hideSpinner);
    catalogueCollection.fetch({
      'success': ()=> {
        this.catalogueView = new CatalogueView({collection: catalogueCollection});
        this.catalogueRegion.show(this.catalogueView);
      }
    });
  },

  showSpinner() {
    SpinnerService.request('showSpinner');
  },

  hideSpinner() {
    SpinnerService.request('hideSpinner');
  },

  onShow() {

    this.navView = new NavigationView();
    this.navRegion.show(this.navView);

    this.listenTo(this.navView, 'filter:opened', this.filterOpened);
    this.listenTo(this.navView, 'filter:closed', this.filterClosed);
  },

  filterOpened() {
    // this.catalogueView.filterOpened();
  },

  filterClosed() {
    // this.catalogueView.filterClosed();
  }
});
