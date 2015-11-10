import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './footer.hbs';

import ModalService from '../modal/service';
import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';
import SupportModalView from '../modal/support/view';

export default ItemView.extend({
  template: template,
  className: 'mb-footer',
  events: {
    "click .js-scroll-top": "scrollTop",
    "click .js-link-callback": "showCallbackModal",
    "click .js-link-support": "showSupportModal",
    "click .js-link-email": "showEmailModal",
  },

  scrollTop(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
  },

  showCallbackModal(e) {
    e.preventDefault();
    let view = new CallbackModalView();
    ModalService.request('open', view);
  },

  showEmailModal(e) {
    e.preventDefault();
    let view = new EmailModalView();
    ModalService.request('open', view);
  },

  showSupportModal(e) {
    e.preventDefault();
    let view = new SupportModalView();
    ModalService.request('open', view);
  }
  
});
