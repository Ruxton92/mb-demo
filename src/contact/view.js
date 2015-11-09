import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import ModalService from '../modal/service';
import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';
import SupportModalView from '../modal/support/view';
import DreamCarModalView from '../modal/dreamcar/view';


export default ItemView.extend({
  template: template,
  className: 'contact-wrapper',

  events: {
    'click .js-call-callback-modal': 'showCallbackModal',
    'click .js-call-email-modal': 'showEmailModal',
    'click .js-support-modal': 'showSupportModal',
    'click .js-dream-car': 'showDreamcarModal'
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
  },

  showDreamcarModal(e){
    e.preventDefault();
    let view = new DreamCarModalView();
    ModalService.request('open', view);
  }

});
