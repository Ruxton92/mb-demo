import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import itemTemplate from './item_template.hbs';
import $ from 'jquery';

import ModalService from '../modal/service';

import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';
import SupportModalView from '../modal/support/view';
import PaginationService from '../pagination/pagination-service';

import CatalogueCollection from '../catalogue_page/collection';
import CatalogueCollectionView from './collection-view';


export default LayoutView.extend({
  template: template,
  className: 'mb-catalogue-wrapper container-fluid',

  events: {
    'click .js-call-callback-modal': 'showCallbackModal',
    'click .js-call-email-modal': 'showEmailModal',
    'click .js-support-modal': 'showSupportModal',
    'click .js-tab': 'switchTab',
  },

  ui: {
    'overlay': '.mb-catalogue-overlay',
  },

  regions: {
    'collectionRegion': '.mb-catalogue-items-region',
    'paginationRegion': '.mb-pagination-region'
  },

  initialize(data) {
    this.viewType = data.viewType || false;
    if (this.collection === undefined) {
      this.collection = new CatalogueCollection();
      this.collection.fetch();
    }
    this.collectionView = new CatalogueCollectionView({collection: this.collection});
  },

  onShow() {
    PaginationService.setup({
      container: this.paginationRegion,
      pages: 5
    });
    PaginationService.request();
    this.collectionRegion.show(this.collectionView);
  },

  templateHelpers() {
    return {
      'viewType': this.viewType
    }
  },

  showCallbackModal(e) {
    e.preventDefault();
    var view = new CallbackModalView();
    ModalService.request('open', view);
  },

  showEmailModal(e) {
    e.preventDefault();
    var view = new EmailModalView();
    ModalService.request('open', view);
  },

  showSupportModal(e) {
    e.preventDefault();
    var view = new SupportModalView();
    ModalService.request('open', view);
  },

  switchTab(e) {
    e.preventDefault();
    this.$('.js-tab').removeClass('active');
    $(e.currentTarget).addClass('active');
  },


});
