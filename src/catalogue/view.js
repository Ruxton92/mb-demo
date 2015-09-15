import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';

import ModalService from '../modal/service';

import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';
import SupportModalView from '../modal/support/view';

export default ItemView.extend({
  template: template,
  className: 'mb-catalogue-wrapper',

  events: {
    'click .js-call-callback-modal': 'showCallbackModal',
    'click .js-call-email-modal': 'showEmailModal',
    'click .js-support-modal': 'showSupportModal',
    'click .js-tab': 'switchTab',
  },

  ui: {
    'overlay': '.mb-catalogue-overlay'
  },

  initialize(data) {
    this.viewType = data.viewType || false;
  },

  onShow() {
    // this.$('.js-support-modal').click();
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

  filterOpened() {
    this.ui.overlay.removeClass('hidden1').addClass('active');
  },

  filterClosed() {
    this.ui.overlay.addClass('hidden1').removeClass('active');
  },

});
