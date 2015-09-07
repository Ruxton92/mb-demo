import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

import ModalService from '../modal/service';

import CallbackModalView from '../modal/callback/view';

export default ItemView.extend({
  template: template,
  className: 'mb-catalogue-wrapper',

  events: {
  	'click .js-call-callback-modal': 'showCallbackModal'
  },

  showCallbackModal(e) {
    e.preventDefault();
    var view = new CallbackModalView();
    ModalService.request('open', view);
  }

});
