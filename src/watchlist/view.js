import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

import ModalService from '../modal/service';

import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';
import SupportModalView from '../modal/support/view';

export default LayoutView.extend({
  template: template,
  className: 'mb-watchlist-page-wrapper',

  regions: {
  },

  events: {
    'click .js-call-callback-modal': 'showCallbackModal',
    'click .js-call-email-modal': 'showEmailModal',
    'click .js-support-modal': 'showSupportModal',
    'click .js-tab': 'switchTab'
  },

  onShow() {
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
  }

});
