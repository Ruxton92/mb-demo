import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jQuery';

import ModalService from '../modal/service';

import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';

export default ItemView.extend({
  template: template,
  className: 'mb-catalogue-wrapper',

  events: {
    'click .js-call-callback-modal': 'showCallbackModal',
    'click .js-call-email-modal': 'showEmailModal',
    'click .js-tab': 'switchTab'
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

  switchTab(e) {
    e.preventDefault();
    this.$('.js-tab').removeClass('active');
    $(e.currentTarget).addClass('active');
  }
});
